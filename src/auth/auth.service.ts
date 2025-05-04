import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';
import { Request } from 'express';
import { ILoginResponse } from '../types/Auth/Auth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private rolesService: RolesService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { username, password, displayName } = registerDto;

    const hashedPassword = await hash(password, 10);
    const userRoles = await this.rolesService.findByName('USER');

    const foundedUser = await this.userRepository.findOne({where: {username}});

    if (foundedUser) {
      throw new BadRequestException('Такой пользователь уже существует');
    }

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      displayName,
    });
    if (userRoles) {
      user.roles = [userRoles];
    }

    await this.userRepository.save(user);
    return 'success';
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }
    const payload = { username: user.username, sub: user.id, roles: user.roles.map(role => role.name) };
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userRepository.update(user.id, { refreshToken });

    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      roles: user.roles.map(role => role.name),
      accessToken,
      refreshToken
    };
  }

  async refreshAccessToken(req: Request): Promise<{accessToken: string}> {
    const authHeader = req.body.headers['Authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) throw new UnauthorizedException('You are not logged in!');
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: decoded.sub } });
      if (!user || user.refreshToken !== token) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const payload = { sub: user.id, username: user.username, roles: user.roles.map(role => role.name) };
      return { accessToken: await this.jwtService.signAsync(payload) };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async logout({ sub }: {sub: number}): Promise<string> {
    await this.userRepository.update(sub, { refreshToken: null});
    return "Successfully logged out";
  }

  async verifyToken(req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (!token) throw new UnauthorizedException('You are not logged in!');

    try {
      const payload = this.jwtService.verify(token);
      return { valid: true, user: payload };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getMe(req: Request): Promise<{valid: true, user: ILoginResponse}> {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token || token === 'null') throw new UnauthorizedException('You are not logged in!');
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({where: {
          id: payload.sub
        }});
      const userInfo = {
        username: user.username,
        displayName: user.displayName,
        id: payload.sub,
        roles: user.roles.map(role => role.name),
      };
      return { valid: true, user: userInfo };
    } catch (error) {
        throw new ForbiddenException(error);
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    const isPasswordValid = await compare(pass, user.password);
    if (user && isPasswordValid) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}

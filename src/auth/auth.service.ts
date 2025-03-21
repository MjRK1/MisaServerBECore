import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { username, password, displayName } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRoles = await this.rolesService.findByName('USER');
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

  async login(loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }
    const payload = { username: user.username, sub: user.id, roles: user.roles.map(role => role.name) };
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userRepository.update(user.id, { refreshToken });

    return {accessToken, refreshToken};
  }

  async refreshAccessToken(refreshToken: string): Promise<{accessToken: string}> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({ where: { id: decoded.sub } });

      if (!user || user.refreshToken !== refreshToken) {
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
}

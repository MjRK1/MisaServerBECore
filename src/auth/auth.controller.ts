import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Public } from '../decorators/isPublic.decorator';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Public()
  @Post('refresh')
  async refresh(@Req() req: Request) {
    return this.authService.refreshAccessToken(req);
  }

  @Post('logout')
  async logout(@Req() req) {
    const user = await req.user;
    await this.authService.logout({sub: user.sub});
  }

  @Public()
  @Post('verify')
  async verifyToken(@Req() req: Request) {
    return await this.authService.verifyToken(req);
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    return await this.authService.getMe(req);
  }
}

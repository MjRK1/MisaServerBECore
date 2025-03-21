import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Public } from '../decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() {refreshToken}: {refreshToken: string}) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async logout(@Req() req) {
    const user = await req.user;
    await this.authService.logout({sub: user.sub});
  }
}

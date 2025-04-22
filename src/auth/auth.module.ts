import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return ({
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3h' },
        });
      },
      inject: [ConfigService]
    }),
    PassportModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy
  ],
  exports: [JwtModule],
})
export class AuthModule {}

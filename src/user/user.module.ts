import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/roles.entity';
import { AuthModule } from '../auth/auth.module';
import { RolesService } from '../roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AuthModule],
  controllers: [UserController],
  providers: [UserService, RolesService],
})
export class UserModule {}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/roles.entity';
import { UserData } from '../types/Users/UserData';
import { AllUsersDto } from './dto/all-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private rolesService: RolesService,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
  }

  async findAll(): Promise<AllUsersDto[]> {
    const users = await this.usersRepository.find();
    return users.map(user => ({
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      roles: user.roles,
    }));
  }

  async changeUserRole(userRoles: UpdateUserRoleDto): Promise<UserData> {
    const user = await this.usersRepository.findOne({where: {id: userRoles.userId}});
    user.roles = await this.rolesRepository.find({where: userRoles.newRoles.map(name => ({name}))});
    await this.usersRepository.save(user);
    return {
      id: user.id,
      username: user.username,
      roles: user.roles.map(role => role.name),
      displayName: user.displayName,
      refreshToken: user.refreshToken
    };
  }
}

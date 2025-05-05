import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedRoles();
  }

  private async seedRoles(): Promise<void> {
    const existingRoles = await this.roleRepository.count();
    if (existingRoles === 0) {
      const roles = ['USER', 'ADMIN'].map(name => {
        const role = new Role();
        role.name = name;
        return role;
      });
      await this.roleRepository.save(roles);
    }
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }
}

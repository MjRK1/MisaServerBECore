import { Role } from '../../roles/entities/roles.entity';

export class AllUsersDto {
  userId: number | string;

  displayName: string;

  username: string;

  roles: Role[];
}

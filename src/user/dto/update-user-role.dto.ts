import { IsArray, IsNumber } from 'class-validator';


export class UpdateUserRoleDto {
  @IsNumber()
  userId: number;

  @IsArray()
  newRoles: string[];
}

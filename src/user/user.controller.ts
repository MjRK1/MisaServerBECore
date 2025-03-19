import {
  Controller,
  Get,
  Post,
  Body, UseGuards,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../decorators/Roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserData } from '../types/Users/UserData';
import { Public } from '../decorators/isPublic.decorator';
// import { UpdateUserDto } from './dto/update-user.dto';
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN', 'USER')
  @Post('changeRole')
  changeRole(@Body() userRoles: UpdateUserRoleDto): Promise<UserData> {
    return this.userService.changeUserRole(userRoles);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}

import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;
}

export class LoginDto {
  @IsString()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

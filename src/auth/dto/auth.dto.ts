//src/auth/dto/login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsInt()
  @ApiProperty()
  cityId: number;
}

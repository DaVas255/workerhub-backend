import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  cityId: number;
}

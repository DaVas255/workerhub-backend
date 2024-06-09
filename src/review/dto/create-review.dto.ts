import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  Date: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  userId: number;
}

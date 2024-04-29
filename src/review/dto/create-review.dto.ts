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
  @IsOptional()
  @IsDate()
  Date: Date;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsInt()
  userId: number;
}

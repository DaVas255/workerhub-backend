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

export enum TaskStatus {
  open = 'open',
  accepted = 'accepted',
  completed = 'completed',
}
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, {
    message: 'Status must be OPEN, ACCEPTED or COMPLETED',
  })
  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  @IsOptional()
  status: TaskStatus;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  price: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  date: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  cityId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  specialtyId: number;
}

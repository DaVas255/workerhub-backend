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
export class TaskDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  title: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  content: string;

  @IsEnum(TaskStatus, {
    message: 'Status must be OPEN, ACCEPTED or COMPLETED',
  })
  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  @IsOptional()
  status: TaskStatus;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  price: number;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  date: Date;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  cityId: number;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  specialtyId: number;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  customerId: number;

  @IsInt()
  @ApiProperty()
  @IsOptional()
  executorId: number;
}

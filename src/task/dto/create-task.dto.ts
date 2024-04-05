import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  status: string;

  @IsInt()
  price: number;

  @IsDate()
  date: Date;
}

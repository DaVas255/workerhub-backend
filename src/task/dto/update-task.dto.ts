import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title: string;
  content: string;
  status: string;
  price: number;
  date: Date;
}

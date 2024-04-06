import { IsDate, IsInt, IsString, IsEnum, IsNotEmpty } from 'class-validator';

// enum TaskStatus {
//   OPEN = 'open',
//   ACCEPTED = 'accepted',
//   COMPLETED = 'completed',
// }

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  customerId: number;
}

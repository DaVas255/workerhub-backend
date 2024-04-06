import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma/prisma.service';

//TODO: add status DTO
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id: +id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({ data: createTaskDto });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.getById(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: updateTaskDto,
    });
  }

  async updateStatus(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id: +id } });
  }
}

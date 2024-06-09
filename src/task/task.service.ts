import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async getById(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id: +id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(TaskDto: TaskDto) {
    return this.prisma.task.create({ data: TaskDto });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findAllByCity(cityId: number) {
    return this.prisma.task.findMany({ where: { cityId: +cityId, status: 'open' } });
  }

  findAllBySpecialty(specialtyId: number) {
    return this.prisma.task.findMany({ where: { specialtyId: +specialtyId, status: 'open' } });
  }

  findAllOpen() {
    return this.prisma.task.findMany({ where: { status: 'open' } });
  }

  findOne(id: number) {
    return this.getById(id);
  }

  async update(id: number, TaskDto: TaskDto) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: TaskDto,
    });
  }

  async toggleStatus(id: number, TaskDto: TaskDto) {
    const task = await this.getById(id);
    return this.prisma.task.update({
      where: { id: task.id },
      data: TaskDto,
    });
  }

}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() TaskDto: TaskDto) {
    return this.taskService.create(TaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('by-city/:cityId')
  findAllByCity(@Param('cityId') cityId: string) {
    return this.taskService.findAllByCity(+cityId);
  }

  @Get('by-specialty/:specialtyId')
  findAllBySpecialty(@Param('specialtyId') specialtyId: string) {
    return this.taskService.findAllBySpecialty(+specialtyId);
  }

  @Get('opens')
  findAllOpen() {
    return this.taskService.findAllOpen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string, @Body() TaskDto: TaskDto) {
    return this.taskService.toggleStatus(+id, TaskDto);
  }

}

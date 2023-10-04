import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      const resp = await this.tasksService.findAll();
      return resp;
    } catch (error) {
      if (error.code == 11000) {
        throw new Error('Duplicate key error');
      }

      if (error.code == 400) {
        throw new Error('Bad request');
      }

      if (error.code == 404) {
        throw new Error('Not found');
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    try {
      const rep = await this.tasksService.findOne(id);
      if (rep == null) {
        throw new Error('Not found');
      }
      return rep;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<Task> {
    try {
      return await this.tasksService.create(task);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Task> {
    try {
      const resp = await this.tasksService.delete(id);
      if (resp == null) {
        throw new NotFoundException('Not found');
      }
      return resp;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    try {
      const resp = await this.tasksService.update(id, task);
      if (resp == null) {
        throw new NotFoundException('Not found');
      }
      return resp;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}

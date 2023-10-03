import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {} // 👈 inject model

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async create(task: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }

  async update(id: string, task: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}

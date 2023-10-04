import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {} // 👈 inject model

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(id);
  }
}

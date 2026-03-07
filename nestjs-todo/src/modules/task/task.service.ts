import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  getTasks() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  getTask(id: number) {
    return this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  createTask(body: Partial<Task>) {
    const task = this.tasksRepo.create(body);
    return this.tasksRepo.save(task);
  }

  async updateTask(id: number, body: Partial<Task>) {
    await this.tasksRepo.update(id, body);
    return this.getTask(id);
  }

  deleteTask(id: number) {
    return this.tasksRepo.delete(id);
  }
}
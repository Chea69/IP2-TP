import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  createUser(body: Partial<User>) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUsers() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  getUser(id: number) {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async updateUser(id: number, body: Partial<User>) {
    await this.usersRepo.update(id, body);
    return this.getUser(id);
  }

  deleteUser(id: number) {
    return this.usersRepo.delete(id);
  }
}
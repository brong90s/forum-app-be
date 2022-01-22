import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, username: string, avatar: string) {
    const user = this.repo.create({email, username, avatar})
    return this.repo.save(user)
  }

  find(email: string) {
    return this.repo.find({email})
  }

  findOne(email: string) {
    return this.repo.findOne({email})
  }

  async update(email: string, attrs: Partial<User>) {
    const user = await this.findOne(email)
    if(!user) {
      throw new NotFoundException('user not found!')
    }
    Object.assign(user, attrs)

    return this.repo.save(user)
  }
}

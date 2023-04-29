import { Injectable } from '@nestjs/common';
import { CreateUserRequest, CreateUserResponse } from 'types';
import { UsersRepository } from './users.repository';
import { User } from 'database';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(req: CreateUserRequest): Promise<CreateUserResponse> {
    const { password, ...data } = req;
    try {
      return await this.usersRepo.create({ password: req.password, ...data });
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    // await this.usersRepo.search({email:email},{limit:1})
    return await this.usersRepo.findUserByEmail(email);
  }
}

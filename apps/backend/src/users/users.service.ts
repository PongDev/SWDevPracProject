import { Injectable } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUserIdRequest,
  GetUserByUserIdResponse,
} from 'types';
import { UsersRepository } from './users.repository';
import { User } from 'database';
import * as bcrypt from 'bcrypt';
import { backendConfig } from 'config';

@Injectable()
export class UsersService {
  private readonly hashRound: number = backendConfig.bcrypt.hashRound;
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(req: CreateUserRequest): Promise<CreateUserResponse> {
    const { password, ...data } = req;
    try {
      const hashedPassword = await bcrypt.hash(password, this.hashRound);
      return await this.usersRepo.create({ password: hashedPassword, ...data });
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    // await this.usersRepo.search({email:email},{limit:1})
    return await this.usersRepo.findUniqueUser(email);
  }

  async getUserByUserId(userId: string): Promise<User> {
    return await this.usersRepo.findUniqueUser(userId);
  }
}

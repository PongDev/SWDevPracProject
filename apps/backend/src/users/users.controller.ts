import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, CreateUserResponse } from 'types';
import { User } from 'src/auth/user.decorator';

@Controller()
export class UsersController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  @Get()
  async getUser() {}
}

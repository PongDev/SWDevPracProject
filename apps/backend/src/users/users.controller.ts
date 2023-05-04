import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUserIdResponse,
} from 'types';
import { User } from 'src/auth/user.decorator';
import { InvalidRequestError, RecordNotFound } from 'src/common/commonError';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  exceptionHandler(e: Error) {
    if (e instanceof RecordNotFound)
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    if (e instanceof InvalidRequestError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param('id') userId: string,
  ): Promise<GetUserByUserIdResponse> {
    return await this.usersService.getUserByUserId(userId);
  }
}

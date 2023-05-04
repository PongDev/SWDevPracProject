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
  GetUserByUserIdRequest,
  GetUserByUserIdResponse,
} from 'types';
import { User } from 'src/auth/user.decorator';
import { InvalidRequestError } from 'src/common/commonError';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  exceptionHandler(e: Error) {
    if (e instanceof InvalidRequestError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check the id again.',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param('id') userId: number,
  ): Promise<GetUserByUserIdResponse> {
    const { password, ...result } = await this.usersService.getUserByUserId(
      userId,
    );
    return result;
  }
}

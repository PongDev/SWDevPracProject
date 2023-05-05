import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserByUserIdResponse } from 'types';
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
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { password, ...result } = await this.usersService.getUserByUserId(
      userId,
    );
    return result;
  }
}

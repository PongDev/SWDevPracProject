import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserByUserIdResponse } from 'types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiTags('users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

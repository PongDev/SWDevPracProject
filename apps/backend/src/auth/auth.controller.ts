import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  JWTToken,
  LogInRequest,
} from 'types';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  exceptionHandler(e: Error) {
    throw e;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() userData: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.authService.register(userData);
    } catch (e: any) {
      this.exceptionHandler(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userData: LogInRequest): Promise<JWTToken> {
    try {
      return await this.authService.logIn(userData);
    } catch (e: any) {
      this.exceptionHandler(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token has been refreshed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@User() user): Promise<JWTToken> {
    return await this.authService.generateToken(user.userId);
  }
}

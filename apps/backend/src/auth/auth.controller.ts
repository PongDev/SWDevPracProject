import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserRequest, CreateUserResponse, logInRequest } from 'types';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  exceptionHandler(e: Error) {
    throw e;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() userData: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.authService.register(userData);
    } catch (e) {
      this.exceptionHandler(e);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userData: logInRequest) {
    try {
      return await this.authService.logIn(userData);
    } catch (e) {
      this.exceptionHandler(e);
    }
  }

  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  // async logOut(@User() user) {
  //   try {
  //     return await this.authService.logOut(user.id)
  //   } catch (e) {
  //     this.exceptionHandler(e);
  //   }
  // }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@User() user) {
    return await this.authService.generateToken(user.userId);
  }
}

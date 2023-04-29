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

@Controller()
export class AuthController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

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
  async logIn(
    @Res({ passthrough: true }) res: Response,
    @Body() userData: logInRequest,
  ) {
    try {
      const { responseBody, token } = await this.authService.logIn(userData);
      res.cookie('access_token', token.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.cookie('refresh_token', token.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(HttpStatus.OK).send(responseBody);
    } catch (e) {
      this.exceptionHandler(e);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logOut(@Res({ passthrough: true }) res: Response) {
    // @User => req.user => call service.logout to clear token
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.status(HttpStatus.OK).send({ message: 'successful' });
    } catch (e) {
      this.exceptionHandler(e);
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@User() user, @Res({ passthrough: true }) res: Response) {
    // set cookie?
    return await this.authService.generateToken(user.userId);
  }
}

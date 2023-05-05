import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { backendConfig } from 'config';
import { UsersService } from '../users/users.service';
import { CreateUserRequest, JWTPayload, JWTToken, LogInRequest } from 'types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly jwtAccessTokenOptions = {
    secret: backendConfig.jwt.accessToken.secret,
    expiresIn: backendConfig.jwt.accessToken.expire,
  };
  private readonly jwtRefreshTokenOptions = {
    secret: backendConfig.jwt.refreshToken.secret,
    expiresIn: backendConfig.jwt.refreshToken.expire,
  };

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(userData: CreateUserRequest) {
    return await this.usersService.register(userData);
  }

  async logIn(userData: LogInRequest): Promise<JWTToken> {
    const user = await this.usersService.getUserByEmail(userData.email);
    if (!user) {
      throw new BadRequestException('Incorrect email. Please try again.');
    }
    const validUser = await bcrypt.compare(userData.password, user.password);
    if (!validUser) {
      throw new UnauthorizedException('Incorrect password.');
    }
    return await this.generateToken({ userID: user.id });
  }

  signAccessToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload, this.jwtAccessTokenOptions);
  }

  async signAccessTokenAsync(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, this.jwtAccessTokenOptions);
  }

  signRefreshToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload, this.jwtRefreshTokenOptions);
  }

  async signRefreshTokenAsync(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(
      payload,
      this.jwtRefreshTokenOptions,
    );
  }

  async generateToken(jwtPayload: JWTPayload): Promise<JWTToken> {
    const accessToken = this.signAccessTokenAsync(jwtPayload);
    const refreshToken = this.signRefreshTokenAsync(jwtPayload);

    return {
      accessToken: await accessToken,
      refreshToken: await refreshToken,
    };
  }
}

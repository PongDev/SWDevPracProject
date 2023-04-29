import {
  BadRequestException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { backendConfig } from 'config';
import { UsersService } from 'src/users/users.service';
import { CreateUserRequest, JWTPayload, JWTToken, logInRequest } from 'types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly hashRound: number = backendConfig.bcrypt.hashRound;
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
    const { password, ...data } = userData;
    const hashedPassword = await bcrypt.hash(password, this.hashRound);
    return await this.usersService.register({
      password: hashedPassword,
      ...data,
    });
  }

  async logIn(
    userData: logInRequest,
  ): Promise<{ responseBody: { id: string; name: string }; token: JWTToken }> {
    const user = await this.usersService.findUserByEmail(userData.email);
    if (!user) {
      throw new BadRequestException('Incorrect email. Please try again.');
    }
    if (!bcrypt.compare(userData.password, user.password)) {
      throw new UnauthorizedException('Incorrect password.');
    }
    const token = await this.generateToken({ userID: user.id });
    const responseBody = { id: user.id, name: user.name };
    return { responseBody, token };
  }

  async logOut(userID: number) {
    // set stored refresh_token for that user to null/expired
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

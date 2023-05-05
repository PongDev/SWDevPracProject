import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingRequest, EditBookingRequest, JWTPayload } from 'types';
import { User } from 'src/auth/user.decorator';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { InvalidRequestError, PermissionError } from 'src/common/commonError';
import { Booking, Role } from 'database';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseFilters(AllExceptionsFilter)
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
  ) {}

  async checkOwnerAuthorization(
    userId: number,
    bookingId: number,
  ): Promise<boolean> {
    return (await this.bookingsService.findUnique(bookingId)).userId == userId;
  }

  async checkAdminAuthorization(userId: number): Promise<boolean> {
    return (await this.usersService.getUserByUserId(userId)).role == Role.ADMIN;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The resource has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad request. Please check your input or your booking quota have been reached.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to access this resource.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @User() user: JWTPayload,
    @Body() createBookingDto: CreateBookingRequest,
  ): Promise<Booking> {
    if (user.userID != createBookingDto.userId)
      throw new InvalidRequestError('You can register only with your id.');
    if ((await this.bookingsService.findByUserId(user.userId)).length >= 3)
      throw new InvalidRequestError(
        'User are allowed to book up to only 3 interview sessions.',
      );
    return this.bookingsService.create(createBookingDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The resource has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to access this resource.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@User() user: JWTPayload): Promise<Booking[]> {
    if (await this.checkAdminAuthorization(user.userID)) {
      return await this.bookingsService.findAll();
    }
    throw new PermissionError('Only admin can access this resource.');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The resource has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to access this resource.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @User() user: JWTPayload,
    @Param('id') bookingId: number,
  ): Promise<Booking> {
    if (
      (await this.checkAdminAuthorization(user.userID)) ||
      (await this.checkOwnerAuthorization(user.userID, bookingId))
    ) {
      return this.bookingsService.findUnique(bookingId);
    }
    throw new PermissionError(
      "Only admin and booking's owner can access this resource.",
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The resource has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to access this resource.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @User() user: JWTPayload,
    @Param('id') bookingId: number,
    @Body() editBookingDto: EditBookingRequest,
  ): Promise<Booking> {
    if (
      (await this.checkAdminAuthorization(user.userID)) ||
      (await this.checkOwnerAuthorization(user.userID, bookingId))
    ) {
      return this.bookingsService.update(bookingId, editBookingDto);
    }
    throw new PermissionError(
      "Only admin and booking's owner can access this resource.",
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The resource has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to access this resource.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @User() user: JWTPayload,
    @Param('id') bookingId: number,
  ): Promise<Booking> {
    if (
      (await this.checkAdminAuthorization(user.userID)) ||
      (await this.checkOwnerAuthorization(user.userID, bookingId))
    ) {
      return this.bookingsService.remove(bookingId);
    }
    throw new PermissionError(
      "Only admin and booking's owner can access this resource.",
    );
  }
}

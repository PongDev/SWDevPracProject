import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Booking } from 'database';
import { EditBookingRequest } from 'types';
import {
  FailedRelationConstraintError,
  InvalidRequestError,
  RecordNotFound,
} from 'src/common/commonError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookingData: {
    startDate: Date;
    endDate: Date;
    userId: number;
    companyId: number;
  }): Promise<Booking> {
    if (
      createBookingData.startDate.toISOString >
      createBookingData.endDate.toISOString
    ) {
      throw new InvalidRequestError(
        'Please enter valid dates for an interview session.',
      );
    }
    try {
      return await this.prismaService.booking.create({
        data: createBookingData,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      )
        throw new FailedRelationConstraintError(
          `Invalid user ID or company ID`,
        );
      throw error;
    }
  }

  async find(): Promise<Booking[]> {
    return await this.prismaService.booking.findMany();
  }

  async findUnique(bookingId: number): Promise<Booking> {
    const result = await this.prismaService.booking.findUniqueOrThrow({
      where: {
        id: bookingId,
      },
    });
    if (!result)
      throw new RecordNotFound(`Booking with ${bookingId} doesn't exist`);
    return result;
  }

  async findByUserId(userId: number) {
    return await this.prismaService.booking.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async update(
    bookingId: number,
    bookingUpdateData: EditBookingRequest,
  ): Promise<Booking> {
    const target = await this.prismaService.booking.findUnique({
      where: {
        id: bookingId,
      },
    });
    if (!target)
      throw new RecordNotFound(`Booking id${bookingId} doesn't exist.`);
    if (bookingUpdateData.startDate)
      target.startDate = bookingUpdateData.startDate;
    if (bookingUpdateData.endDate) target.endDate = bookingUpdateData.endDate;
    if (target.startDate.toISOString > target.endDate.toISOString) {
      throw new InvalidRequestError(
        'Please enter valid dates for an interview session.',
      );
    }
    return await this.prismaService.booking.update({
      data: bookingUpdateData,
      where: {
        id: bookingId,
      },
    });
  }

  async remove(bookingId: number): Promise<Booking> {
    try {
      const result = await this.prismaService.booking.delete({
        where: {
          id: bookingId,
        },
      });
      if (!result)
        throw new RecordNotFound(`Booking id${bookingId} doesn't exist.`);
      return result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new RecordNotFound(`Booking id${bookingId} doesn't exist.`);
      throw error;
    }
  }
}

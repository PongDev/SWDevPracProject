import { Injectable } from '@nestjs/common';
import { CreateBookingRequest, EditBookingRequest } from 'types';
import { BookingsRepository } from './bookings.repository';
import { InvalidRequestError } from 'src/common/commonError';
import { Booking } from 'database';
@Injectable()
export class BookingsService {
  private minDate = new Date('May 10, 2022 00:00:00').toISOString();
  private maxDate = new Date('May 13, 2022 23:59:59').toISOString();
  constructor(private readonly bookingsRepo: BookingsRepository) {}

  async create(createBookingDto: CreateBookingRequest): Promise<Booking> {
    this.validateSessionRange({
      startDate: createBookingDto.startDate,
      endDate: createBookingDto.endDate,
    });
    return await this.bookingsRepo.create(createBookingDto);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingsRepo.find();
  }

  async findUnique(bookingId: number): Promise<Booking> {
    return await this.bookingsRepo.findUnique(bookingId);
  }

  async findByUserId(userId: number): Promise<Booking[]> {
    return await this.bookingsRepo.findByUserId(userId);
  }

  async update(
    bookingId: number,
    editBookingDto: EditBookingRequest,
  ): Promise<Booking> {
    this.validateSessionRange({
      startDate: editBookingDto.startDate,
      endDate: editBookingDto.endDate,
    });
    return await this.bookingsRepo.update(bookingId, editBookingDto);
  }

  async remove(bookingId: number): Promise<Booking> {
    return await this.bookingsRepo.remove(bookingId);
  }

  async validateSessionRange(range: {
    startDate?: Date;
    endDate?: Date;
  }): Promise<void> {
    if (
      (range.startDate && range.startDate.toISOString() < this.minDate) ||
      (range.endDate && range.endDate.toISOString() > this.maxDate)
    ) {
      throw new InvalidRequestError(
        'Interview session not in specified range.',
      );
    }
  }
}

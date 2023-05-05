import { Injectable } from '@nestjs/common';
import { CreateBookingRequest, EditBookingRequest } from 'types';
import { BookingsRepository } from './bookings.repository';
@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepo: BookingsRepository) {}

  async create(createBookingDto: CreateBookingRequest) {
    return await this.bookingsRepo.create(createBookingDto);
  }

  async findAll() {
    return await this.bookingsRepo.find();
  }

  async findUnique(bookingId: number) {
    return await this.bookingsRepo.findUnique(bookingId);
  }

  async findByUserId(userId: number) {
    return await this.bookingsRepo.findByUserId(userId);
  }

  async update(bookingId: number, editBookingDto: EditBookingRequest) {
    return await this.bookingsRepo.update(bookingId, editBookingDto);
  }

  async remove(bookingId: number) {
    return await this.bookingsRepo.remove(bookingId);
  }
}

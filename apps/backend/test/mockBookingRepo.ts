import { Booking, Company } from 'database';
import {
  FailedRelationConstraintError,
  InvalidRequestError,
  RecordNotFound,
} from 'src/common/commonError';
import { EditBookingRequest } from 'types';
import { mockUsersService } from './mockUsersService';
import { mockCompanyRepo } from './mockCompaniesRepo';

export const bookingData = {
  1: {
    id: 1,
    startDate: new Date('May 12, 2022 04:00:00'),
    endDate: new Date('May 12, 2022 05:00:00'),
    userId: 1,
    companyId: 1,
  },
  2: {
    id: 2,
    startDate: new Date('May 10, 2022 08:00:00'),
    endDate: new Date('May 10, 2022 09:00:00'),
    userId: 2,
    companyId: 2,
  },
};

export const mockBookingRepo = {
  create: (createBookingData: {
    startDate: Date;
    endDate: Date;
    userId: number;
    companyId: number;
  }): Booking => {
    if (
      createBookingData.startDate.toISOString >
      createBookingData.endDate.toISOString
    ) {
      throw new InvalidRequestError(
        'Please enter valid dates for an interview session.',
      );
    }
    if (!mockUsersService.getUserByUserId(createBookingData.userId)) {
      throw new FailedRelationConstraintError('Not valid user');
    }
    if (!mockCompanyRepo.findUnique(createBookingData.companyId)) {
      throw new FailedRelationConstraintError('Not valid company');
    }
    return { id: 3, ...createBookingData };
  },

  find: (): Booking[] => {
    return [bookingData[1], bookingData[2]];
  },

  findUnique: (bookingId: number): Booking => {
    for (const booking of Object.values(bookingData)) {
      if (booking.id === bookingId) {
        return booking;
      }
    }
    throw new RecordNotFound(`Company id${bookingId} doesn't exist.`);
  },

  findByUserId: (userId: number): Booking[] => {
    const temp = [];
    for (const booking of Object.values(bookingData)) {
      if (booking.userId === userId) {
        temp.push(booking);
      }
      return temp;
    }
  },

  update: (
    bookingId: number,
    bookingUpdateData: EditBookingRequest,
  ): Booking => {
    let target: Booking;
    for (const booking of Object.values(bookingData)) {
      if (booking.id === bookingId) {
        target = booking;
      }
    }
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
    return {
      id: bookingId,
      startDate: bookingUpdateData.startDate ?? target.startDate,
      endDate: bookingUpdateData.endDate ?? target.endDate,
      userId: bookingUpdateData.userId ?? target.userId,
      companyId: bookingUpdateData.companyId ?? target.companyId,
    };
  },

  remove: (bookingId: number): Booking => {
    let target: Booking;
    for (const booking of Object.values(bookingData)) {
      if (booking.id === bookingId) {
        target = booking;
      }
    }
    if (!target)
      throw new RecordNotFound(`Booking id${bookingId} doesn't exist.`);
    return target;
  },
};

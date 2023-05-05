import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { UsersModule } from 'src/users/users.module';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { PrismaService } from 'src/prisma/prisma.service';

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [BookingsController],
      providers: [BookingsService, BookingsRepository, PrismaService],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

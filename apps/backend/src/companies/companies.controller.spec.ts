import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { UsersModule } from 'src/users/users.module';
import { CompaniesRepository } from './companies.repository';
import { PrismaService } from 'src/prisma/prisma.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [CompaniesController],
      providers: [CompaniesService, CompaniesRepository, PrismaService],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

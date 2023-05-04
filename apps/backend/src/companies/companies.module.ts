import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompaniesRepository } from './companies.repository';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository, PrismaService],
})
export class CompaniesModule {}

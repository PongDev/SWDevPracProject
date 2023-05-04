import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompaniesRepository } from './companies.repository';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository, PrismaService],
})
export class CompaniesModule {}

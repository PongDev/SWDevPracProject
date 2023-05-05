import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.gateway';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [AuthModule, CompaniesModule, UsersModule, BookingsModule],
  providers: [PrismaService, SocketGateway],
})
export class AppModule {}

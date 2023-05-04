import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.gateway';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, CompaniesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SocketGateway],
})
export class AppModule {}

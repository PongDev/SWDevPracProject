import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'database';
import { InvalidRequestError } from 'src/common/commonError';
import { RecordAlreadyExists } from 'src/common/commonError';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(creatUserData: {
    name: string;
    tel: string;
    password: string;
    email: string;
  }): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: creatUserData,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new RecordAlreadyExists('Email already exists.');
      }
      throw e;
    }
  }

  // async search(data: {
  //     email?: string,
  //     name?: string,
  //     tel?: string,
  //     id?: string,
  //     role?: Role
  // }, searchOption?: {
  //     offset?: number,
  //     limit?: number
  // }): Promise<User[]> {
  //     try {
  //         return await this.prismaService.user.findMany({
  //             where: {
  //                 email: data.email,
  //                 name: data.name,
  //                 tel: data.tel,
  //                 id: data.id,
  //                 roles: { has: data.role }
  //             },
  //             skip: searchOption.offset,
  //             take: searchOption.limit,
  //         })
  //     }catch(error){
  //         throw(error)
  //     }
  // }

  async findUniqueUser(searchField: {
    userId?: number;
    email?: string;
  }): Promise<User> {
    if (!searchField.userId && !searchField.email) {
      throw new InvalidRequestError('Must enter userId or email.');
    }
    return await this.prismaService.user.findUnique({
      where: {
        id: searchField.userId,
        email: searchField.email,
      },
    });
  }
}

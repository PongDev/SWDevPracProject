import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from 'database';
import { InvalidRequestError } from 'src/common/commonError';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(creatUserData: {
    name: string;
    tel: string;
    password: string;
    email: string;
  }): Promise<User> {
    return await this.prismaService.user.create({
      data: creatUserData,
    });
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

  async findUniqueUser(userId?: string, email?: string): Promise<User> {
    if (!userId && !email) {
      throw new InvalidRequestError('Must enter userId or email.');
    }
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
        email: email,
      },
    });
  }
}

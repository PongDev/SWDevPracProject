import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from 'database';

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
    } catch (error) {
      throw error;
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
  async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}

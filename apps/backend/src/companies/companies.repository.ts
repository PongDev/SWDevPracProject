import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Address, Company } from 'database';
import { updateCompanyRequest } from 'types';

@Injectable()
export class CompaniesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompanyData: {
    name: string;
    address: Address;
    tel: string;
    website: string;
    description: string;
  }): Promise<Company> {
    return await this.prismaService.company.create({
      data: createCompanyData,
    });
  }

  async find(): Promise<Company[]> {
    return await this.prismaService.company.findMany();
  }

  async findUnique(companyId: string): Promise<Company> {
    return await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });
  }

  async update(
    companyId: string,
    updateCompanyDto: updateCompanyRequest,
  ): Promise<Company> {
    return await this.prismaService.company.update({
      data: updateCompanyDto,
      where: {
        id: companyId,
      },
    });
  }

  async remove(companyId: string): Promise<Company> {
    return await this.prismaService.company.delete({
      where: {
        id: companyId,
      },
    });
  }
}

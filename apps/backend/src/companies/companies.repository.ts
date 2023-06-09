import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from 'database';
import { UpdateCompanyRequest } from 'types';
import { RecordNotFound } from '../common/commonError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class CompaniesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompanyData: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    description: string;
    tel: string;
  }): Promise<Company> {
    return await this.prismaService.company.create({
      data: createCompanyData,
    });
  }

  async find(): Promise<Company[]> {
    return await this.prismaService.company.findMany();
  }

  async findUnique(companyId: number): Promise<Company> {
    const result = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });
    if (!result) {
      throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
    }
    return result;
  }

  async update(
    companyId: number,
    UpdateCompanyDto: UpdateCompanyRequest,
  ): Promise<Company> {
    const result = await this.prismaService.company.update({
      data: UpdateCompanyDto,
      where: {
        id: companyId,
      },
    });
    if (!result) {
      throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
    }
    return result;
  }

  async remove(companyId: number): Promise<Company> {
    try {
      const result = await this.prismaService.company.delete({
        where: {
          id: companyId,
        },
      });
      if (!result)
        throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
      return result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
      throw error;
    }
  }
}

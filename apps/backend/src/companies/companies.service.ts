import { Injectable } from '@nestjs/common';
import { CreateCompanyRequest, UpdateCompanyRequest } from 'types';
import { CompaniesRepository } from './companies.repository';
import { Company } from 'database';
import { UnauthenticationError } from 'src/common/commonError';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepo: CompaniesRepository) {}
  async create(createCompanyDto: CreateCompanyRequest) {
    return await this.companiesRepo.create(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return await this.companiesRepo.find();
  }

  async findOne(id: string): Promise<Company> {
    return await this.companiesRepo.findUnique(id);
  }

  async update(id: string, UpdateCompanyDto: UpdateCompanyRequest) {
    return await this.companiesRepo.update(id, UpdateCompanyDto);
  }

  async remove(id: string) {
    return await this.companiesRepo.remove(id);
  }
}

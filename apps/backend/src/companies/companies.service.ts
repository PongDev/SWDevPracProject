import { Injectable } from '@nestjs/common';
import { CreateCompanyRequest, updateCompanyRequest } from 'types';
import { CompaniesRepository } from './companies.repository';
import { Company } from 'database';

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

  async update(id: string, updateCompanyDto: updateCompanyRequest) {
    return await this.companiesRepo.update(id, updateCompanyDto);
  }

  async remove(id: string) {
    return await this.companiesRepo.remove(id);
  }
}

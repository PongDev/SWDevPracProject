import { Injectable } from '@nestjs/common';
import { CreateCompanyRequest, UpdateCompanyRequest } from 'types';
import { CompaniesRepository } from './companies.repository';
import { Company, Role } from 'database';
import { UsersService } from 'src/users/users.service';
import { PermissionError } from 'src/common/commonError';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companiesRepo: CompaniesRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: number, createCompanyDto: CreateCompanyRequest) {
    if (await this.checkAdminAuthorization(userId)) {
      return await this.companiesRepo.create(createCompanyDto);
    }
    throw new PermissionError('Only Admin can edit this resource');
  }

  async findAll(): Promise<Company[]> {
    return await this.companiesRepo.find();
  }

  async findOne(id: number): Promise<Company> {
    return await this.companiesRepo.findUnique(id);
  }

  async update(
    userId: number,
    id: number,
    UpdateCompanyDto: UpdateCompanyRequest,
  ) {
    if (await this.checkAdminAuthorization(userId)) {
      return await this.companiesRepo.update(id, UpdateCompanyDto);
    }
    throw new PermissionError('Only Admin can edit this resource');
  }

  async remove(userId: number, id: number) {
    if (await this.checkAdminAuthorization(userId)) {
      return await this.companiesRepo.remove(id);
    }
    throw new PermissionError('Only Admin can delete this resource');
  }

  async checkAdminAuthorization(userId: number) {
    const user = await this.usersService.getUserByUserId(userId);
    return user.role == Role.ADMIN;
  }
}

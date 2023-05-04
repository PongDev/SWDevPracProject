import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyRequest, updateCompanyRequest } from 'types';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCompanyDto: CreateCompanyRequest) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: updateCompanyRequest,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}

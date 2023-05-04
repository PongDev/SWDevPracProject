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
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  CreateCompanyRequest,
  CreateCompanyResponse,
  GetCompanyByIdResponse,
  JWTPayload,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
} from 'types';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Company } from 'types/src/dtos/company/company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecordNotFound } from 'src/common/commonError';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  exceptionHandler(e: Error) {
    if (e instanceof RecordNotFound)
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The company has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCompanyDto: CreateCompanyRequest,
  ): Promise<CreateCompanyResponse> {
    return await this.companiesService.create(createCompanyDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The companies have been retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Company[]> {
    return await this.companiesService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The company has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check the id again.',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<GetCompanyByIdResponse> {
    return await this.companiesService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The company has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check the id again.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not authorized to access this resource.',
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() UpdateCompanyDto: UpdateCompanyRequest,
  ): Promise<UpdateCompanyResponse> {
    return await this.companiesService.update(id, UpdateCompanyDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The company has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check the id again.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not authorized to access this resource.',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Company> {
    return await this.companiesService.remove(id);
  }
}

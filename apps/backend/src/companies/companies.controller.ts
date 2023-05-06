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
  UseFilters,
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
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Company } from 'types/src/dtos/company/company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiTags('companies')
@UseFilters(AllExceptionsFilter)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The company has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @User() user: JWTPayload,
    @Body() createCompanyDto: CreateCompanyRequest,
  ): Promise<CreateCompanyResponse> {
    return await this.companiesService.create(user.userID, createCompanyDto);
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
  async findOne(@Param('id') id: number): Promise<GetCompanyByIdResponse> {
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
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @User() user: JWTPayload,
    @Param('id') id: number,
    @Body() UpdateCompanyDto: UpdateCompanyRequest,
  ): Promise<UpdateCompanyResponse> {
    return await this.companiesService.update(
      user.userID,
      id,
      UpdateCompanyDto,
    );
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
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(
    @User() user: JWTPayload,
    @Param('id') id: number,
  ): Promise<Company> {
    return await this.companiesService.remove(user.userID, id);
  }
}

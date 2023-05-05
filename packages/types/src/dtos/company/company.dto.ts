import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from "class-validator";

export class Company {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Company ID",
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company name",
    example: "Test Company",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company website",
    example: "www.google.com",
  })
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company description",
    example: "Big tech company",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company phone number",
    example: "0957383842",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  tel: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company's street location",
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company's city location",
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company's state location",
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company's zip code",
  })
  @IsPostalCode()
  @IsNotEmpty()
  zip: string;
}

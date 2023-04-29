import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsPhoneNumber, IsString, Validate } from "class-validator";

class Address {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;
}

export class Company {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company ID",
    example: "",
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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
    type: () => Address,
    required: true,
    description: "Address in street, city, state, zip format",
  })
  @Type(() => Address)
  address: Address;

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
}

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

  @Type(() => Address)
  address: Address;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  tel: string;
}

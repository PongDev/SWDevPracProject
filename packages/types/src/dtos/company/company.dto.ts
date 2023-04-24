import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsPhoneNumber, IsString, Validate } from "class-validator";

class Address {
  @IsString()
  @IsNotEmpty()
  street: String;

  @IsString()
  @IsNotEmpty()
  city: String;

  @IsString()
  @IsNotEmpty()
  state: String;

  @IsString()
  @IsNotEmpty()
  zip: String;
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
  id: String;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company name",
    example: "Test Company",
  })
  @IsString()
  @IsNotEmpty()
  name: String;

  @Type(() => Address)
  address: Address;

  @IsString()
  @IsNotEmpty()
  website: String;

  @IsString()
  @IsNotEmpty()
  description: String;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  tel: String;
}

import { ApiProperty } from "@nestjs/swagger";
import { Role } from "database";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  IsString,
} from "class-validator";

export class User {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "User ID",
    example: "1",
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's email",
    example: "example@email.com",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's password",
    example: "#diwf84odfhFS",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "User's name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's telephone number",
    example: "0957777777",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  tel: string;

  @ApiProperty({
    required: true,
    description: "User's role",
    enum: Role,
  })
  @IsString()
  role: Role;
}

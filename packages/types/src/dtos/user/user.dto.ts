import { ApiProperty } from "@nestjs/swagger";
import { Role } from "database";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class User {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "User ID",
    example: "",
  })
  @IsString()
  @IsNotEmpty()
  id: String;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's email",
    example: "example@email.com",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: String;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's password",
    example: "#diwf84odfhFS",
  })
  @IsString()
  @IsNotEmpty()
  password: String;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: String;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's telephone number",
    example: "0957777777",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  tel: String;

  @ApiProperty({
    required: true,
    description: "User's roles",
  })
  @IsArray()
  roles: Role[];
}

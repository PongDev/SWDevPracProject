import { ApiProperty, PickType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  MinDate,
  MaxDate,
} from "class-validator";
import { User } from "../user/user.dto";
import { Type } from "class-transformer";

export class Booking {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "Booking id",
    example: "",
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date("May 10, 2022 00:00:00"))
  @MaxDate(new Date("May 13, 2022 23:59:59"))
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date("May 10, 2022 00:00:00"))
  @MaxDate(new Date("May 13, 2022 23:59:59"))
  endDate: Date;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User ID",
    example: "",
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Company ID",
    example: "",
  })
  @IsString()
  @IsNotEmpty()
  companyId: String;
}

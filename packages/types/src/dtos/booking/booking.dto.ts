import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  MinDate,
  MaxDate,
} from "class-validator";
import { Type } from "class-transformer";

export class Booking {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Booking id",
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: () => Date,
    required: true,
    description: "Start date for interview session",
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date("May 10, 2022 00:00:00"))
  @MaxDate(new Date("May 13, 2022 23:59:59"))
  startDate: Date;

  @ApiProperty({
    type: () => Date,
    required: true,
    description: "End date for interview session",
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @MinDate(new Date("May 10, 2022 00:00:00"))
  @MaxDate(new Date("May 13, 2022 23:59:59"))
  endDate: Date;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "User ID",
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Company ID",
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  companyId: number;
}

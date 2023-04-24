import { OmitType, PartialType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";
import { CreateBookingRequest } from "./createBooking.dto";

export class EditBookingRequest extends PartialType(CreateBookingRequest) {}

export class EditBookingResponse extends Booking {}

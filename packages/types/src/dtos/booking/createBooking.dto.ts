import { OmitType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";

export class CreateBookingRequest extends OmitType(Booking, ["id"] as const) {}

export class CreateBookingResponse extends Booking {}

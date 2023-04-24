import { PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";

export class GetBookingByUserIdRequest extends PickType(Booking, ["userId"]) {}

export class GetBookingByUserIdResponse extends Booking {}

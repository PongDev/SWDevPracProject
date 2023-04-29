import { PickType } from "@nestjs/swagger";
import { User } from "./user.dto";

export class logInRequest extends PickType(User, [
  "email",
  "password",
] as const) {}

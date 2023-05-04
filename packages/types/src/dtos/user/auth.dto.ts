import { PickType } from "@nestjs/swagger";
import { User } from "./user.dto";

export class LogInRequest extends PickType(User, [
  "email",
  "password",
] as const) {}

import { OmitType, PickType } from "@nestjs/swagger";
import { User } from "./user.dto";

export class CreateUserRequest extends PickType(User, [
  "email",
  "name",
  "password",
  "tel",
] as const) {}
export class CreateUserResponse extends OmitType(User, ["password"] as const) {}

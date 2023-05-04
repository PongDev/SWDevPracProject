import { OmitType, PickType } from "@nestjs/swagger";
import { User } from "./user.dto";

export class GetUserByUserIdRequest extends PickType(User, ["id"]) {}
export class GetUserByUserIdResponse extends OmitType(User, ["password"]) {}

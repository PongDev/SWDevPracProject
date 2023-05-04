import { PickType } from "@nestjs/swagger";
import { Company } from "./company.dto";

export class GetCompanyByIdRequest extends PickType(Company, ["id"] as const) {}
export class GetCompanyByIdResponse extends Company {}

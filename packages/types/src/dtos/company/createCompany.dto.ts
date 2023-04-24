import { OmitType } from "@nestjs/swagger";
import { Company } from "./company.dto";

export class CreateCompanyRequest extends OmitType(Company, ["id"]) {}
export class CreateCompanyResponse extends Company {}

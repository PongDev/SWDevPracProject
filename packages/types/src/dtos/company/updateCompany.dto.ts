import { PartialType } from "@nestjs/swagger";
import { CreateCompanyRequest } from "./createCompany.dto";
import { Company } from "./company.dto";

export class updateCompanyRequest extends PartialType(CreateCompanyRequest) {}
export class updateCompanyResponse extends Company {}

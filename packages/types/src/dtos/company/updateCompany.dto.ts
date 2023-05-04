import { PartialType } from "@nestjs/swagger";
import { CreateCompanyRequest } from "./createCompany.dto";
import { Company } from "./company.dto";

export class UpdateCompanyRequest extends PartialType(CreateCompanyRequest) {}
export class UpdateCompanyResponse extends Company {}

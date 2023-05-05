import { Company, Role } from 'database';
import { UpdateCompanyRequest } from 'types';
import { RecordNotFound } from 'src/common/commonError';

export const companyData = {
  1: {
    id: 1,
    name: 'Test company 1',
    street: 'Test street 1',
    city: 'Test city 1',
    state: 'Test state 1',
    zip: '10270',
    website: 'www.google.com',
    description: 'Loremsomethingcompany1',
    tel: '0987778888',
  },
  2: {
    id: 2,
    name: 'Test company 2',
    street: 'Test street 2',
    city: 'Test city 2',
    state: 'Test state 2',
    zip: '10270',
    website: 'www.facebook.com',
    description: 'Loremsomethingcompany2',
    tel: '0987778888',
  },
};
export const mockCompanyRepo = {
  create: (createCompanyData: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    description: string;
    tel: string;
  }): Company => {
    return {
      id: 3,
      name: createCompanyData.name,
      street: createCompanyData.street,
      city: createCompanyData.city,
      state: createCompanyData.state,
      zip: createCompanyData.zip,
      website: createCompanyData.website,
      description: createCompanyData.description,
      tel: createCompanyData.tel,
    };
  },
  find: (): Company[] => {
    return [companyData[1], companyData[2]];
  },
  findUnique: (companyId: number): Company => {
    for (const company of Object.values(companyData)) {
      if (company.id === companyId) {
        return company;
      }
    }
    throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
  },
  update: (companyId: number, updateCompanyDto: UpdateCompanyRequest) => {
    if (!companyData[companyId])
      throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
    return {
      id: companyId,
      name: updateCompanyDto.name ?? companyData[companyId].name,
      street: updateCompanyDto.name ?? companyData[companyId].street,
      city: updateCompanyDto.city ?? companyData[companyId].city,
      state: updateCompanyDto.state ?? companyData[companyId].state,
      zip: updateCompanyDto.zip ?? companyData[companyId].zip,
      website: updateCompanyDto.website ?? companyData[companyId].website,
      description:
        updateCompanyDto.description ?? companyData[companyId].description,
      tel: updateCompanyDto.tel ?? companyData[companyId].tel,
    };
  },
  remove: (companyId: number): Company => {
    if (!companyData[companyId])
      throw new RecordNotFound(`Company id${companyId} doesn't exist.`);
    return {
      id: companyId,
      name: companyData[companyId].name,
      street: companyData[companyId].street,
      city: companyData[companyId].city,
      state: companyData[companyId].state,
      zip: companyData[companyId].zip,
      website: companyData[companyId].website,
      description: companyData[companyId].description,
      tel: companyData[companyId].tel,
    };
  },
};

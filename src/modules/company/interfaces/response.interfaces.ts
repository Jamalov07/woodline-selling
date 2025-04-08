import { GlobalResponse, PaginationResponse } from '../../../common'
import { ModelOptional } from '../../model/interfaces'
import { CompanyRequired } from './fields.interfaces'

export declare interface CompanyFindManyData extends PaginationResponse<CompanyFindOneData> {}

export declare interface CompanyFindManyResponse extends GlobalResponse {
	data: CompanyFindManyData | CompanyFindOneData[]
}

export declare interface CompanyFindOneData extends Pick<CompanyRequired, 'id' | 'name' | 'createdAt'> {
	models?: ModelOptional[]
}

export declare interface CompanyFindOneResponse extends GlobalResponse {
	data: CompanyFindOneData
}

export declare interface CompanyCreateOneResponse extends GlobalResponse {
	data: CompanyFindOneData
}

export declare interface CompanyUpdateOneResponse extends GlobalResponse {
	data: CompanyFindOneData
}

export declare interface CompanyModifyResposne extends GlobalResponse {
	data: null
}

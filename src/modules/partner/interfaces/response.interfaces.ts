import { GlobalResponse, PaginationResponse } from '@common'
import { PartnerRequired } from './fields.interfaces'

export declare interface PartnerFindManyData extends PaginationResponse<PartnerFindOneData> {}

export declare interface PartnerFindOneData extends Pick<PartnerRequired, 'id' | 'fullname' | 'createdAt'> {}

export declare interface PartnerFindManyResponse extends GlobalResponse {
	data: PartnerFindManyData
}

export declare interface PartnerFindOneResponse extends GlobalResponse {
	data: PartnerFindOneData
}

export declare interface PartnerModifyResposne extends GlobalResponse {
	data: null
}

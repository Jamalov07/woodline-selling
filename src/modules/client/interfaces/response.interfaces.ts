import { GlobalResponse, PaginationResponse } from '@common'
import { ClientRequired } from './fields.interfaces'

export declare interface ClientFindManyData extends PaginationResponse<ClientFindOneData> {}

export declare interface ClientFindOneData extends Pick<ClientRequired, 'id' | 'phone' | 'name' | 'whereFrom' | 'createdAt' | 'deletedAt'> {}

//====================

export declare interface ClientFindManyResponse extends GlobalResponse {
	data: ClientFindManyData | ClientFindOneData[]
}

export declare interface ClientFindOneResponse extends GlobalResponse {
	data: ClientFindOneData
}

export declare interface ClientModifyResposne extends GlobalResponse {
	data: null
}

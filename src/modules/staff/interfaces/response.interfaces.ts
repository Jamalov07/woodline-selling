import { GlobalResponse, PaginationResponse } from '@common'
import { StaffRequired } from './fields.interfaces'

export declare interface StaffFindManyData extends PaginationResponse<StaffFindOneData> {}

export declare interface StaffFindOneData extends Pick<StaffRequired, 'id' | 'phone' | 'name' | 'createdAt' | 'deletedAt'> {}

export declare interface StaffFindManyResponse extends GlobalResponse {
	data: StaffFindManyData | { data: StaffFindOneData[] }
}

export declare interface StaffFindOneResponse extends GlobalResponse {
	data: StaffFindOneData & { actionIds?: string[] }
}

export declare interface StaffModifyResposne extends GlobalResponse {
	data: null
}

import { GlobalResponse, PaginationResponse } from '../../../common'
import { InventoryRequired } from './fields.interfaces'

export declare interface InventoryFindManyData extends PaginationResponse<InventoryFindOneData> {}

export declare interface InventoryFindManyResponse extends GlobalResponse {
	data: InventoryFindManyData
}

export declare interface InventoryFindOneData extends Pick<InventoryRequired, 'id' | 'type' | 'createdAt'> {}

export declare interface InventoryFindOneResponse extends GlobalResponse {
	data: InventoryFindOneData
}

export declare interface InventoryModifyResposne extends GlobalResponse {
	data: null
}

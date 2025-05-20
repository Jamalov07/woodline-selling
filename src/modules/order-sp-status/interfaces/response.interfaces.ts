import { GlobalResponse, PaginationResponse } from '../../../common'
import { OrderSPStatusRequired } from './fields.interfaces'

export declare interface OrderSPStatusFindManyData extends PaginationResponse<OrderSPStatusFindOneData> {}

export declare interface OrderSPStatusFindManyResponse extends GlobalResponse {
	data: OrderSPStatusFindManyData
}

export declare interface OrderSPStatusFindOneData extends Pick<OrderSPStatusRequired, 'id' | 'createdAt'> {}

export declare interface OrderSPStatusFindOneResponse extends GlobalResponse {
	data: OrderSPStatusFindOneData
}

export declare interface OrderSPStatusModifyResposne extends GlobalResponse {
	data: null
}

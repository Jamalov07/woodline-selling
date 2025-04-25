import { GlobalResponse, PaginationResponse } from '../../../common'
import { OrderRequired } from './fields.interfaces'

export declare interface OrderFindManyData extends PaginationResponse<OrderFindOneData> {}

export declare interface OrderFindManyResponse extends GlobalResponse {
	data: OrderFindManyData
}

export declare interface OrderFindOneData extends Pick<OrderRequired, 'id' | 'deliveryAddress' | 'deliveryDate' | 'createdAt'> {}

export declare interface OrderFindOneResponse extends GlobalResponse {
	data: OrderFindOneData
}

export declare interface OrderModifyResposne extends GlobalResponse {
	data: null
}

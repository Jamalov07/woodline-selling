import { PaginationRequest, RequestOtherFields } from '../../../common'
import { OrderSPStatusOptional, OrderSPStatusRequired } from './fields.interfaces'

export declare interface OrderSPStatusFindManyRequest extends PaginationRequest, Pick<OrderSPStatusOptional, 'spStatusId' | 'orderId'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface OrderSPStatusFindOneRequest extends Pick<OrderSPStatusRequired, 'id'> {}

export declare interface OrderSPStatusGetManyRequest extends PaginationRequest, OrderSPStatusOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface OrderSPStatusGetOneRequest extends OrderSPStatusOptional {}

export declare interface OrderSPStatusCreateOneRequest
	extends Pick<OrderSPStatusRequired, 'quantity' | 'spStatusId' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum'>,
		Pick<OrderSPStatusOptional, 'orderId'> {}

export declare interface OrderSPStatusUpdateOneRequest
	extends Pick<OrderSPStatusOptional, 'quantity' | 'spStatusId' | 'deletedAt' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum' | 'status'> {}

export declare interface OrderSPStatusDeleteOneRequest extends Pick<OrderSPStatusOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}

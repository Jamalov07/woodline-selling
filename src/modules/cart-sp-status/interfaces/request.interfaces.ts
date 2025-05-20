import { PaginationRequest, RequestOtherFields } from '../../../common'
import { CartSPStatusOptional, CartSPStatusRequired } from './fields.interfaces'

export declare interface CartSPStatusFindManyRequest extends PaginationRequest, Pick<CartSPStatusOptional, 'spStatusId' | 'staffId'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface CartSPStatusFindOneRequest extends Pick<CartSPStatusRequired, 'id'> {}

export declare interface CartSPStatusGetManyRequest extends PaginationRequest, CartSPStatusOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface CartSPStatusGetOneRequest extends CartSPStatusOptional {}

export declare interface CartSPStatusCreateOneRequest
	extends Pick<CartSPStatusRequired, 'quantity' | 'spStatusId' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum'>,
		Pick<CartSPStatusOptional, 'staffId'> {}

export declare interface CartSPStatusUpdateOneRequest
	extends Pick<CartSPStatusOptional, 'quantity' | 'spStatusId' | 'deletedAt' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum'> {}

export declare interface CartSPStatusDeleteOneRequest extends Pick<CartSPStatusOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}

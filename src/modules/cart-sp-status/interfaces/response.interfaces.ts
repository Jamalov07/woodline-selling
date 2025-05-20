import { GlobalResponse, PaginationResponse } from '../../../common'
import { CartSPStatusRequired } from './fields.interfaces'

export declare interface CartSPStatusFindManyData extends PaginationResponse<CartSPStatusFindOneData> {}

export declare interface CartSPStatusFindManyResponse extends GlobalResponse {
	data: CartSPStatusFindManyData
}

export declare interface CartSPStatusFindOneData extends Pick<CartSPStatusRequired, 'id' | 'createdAt'> {}

export declare interface CartSPStatusFindOneResponse extends GlobalResponse {
	data: CartSPStatusFindOneData
}

export declare interface CartSPStatusModifyResposne extends GlobalResponse {
	data: null
}

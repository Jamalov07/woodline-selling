import { GlobalResponse, PaginationResponse } from '../../../common'
import { PartnerFindOneData } from '../../partner'
import { OrderRequired } from './fields.interfaces'
import { PaymentFindOneData } from '../../payment'
import { OrderProductFindOneData } from '../../order-product'

export declare interface OrderFindManyData extends PaginationResponse<OrderFindOneData> {}

export declare interface OrderFindManyResponse extends GlobalResponse {
	data: OrderFindManyData
}

export declare interface OrderFindOneData extends Pick<OrderRequired, 'id' | 'deliveryAddress' | 'deliveryDate' | 'createdAt' | 'purchaseStatus' | 'status'> {
	client?: PartnerFindOneData
	payments?: PaymentFindOneData[]
	products?: OrderProductFindOneData[]
}

export declare interface OrderFindOneResponse extends GlobalResponse {
	data: OrderFindOneData
}

export declare interface OrderModifyResposne extends GlobalResponse {
	data: null
}

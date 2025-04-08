import { PaginationRequest, RequestOtherFields } from '../../../common'
import { DeliveryOptional, DeliveryRequired } from './fields.interfaces'

export declare interface DeliveryFindManyRequest
	extends Pick<DeliveryOptional, 'isCopied' | 'orderId' | 'staffId' | 'title'>,
		Pick<RequestOtherFields, 'ids' | 'isDeleted'>,
		PaginationRequest {}

export declare interface DeliveryFindOneRequest extends Pick<DeliveryRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface DeliveryGetManyRequest
	extends Pick<DeliveryOptional, 'isCopied' | 'orderId' | 'staffId' | 'title'>,
		Pick<RequestOtherFields, 'ids' | 'isDeleted'>,
		PaginationRequest {}

export declare interface DeliveryGetOneRequest
	extends Pick<DeliveryOptional, 'id' | 'deliveryDate' | 'isCopied' | 'orderId' | 'price' | 'publicId' | 'staffId' | 'title'>,
		Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface DeliveryCreateOneRequest extends Pick<DeliveryRequired, 'orderId' | 'staffId'>, Pick<DeliveryOptional, 'price' | 'title' | 'deliveryDate' | 'tripId'> {}

export declare interface DeliveryCreateOneRequest {
	datas: DeliveryCreateOneRequest[]
}

export declare interface DeliveryUpdateOneRequest
	extends Pick<DeliveryOptional, 'deletedAt' | 'deliveryDate' | 'isCopied' | 'orderId' | 'price' | 'staffId' | 'title' | 'tripId'> {}

export declare interface DeliveryDeleteOneRequest extends Pick<DeliveryRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted' | 'method'> {}

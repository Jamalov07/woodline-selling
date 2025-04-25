import { PaginationRequest, RequestOtherFields } from '../../../common'
import { OrderOptional, OrderRequired } from './fields.interfaces'

export declare interface OrderFindManyRequest extends PaginationRequest, Pick<OrderOptional, 'clientId' | 'deliveryAddress'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface OrderFindOneRequest extends Pick<OrderRequired, 'id'> {}

export declare interface OrderGetManyRequest extends PaginationRequest, OrderOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface OrderGetOneRequest extends OrderOptional {}

export declare interface OrderCreateOneRequest extends Pick<OrderRequired, 'clientId' | 'deliveryAddress' | 'deliveryDate'> {}

export declare interface OrderUpdateOneRequest extends Pick<OrderOptional, 'clientId' | 'deletedAt' | 'deliveryDate' | 'deliveryAddress'> {}

export declare interface OrderDeleteOneRequest extends Pick<OrderOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}

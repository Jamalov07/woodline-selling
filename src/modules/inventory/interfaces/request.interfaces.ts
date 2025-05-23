import { ProductStatusEnum } from '@prisma/client'
import { PaginationRequest, RequestOtherFields } from '../../../common'
import { InventoryOptional, InventoryRequired } from './fields.interfaces'

export declare interface InventoryFindManyRequest
	extends PaginationRequest,
		Pick<InventoryOptional, 'fromWarehouseId' | 'fromStorekeeperId' | 'providerId' | 'toStorekeeperId' | 'toWarehouseId' | 'status' | 'type'>,
		Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface InventoryFindOneRequest extends Pick<InventoryRequired, 'id'> {}

export declare interface InventoryGetManyRequest extends PaginationRequest, InventoryOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface InventoryGetOneRequest extends InventoryOptional {}

export declare interface InventoryCreateOneProductStatus {
	name: ProductStatusEnum
	quantity: number
}

export declare interface InventoryCreateOneProduct {
	productId: string
	statuses: InventoryCreateOneProductStatus[]
}
export declare interface InventoryCreateOneRequest
	extends Pick<InventoryRequired, 'fromWarehouseId' | 'fromStorekeeperId' | 'providerId' | 'toStorekeeperId' | 'toWarehouseId' | 'status' | 'type'> {
	products: InventoryCreateOneProduct[]
}

export declare interface InventoryUpdateOneRequest
	extends Pick<InventoryOptional, 'fromWarehouseId' | 'fromStorekeeperId' | 'providerId' | 'toStorekeeperId' | 'toWarehouseId' | 'status' | 'type' | 'deletedAt'> {
	products?: InventoryCreateOneProduct[]
	productIdsToDelete?: string[]
	productStatusIdsToDelete?: string[]
}

export declare interface InventoryDeleteOneRequest extends Pick<InventoryOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}

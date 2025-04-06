import { PaginationRequest, RequestOtherFields } from '../../../common'
import { FurnitureTypeOptional, FurnitureTypeRequired } from './fields.interfaces'

export declare interface FurnitureTypeFindManyRequest extends PaginationRequest, Pick<FurnitureTypeOptional, 'name'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}
export declare interface FurnitureTypeFindOneRequest extends Pick<FurnitureTypeOptional, 'id' | 'name'> {}

export declare interface FurnitureTypeGetManyRequest extends PaginationRequest, Pick<FurnitureTypeOptional, 'name'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}
export declare interface FurnitureTypeGetOneRequest extends Pick<FurnitureTypeOptional, 'id' | 'name'> {}

export declare interface FurnitureTypeCreateOneRequest extends Pick<FurnitureTypeRequired, 'name'> {}
export declare interface FurnitureTypeCreateManyRequest {
	datas: FurnitureTypeCreateOneRequest[]
}

export declare interface FurnitureTypeUpdateOneRequest extends Pick<FurnitureTypeOptional, 'name' | 'deletedAt'> {}
export declare interface FurnitureTypeUpdateManyRequest {}

export declare interface FurnitureTypeDeleteOneRequest extends Pick<FurnitureTypeOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
export declare interface FurnitureTypeDeleteManyRequest extends Pick<RequestOtherFields, 'ids' | 'method'> {}

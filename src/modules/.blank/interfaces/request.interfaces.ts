import { RequestOtherFields } from '../../../common'
import { FurnitureTypeOptional, FurnitureTypeRequired } from './fields.interfaces'

export declare interface FindManyFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'name'>, Pick<RequestOtherFields, 'ids'> {}
export declare interface FindOneFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'id' | 'name'> {}

export declare interface GetManyFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'name'>, Pick<RequestOtherFields, 'ids'> {}
export declare interface GetOneFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'id' | 'name'> {}

export declare interface CreateOneFurnitureTypeRequest extends Pick<FurnitureTypeRequired, 'name'> {}
export declare interface CreateManyFurnitureTypeRequest {
	datas: CreateOneFurnitureTypeRequest[]
}

export declare interface UpdateOneFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'name'> {}
export declare interface UpdateManyFurnitureTypeRequest {}

export declare interface DeleteOneFurnitureTypeRequest extends Pick<FurnitureTypeOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
export declare interface DeleteManyFurnitureTypeRequest extends Pick<RequestOtherFields, 'ids' | 'method'> {}

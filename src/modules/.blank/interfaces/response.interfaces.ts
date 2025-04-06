import { GlobalResponse, PaginationResponse } from '../../../common'
import { ModelOptional } from '../../model/interfaces'
import { FurnitureTypeRequired } from './fields.interfaces'

export declare interface FurnitureTypeFindManyData extends PaginationResponse<FurnitureTypeFindOneData> {}

export declare interface FurnitureTypeFindManyResponse extends GlobalResponse {
	data: FurnitureTypeFindManyData | FurnitureTypeFindOneData[]
}

export declare interface FurnitureTypeFindOneData extends Pick<FurnitureTypeRequired, 'id' | 'name' | 'createdAt'> {
	models?: ModelOptional[]
}

export declare interface FurnitureTypeFindOneResponse extends GlobalResponse {
	data: FurnitureTypeFindOneData
}

export declare interface FurnitureTypeCreateOneResponse extends GlobalResponse {
	data: FurnitureTypeFindOneData
}

export declare interface FurnitureTypeModifyResposne extends GlobalResponse {
	data: null
}

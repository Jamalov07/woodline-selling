import { GlobalResponse, PaginationResponse } from '../../../common'
import { ModelOptional } from '../../model/interfaces'
import { ModelRequired } from './fields.interfaces'

export declare interface ModelFindManyData extends PaginationResponse<ModelFindOneData> {}

export declare interface ModelFindManyResponse extends GlobalResponse {
	data: ModelFindManyData | ModelFindOneData[]
}

export declare interface ModelFindOneData
	extends Pick<
		ModelRequired,
		| 'id'
		| 'name'
		| 'createdAt'
		| 'code'
		| 'companyId'
		| 'description'
		| 'fixForSeller'
		| 'forInvestor'
		| 'percentForSeller'
		| 'price'
		| 'priceForB2B'
		| 'retailPrice'
		| 'sale'
		| 'sellerMaxSale'
		| 'typeId'
	> {
	models?: ModelOptional[]
}

export declare interface ModelFindOneResponse extends GlobalResponse {
	data: ModelFindOneData
}

export declare interface ModelCreateOneResponse extends GlobalResponse {
	data: ModelFindOneData
}

export declare interface ModelUpdateOneResponse extends GlobalResponse {
	data: ModelFindOneData
}

export declare interface ModelModifyResposne extends GlobalResponse {
	data: null
}

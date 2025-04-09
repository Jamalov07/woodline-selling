import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ModelOptional, ModelRequired } from './fields.interfaces'

export declare interface ModelFindManyRequest extends PaginationRequest, Pick<ModelOptional, 'name'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}
export declare interface ModelFindOneRequest extends Pick<ModelRequired, 'id'> {}

export declare interface ModelGetManyRequest extends PaginationRequest, Pick<ModelOptional, 'name'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}
export declare interface ModelGetOneRequest extends Pick<ModelOptional, 'id' | 'name'> {}

export declare interface ModelCreateOneRequest
	extends Pick<ModelRequired, 'name' | 'companyId' | 'code' | 'typeId' | 'retailPrice'>,
		Pick<ModelOptional, 'description' | 'fixForSeller' | 'forInvestor' | 'percentForSeller' | 'price' | 'priceForB2B' | 'sale' | 'sellerMaxSale'> {}
export declare interface ModelCreateManyRequest {
	datas: ModelCreateOneRequest[]
}

export declare interface ModelUpdateOneRequest
	extends Pick<
		ModelOptional,
		| 'code'
		| 'companyId'
		| 'description'
		| 'fixForSeller'
		| 'forInvestor'
		| 'name'
		| 'percentForSeller'
		| 'price'
		| 'priceForB2B'
		| 'retailPrice'
		| 'sale'
		| 'sellerMaxSale'
		| 'typeId'
	> {}
export declare interface ModelUpdateManyRequest extends Pick<RequestOtherFields, 'ids'> {
	datas: ModelUpdateOneRequest[]
}

export declare interface ModelDeleteOneRequest extends Pick<ModelOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
export declare interface ModelDeleteManyRequest extends Pick<RequestOtherFields, 'ids' | 'method'> {}

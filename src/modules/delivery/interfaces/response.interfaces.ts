import { Prisma } from '@prisma/client'
import { GlobalResponse, PaginationResponse } from '../../../common'
import { DeliveryRequired } from './fields.interfaces'

export declare interface DeliveryFindManyData extends PaginationResponse<DeliveryFindOneData> {}

export declare interface DeliveryFindManyResponse extends GlobalResponse {
	data: DeliveryFindManyData | DeliveryFindOneData[]
}

export declare interface DeliveryFindOneData extends Pick<DeliveryRequired, 'id' | 'createdAt' | 'price' | 'publicId' | 'title' | 'tripId' | 'deliveryDate'> {}

export declare interface DeliveryFindOneResponse extends GlobalResponse {
	data: DeliveryFindOneData
}

export declare interface DeliveryCreateOneResponse extends GlobalResponse {
	data: DeliveryFindOneData
}

export declare interface DeliveryCreateManyResponse extends GlobalResponse {
	data: Prisma.BatchPayload
}

export declare interface DeliveryUpdateOneResponse extends GlobalResponse {
	data: DeliveryFindOneData
}

export declare interface DeliveryModifyResposne extends GlobalResponse {
	data: null
}

import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	DeliveryCreateManyResponse,
	DeliveryCreateOneResponse,
	DeliveryFindManyData,
	DeliveryFindManyResponse,
	DeliveryFindOneData,
	DeliveryFindOneResponse,
	DeliveryModifyResposne,
	DeliveryUpdateOneResponse,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { DeliveryRequiredDto } from './fields.dtos'
import { Prisma } from '@prisma/client'

export class DeliveryFindOneDataDto
	extends PickType(DeliveryRequiredDto, ['id', 'createdAt', 'deliveryDate', 'orderId', 'price', 'publicId', 'staffId', 'title', 'tripId'])
	implements DeliveryFindOneData {}

export class DeliveryFindManyDataDto extends PaginationResponseDto implements DeliveryFindManyData {
	@ApiProperty({ type: DeliveryFindOneDataDto, isArray: true })
	data: DeliveryFindOneData[]
}

export class DeliveryFindManyResponseDto extends GlobalResponseDto implements DeliveryFindManyResponse {
	@ApiProperty({ type: DeliveryFindManyDataDto })
	data: DeliveryFindManyData | DeliveryFindOneData[]
}

export class DeliveryFindOneResponseDto extends GlobalResponseDto implements DeliveryFindOneResponse {
	@ApiProperty({ type: DeliveryFindOneDataDto })
	data: DeliveryFindOneData
}

export class DeliveryCreateOneResponseDto extends GlobalResponseDto implements DeliveryCreateOneResponse {
	@ApiProperty({ type: DeliveryFindOneDataDto })
	data: DeliveryFindOneData
}

export class DeliveryCreateManyResponseDto extends GlobalResponseDto implements DeliveryCreateManyResponse {
	@ApiProperty({ example: { count: 3 } })
	data: Prisma.BatchPayload
}

export class DeliveryUpdateOneResponseDto extends GlobalResponseDto implements DeliveryUpdateOneResponse {
	@ApiProperty({ type: DeliveryFindOneDataDto })
	data: DeliveryFindOneData
}

export class DeliveryModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements DeliveryModifyResposne {}

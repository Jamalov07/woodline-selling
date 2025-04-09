import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	DeliveryCreateManyRequest,
	DeliveryCreateOneRequest,
	DeliveryDeleteOneRequest,
	DeliveryFindManyRequest,
	DeliveryFindOneRequest,
	DeliveryUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { DeliveryOptionalDto, DeliveryRequiredDto } from './fields.dtos'

export class DeliveryFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']),
		PickType(DeliveryOptionalDto, ['isCopied', 'orderId', 'staffId', 'title', 'tripId']),
	)
	implements DeliveryFindManyRequest {}

export class DeliveryFindOneRequestDto extends PickType(DeliveryRequiredDto, ['id']) implements DeliveryFindOneRequest {}

export class DeliveryCreateOneRequestDto
	extends IntersectionType(PickType(DeliveryRequiredDto, ['staffId', 'orderId']), PickType(DeliveryOptionalDto, ['deliveryDate', 'price', 'title', 'tripId']))
	implements DeliveryCreateOneRequest {}

export class DeliveryCreateManyRequestDto implements DeliveryCreateManyRequest {
	@ApiProperty({ type: DeliveryCreateOneRequestDto, isArray: true })
	datas: DeliveryCreateOneRequest[]
}

export class DeliveryUpdateOneRequestDto
	extends PickType(DeliveryOptionalDto, ['deliveryDate', 'isCopied', 'orderId', 'price', 'staffId', 'title', 'tripId'])
	implements DeliveryUpdateOneRequest {}

export class DeliveryDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(DeliveryRequiredDto, ['id']))
	implements DeliveryDeleteOneRequest {}

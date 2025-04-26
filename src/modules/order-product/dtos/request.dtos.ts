import { IntersectionType, PickType } from '@nestjs/swagger'
import { OrderProductCreateOneRequest, OrderProductDeleteOneRequest, OrderProductFindManyRequest, OrderProductFindOneRequest, OrderProductUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderProductOptionalDto, OrderProductRequiredDto } from './fields.dtos'

export class OrderProductFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']),
		PickType(OrderProductOptionalDto, ['description', 'modelId', 'orderId', 'direction', 'publicId', 'staffId', 'tissue', 'totalSum']),
	)
	implements OrderProductFindManyRequest {}

export class OrderProductFindOneRequestDto extends PickType(OrderProductRequiredDto, ['id']) implements OrderProductFindOneRequest {}

export class OrderProductCreateOneRequestDto
	extends PickType(OrderProductRequiredDto, [
		'description',
		'orderId',
		'modelId',
		'price',
		'direction',
		'priceWithSale',
		'publicId',
		'quantity',
		'sale',
		'staffId',
		'tissue',
		'totalSum',
	])
	implements OrderProductCreateOneRequest {}

export class OrderProductUpdateOneRequestDto
	extends PickType(OrderProductOptionalDto, [
		'description',
		'modelId',
		'price',
		'direction',
		'priceWithSale',
		'publicId',
		'quantity',
		'sale',
		'staffId',
		'tissue',
		'totalSum',
		'deletedAt',
		'orderId',
	])
	implements OrderProductUpdateOneRequest {}

export class OrderProductDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderProductRequiredDto, ['id']))
	implements OrderProductDeleteOneRequest {}

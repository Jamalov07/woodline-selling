import { IntersectionType, PickType } from '@nestjs/swagger'
import {
	OrderSPStatusCreateOneRequest,
	OrderSPStatusDeleteOneRequest,
	OrderSPStatusFindManyRequest,
	OrderSPStatusFindOneRequest,
	OrderSPStatusUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderSPStatusOptionalDto, OrderSPStatusRequiredDto } from './fields.dtos'

export class OrderSPStatusFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']), PickType(OrderSPStatusOptionalDto, ['spStatusId', 'orderId']))
	implements OrderSPStatusFindManyRequest {}

export class OrderSPStatusFindOneRequestDto extends PickType(OrderSPStatusRequiredDto, ['id']) implements OrderSPStatusFindOneRequest {}

export class OrderSPStatusCreateOneRequestDto
	extends PickType(OrderSPStatusRequiredDto, ['quantity', 'spStatusId', 'description', 'price', 'priceWithSale', 'sale', 'totalSum'])
	implements OrderSPStatusCreateOneRequest {}

export class OrderSPStatusUpdateOneRequestDto
	extends PickType(OrderSPStatusOptionalDto, ['quantity', 'spStatusId', 'deletedAt', 'description', 'status', 'price', 'priceWithSale', 'sale', 'totalSum'])
	implements OrderSPStatusUpdateOneRequest {}

export class OrderSPStatusDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderSPStatusRequiredDto, ['id']))
	implements OrderSPStatusDeleteOneRequest {}

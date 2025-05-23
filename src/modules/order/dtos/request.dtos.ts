import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import {
	OrderCreateOneRequest,
	OrderCreateOneWithPaymentProductRequest,
	OrderDeleteOneRequest,
	OrderFindManyRequest,
	OrderFindOneRequest,
	OrderUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderOptionalDto, OrderRequiredDto } from './fields.dtos'
import { PaymentCreateOneRequest, PaymentCreateOneRequestDto } from '../../payment'
import { OrderProductCreateOneRequest, OrderProductCreateOneRequestDto } from '../../order-product'
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator'

export class OrderFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['ids', 'isDeleted', 'search']),
		PickType(OrderOptionalDto, ['staffId', 'clientId', 'deliveryAddress']),
	)
	implements OrderFindManyRequest {}

export class OrderFindOneRequestDto extends PickType(OrderRequiredDto, ['id']) implements OrderFindOneRequest {}

export class OrderCreateOneRequestDto extends PickType(OrderRequiredDto, ['clientId', 'staffId', 'deliveryAddress', 'deliveryDate']) implements OrderCreateOneRequest {}

class OrderProductWithoutOrderIdDto extends OmitType(OrderProductCreateOneRequestDto, ['orderId']) {}

class PaymentWithoutOrderIdDto extends OmitType(PaymentCreateOneRequestDto, ['orderId']) {}
export class OrderCreateOneWithPaymentProductRequestDto
	extends PickType(OrderRequiredDto, ['clientId', 'deliveryAddress', 'deliveryDate'])
	implements OrderCreateOneWithPaymentProductRequest
{
	@ApiProperty({ type: PaymentWithoutOrderIdDto, isArray: true })
	@IsNotEmpty()
	@IsArray()
	@IsObject({ each: true })
	payments: Omit<PaymentCreateOneRequest, 'orderId'>[]

	@ApiProperty({ type: String, isArray: true })
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	cartIds: string[]

	@ApiProperty({ type: String, isArray: true })
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	cartSPSIds: string[]
}

export class OrderUpdateOneRequestDto extends PickType(OrderOptionalDto, ['clientId', 'status', 'deliveryAddress', 'deliveryDate', 'deletedAt']) implements OrderUpdateOneRequest {}

export class OrderDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderRequiredDto, ['id']))
	implements OrderDeleteOneRequest {}

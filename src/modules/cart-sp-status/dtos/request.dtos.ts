import { IntersectionType, PickType } from '@nestjs/swagger'
import { CartSPStatusCreateOneRequest, CartSPStatusDeleteOneRequest, CartSPStatusFindManyRequest, CartSPStatusFindOneRequest, CartSPStatusUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { CartSPStatusOptionalDto, CartSPStatusRequiredDto } from './fields.dtos'

export class CartSPStatusFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']), PickType(CartSPStatusOptionalDto, ['spStatusId', 'staffId']))
	implements CartSPStatusFindManyRequest {}

export class CartSPStatusFindOneRequestDto extends PickType(CartSPStatusRequiredDto, ['id']) implements CartSPStatusFindOneRequest {}

export class CartSPStatusCreateOneRequestDto
	extends PickType(CartSPStatusRequiredDto, ['quantity', 'spStatusId', 'description', 'price', 'priceWithSale', 'sale', 'totalSum'])
	implements CartSPStatusCreateOneRequest {}

export class CartSPStatusUpdateOneRequestDto
	extends PickType(CartSPStatusOptionalDto, ['quantity', 'spStatusId', 'deletedAt', 'description', 'price', 'priceWithSale', 'sale', 'totalSum'])
	implements CartSPStatusUpdateOneRequest {}

export class CartSPStatusDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(CartSPStatusRequiredDto, ['id']))
	implements CartSPStatusDeleteOneRequest {}

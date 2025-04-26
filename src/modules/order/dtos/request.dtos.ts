import { IntersectionType, PickType } from '@nestjs/swagger'
import { OrderCreateOneRequest, OrderDeleteOneRequest, OrderFindManyRequest, OrderFindOneRequest, OrderUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderOptionalDto, OrderRequiredDto } from './fields.dtos'

export class OrderFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['ids', 'isDeleted', 'search']), PickType(OrderOptionalDto, ['clientId', 'deliveryAddress']))
	implements OrderFindManyRequest {}

export class OrderFindOneRequestDto extends PickType(OrderRequiredDto, ['id']) implements OrderFindOneRequest {}

export class OrderCreateOneRequestDto extends PickType(OrderRequiredDto, ['clientId', 'deliveryAddress', 'deliveryDate']) implements OrderCreateOneRequest {}

export class OrderUpdateOneRequestDto extends PickType(OrderOptionalDto, ['clientId', 'status', 'deliveryAddress', 'deliveryDate', 'deletedAt']) implements OrderUpdateOneRequest {}

export class OrderDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderRequiredDto, ['id']))
	implements OrderDeleteOneRequest {}

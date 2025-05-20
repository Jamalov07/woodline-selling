import { IntersectionType, PickType } from '@nestjs/swagger'
import { InventoryCreateOneRequest, InventoryDeleteOneRequest, InventoryFindManyRequest, InventoryFindOneRequest, InventoryUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { InventoryOptionalDto, InventoryRequiredDto } from './fields.dtos'

export class InventoryFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type']),
	)
	implements InventoryFindManyRequest {}

export class InventoryFindOneRequestDto extends PickType(InventoryRequiredDto, ['id']) implements InventoryFindOneRequest {}

export class InventoryCreateOneRequestDto
	extends PickType(InventoryRequiredDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type'])
	implements InventoryCreateOneRequest {}

export class InventoryUpdateOneRequestDto
	extends PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type', 'deletedAt'])
	implements InventoryUpdateOneRequest {}

export class InventoryDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(InventoryRequiredDto, ['id']))
	implements InventoryDeleteOneRequest {}

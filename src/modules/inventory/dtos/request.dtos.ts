import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	InventoryCreateOneProduct,
	InventoryCreateOneProductStatus,
	InventoryCreateOneRequest,
	InventoryDeleteOneRequest,
	InventoryFindManyRequest,
	InventoryFindOneRequest,
	InventoryUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { InventoryOptionalDto, InventoryRequiredDto } from './fields.dtos'
import { $Enums, ProductStatusEnum } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class InventoryFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type']),
	)
	implements InventoryFindManyRequest {}

export class InventoryFindOneRequestDto extends PickType(InventoryRequiredDto, ['id']) implements InventoryFindOneRequest {}

export class InventoryCreateOneProductStatusDto implements InventoryCreateOneProductStatus {
	@ApiProperty({ enum: ProductStatusEnum })
	@IsNotEmpty()
	@IsEnum(ProductStatusEnum)
	name: $Enums.ProductStatusEnum

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number
}

export class InventoryCreateOneProductDto implements InventoryCreateOneProduct {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	productId: string

	@ApiProperty({ type: InventoryCreateOneProductStatusDto, isArray: true })
	statuses: InventoryCreateOneProductStatus[]
}

export class InventoryCreateOneRequestDto
	extends PickType(InventoryRequiredDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type'])
	implements InventoryCreateOneRequest
{
	@ApiProperty({ type: InventoryCreateOneProductDto, isArray: true })
	products: InventoryCreateOneProduct[]
}

export class InventoryUpdateOneRequestDto
	extends PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type', 'deletedAt'])
	implements InventoryUpdateOneRequest {}

export class InventoryDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(InventoryRequiredDto, ['id']))
	implements InventoryDeleteOneRequest {}

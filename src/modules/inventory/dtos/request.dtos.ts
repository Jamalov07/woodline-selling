import { ApiProperty, ApiPropertyOptional, IntersectionType, PickType } from '@nestjs/swagger'
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
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

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
	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => InventoryCreateOneProductStatusDto)
	statuses: InventoryCreateOneProductStatus[]
}

export class InventoryCreateOneRequestDto
	extends IntersectionType(
		PickType(InventoryRequiredDto, ['type']),
		PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId']),
	)
	implements InventoryCreateOneRequest
{
	@ApiProperty({ type: InventoryCreateOneProductDto, isArray: true })
	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => InventoryCreateOneProductDto)
	products: InventoryCreateOneProductDto[]
}

export class InventoryUpdateOneRequestDto
	extends PickType(InventoryOptionalDto, ['fromStorekeeperId', 'fromWarehouseId', 'providerId', 'status', 'toStorekeeperId', 'toWarehouseId', 'type', 'deletedAt'])
	implements InventoryUpdateOneRequest
{
	@ApiPropertyOptional({ type: InventoryCreateOneProductDto, isArray: true })
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => InventoryCreateOneProductDto)
	products?: InventoryCreateOneProduct[]

	@ApiPropertyOptional({ type: String, isArray: true })
	@IsArray()
	@IsOptional()
	@IsUUID('4', { each: true })
	productIdsToDelete?: string[]

	@ApiPropertyOptional({ type: String, isArray: true })
	@IsArray()
	@IsOptional()
	@IsUUID('4', { each: true })
	productStatusIdsToDelete?: string[]
}

export class InventoryDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(InventoryRequiredDto, ['id']))
	implements InventoryDeleteOneRequest {}

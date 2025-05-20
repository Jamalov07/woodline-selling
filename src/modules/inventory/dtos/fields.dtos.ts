import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { InventoryOptional, InventoryRequired } from '../interfaces'
import { $Enums, InventoryStatusEnum, InventoryTypeEnum } from '@prisma/client'

export class InventoryRequiredDto extends DefaultRequiredFieldsDto implements InventoryRequired {
	@ApiProperty({ enum: InventoryTypeEnum })
	@IsNotEmpty()
	@IsEnum(InventoryTypeEnum)
	type: $Enums.InventoryTypeEnum

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	fromStorekeeperId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	fromWarehouseId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	providerId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	toStorekeeperId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	toWarehouseId: string

	@ApiProperty({ enum: InventoryStatusEnum })
	@IsNotEmpty()
	@IsEnum(InventoryStatusEnum)
	status: $Enums.InventoryStatusEnum
}

export class InventoryOptionalDto extends DefaultOptionalFieldsDto implements InventoryOptional {
	@ApiPropertyOptional({ enum: InventoryTypeEnum })
	@IsOptional()
	@IsEnum(InventoryTypeEnum)
	type?: $Enums.InventoryTypeEnum

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	fromStorekeeperId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	fromWarehouseId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	providerId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	toStorekeeperId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	toWarehouseId?: string

	@ApiPropertyOptional({ enum: InventoryStatusEnum })
	@IsOptional()
	@IsEnum(InventoryStatusEnum)
	status?: $Enums.InventoryStatusEnum
}

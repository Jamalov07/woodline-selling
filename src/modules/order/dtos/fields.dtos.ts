import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { OrderOptional, OrderRequired } from '../interfaces'
import { $Enums, ClientPurchaseStatusEnum, OrderStatusEnum } from '@prisma/client'

export class OrderRequiredDto extends DefaultRequiredFieldsDto implements OrderRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	deliveryAddress: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsDateString()
	deliveryDate: Date

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	clientId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	staffId: string

	@ApiProperty({ enum: OrderStatusEnum })
	@IsNotEmpty()
	@IsEnum(OrderStatusEnum)
	status: $Enums.OrderStatusEnum

	@ApiProperty({ enum: ClientPurchaseStatusEnum })
	@IsNotEmpty()
	@IsEnum(ClientPurchaseStatusEnum)
	purchaseStatus: $Enums.ClientPurchaseStatusEnum
}

export class OrderOptionalDto extends DefaultOptionalFieldsDto implements OrderOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	deliveryAddress?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsDateString()
	deliveryDate?: Date

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	clientId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	staffId?: string

	@ApiPropertyOptional({ enum: OrderStatusEnum })
	@IsOptional()
	@IsEnum(OrderStatusEnum)
	status?: $Enums.OrderStatusEnum

	@ApiPropertyOptional({ enum: ClientPurchaseStatusEnum })
	@IsOptional()
	@IsEnum(ClientPurchaseStatusEnum)
	purchaseStatus?: $Enums.ClientPurchaseStatusEnum
}

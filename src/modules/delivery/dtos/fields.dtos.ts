import { IsBoolean, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { DeliveryOptional, DeliveryRequired } from '../interfaces'
import { Decimal } from '@prisma/client/runtime/library'

export class DeliveryRequiredDto extends DefaultRequiredFieldsDto implements DeliveryRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	title: string

	@ApiProperty({ type: Date })
	@IsNotEmpty()
	@IsDateString()
	deliveryDate: Date

	@ApiProperty({ type: Boolean })
	@IsNotEmpty()
	@IsBoolean()
	isCopied: boolean

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	orderId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	staffId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	tripId: string

	@ApiProperty({ type: Decimal })
	@IsNotEmpty()
	@IsDecimal()
	price: Decimal

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumber()
	publicId: number
}

export class DeliveryOptionalDto extends DefaultOptionalFieldsDto implements DeliveryOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	title?: string

	@ApiPropertyOptional({ type: Date })
	@IsOptional()
	@IsDateString()
	deliveryDate?: Date

	@ApiPropertyOptional({ type: Boolean })
	@IsOptional()
	@IsBoolean()
	isCopied?: boolean

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	orderId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	staffId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	tripId?: string

	@ApiPropertyOptional({ type: Decimal })
	@IsOptional()
	@IsDecimal()
	price?: Decimal

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumber()
	publicId?: number
}

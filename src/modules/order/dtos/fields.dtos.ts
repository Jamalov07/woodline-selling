import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { OrderOptional, OrderRequired } from '../interfaces'

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
}

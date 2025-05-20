import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsIntOrBigInt } from '@common'
import { CartSPStatusOptional, CartSPStatusRequired } from '../interfaces'

export class CartSPStatusRequiredDto extends DefaultRequiredFieldsDto implements CartSPStatusRequired {
	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	spStatusId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	staffId: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	price: bigint

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	priceWithSale: bigint

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	sale: number

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	totalSum: bigint
}

export class CartSPStatusOptionalDto extends DefaultOptionalFieldsDto implements CartSPStatusOptional {
	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	spStatusId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	staffId?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	price?: bigint

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	priceWithSale?: bigint

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	sale?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	totalSum?: bigint
}

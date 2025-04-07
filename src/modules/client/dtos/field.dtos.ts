import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { ClientOptional, ClientRequired } from '../interfaces'

export class ClientRequiredDto extends DefaultRequiredFieldsDto implements ClientRequired {
	@ApiProperty({ type: String, example: '998949174127' })
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	name: string

	whereFrom: string
}

export class ClientOptionalDto extends DefaultOptionalFieldsDto implements ClientOptional {
	@ApiPropertyOptional({ type: String, example: '998949174127' })
	@IsOptional()
	@IsString()
	@IsPhoneNumber('UZ')
	phone?: string

	@ApiPropertyOptional({ type: String, example: 'jamalov n' })
	@IsOptional()
	@IsString()
	name?: string

	whereFrom?: string
}

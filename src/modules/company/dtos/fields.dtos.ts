import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { CompanyOptional, CompanyRequired } from '../interfaces'

export class CompanyRequiredDto extends DefaultRequiredFieldsDto implements CompanyRequired {
	@ApiProperty({ type: String, example: '998949174127' })
	@IsNotEmpty()
	@IsString()
	sheetId: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	name: string
}

export class CompanyOptionalDto extends DefaultOptionalFieldsDto implements CompanyOptional {
	@ApiPropertyOptional({ type: String, example: '998949174127' })
	@IsOptional()
	@IsString()
	sheetId?: string

	@ApiPropertyOptional({ type: String, example: 'jamalov n' })
	@IsOptional()
	@IsString()
	name?: string
}

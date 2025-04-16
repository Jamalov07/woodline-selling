import { IsBoolean, IsJWT, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsIntOrBigInt } from '@common'
import { PartnerInfoOptional, PartnerInfoRequired, UserOptional, UserRequired } from '../interfaces'

export class UserRequiredDto extends DefaultRequiredFieldsDto implements UserRequired {
	@ApiProperty({ type: String, example: '998949174127' })
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String, example: '00d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	fullname: string

	@ApiProperty({ type: String, example: 'token' })
	@IsNotEmpty()
	@IsJWT()
	token: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	username: string
}

export class UserOptionalDto extends DefaultOptionalFieldsDto implements UserOptional {
	@ApiPropertyOptional({ type: String, example: '998949174127' })
	@IsOptional()
	@IsString()
	@IsPhoneNumber('UZ')
	phone?: string

	@ApiPropertyOptional({ type: String, example: '123456777' })
	@IsOptional()
	@MinLength(8)
	@IsString()
	password?: string

	@ApiPropertyOptional({ type: String, example: 'jamalov n' })
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional({ type: String, example: 'token' })
	@IsOptional()
	@IsJWT()
	token?: string

	@ApiPropertyOptional({ type: String, example: 'jamalov n' })
	@IsOptional()
	@IsString()
	username?: string
}

export class PartnerInfoRequiredDto implements PartnerInfoRequired {
	@ApiProperty({ type: String, example: '0' })
	@IsNotEmpty()
	@IsIntOrBigInt()
	balance: bigint

	@ApiProperty({ type: String, example: '' })
	@IsNotEmpty()
	@IsString()
	whereFrom: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	userId: string
}

export class PartnerInfoOptionalDto implements PartnerInfoOptional {
	@ApiPropertyOptional({ type: String, example: '0' })
	@IsOptional()
	@IsIntOrBigInt()
	balance?: bigint

	@ApiPropertyOptional({ type: String, example: '' })
	@IsOptional()
	@IsString()
	whereFrom?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	userId?: string
}

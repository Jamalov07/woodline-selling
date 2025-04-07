import { IsBoolean, IsEnum, IsJWT, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, StaffRoles } from '@common'
import { StaffOptional, StaffRequired } from '../interfaces'

export class StaffRequiredDto extends DefaultRequiredFieldsDto implements StaffRequired {
	@ApiProperty({ type: String, example: '998949174127' })
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String, example: '00d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	// @MinLength(8)
	password: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ type: String, example: 'token' })
	@IsNotEmpty()
	@IsJWT()
	token: string

	@ApiProperty({ type: Boolean })
	@IsNotEmpty()
	@IsBoolean()
	botAccess: boolean

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	companyId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	sheetId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	telegramId: bigint

	@ApiProperty({ enum: StaffRoles })
	@IsNotEmpty()
	@IsEnum(StaffRoles)
	role: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	hashedPassword: string
}

export class StaffOptionalDto extends DefaultOptionalFieldsDto implements StaffOptional {
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
	name?: string

	@ApiPropertyOptional({ type: String, example: 'token' })
	@IsOptional()
	@IsJWT()
	token?: string

	@ApiPropertyOptional({ type: Boolean })
	@IsOptional()
	@IsBoolean()
	botAccess?: boolean

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	companyId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	sheetId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	telegramId?: bigint

	@ApiPropertyOptional({ enum: StaffRoles })
	@IsOptional()
	@IsEnum(StaffRoles)
	role?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	hashedPassword?: string
}

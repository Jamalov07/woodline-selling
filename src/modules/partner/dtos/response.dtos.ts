import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { PartnerFindManyData, PartnerFindManyResponse, PartnerFindOneData, PartnerFindOneResponse, PartnerModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { PartnerRequiredDto } from './fields.dtos'

export class PartnerFindOneDataDto extends PickType(PartnerRequiredDto, ['id', 'fullname', 'createdAt']) implements PartnerFindOneData {}

export class PartnerFindManyDataDto extends PaginationResponseDto implements PartnerFindManyData {
	@ApiProperty({ type: PartnerFindOneDataDto, isArray: true })
	data: PartnerFindOneData[]
}

export class PartnerFindManyResponseDto extends GlobalResponseDto implements PartnerFindManyResponse {
	@ApiProperty({ type: PartnerFindManyDataDto })
	data: PartnerFindManyData
}

export class PartnerFindOneResponseDto extends GlobalResponseDto implements PartnerFindOneResponse {
	@ApiProperty({ type: PartnerFindOneDataDto })
	data: PartnerFindOneData
}

export class PartnerModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements PartnerModifyResposne {}

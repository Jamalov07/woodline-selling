import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	CompanyCreateOneResponse,
	CompanyFindManyData,
	CompanyFindManyResponse,
	CompanyFindOneData,
	CompanyFindOneResponse,
	CompanyModifyResposne,
	CompanyUpdateOneResponse,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { CompanyRequiredDto } from './fields.dtos'

export class CompanyFindOneDataDto extends PickType(CompanyRequiredDto, ['id', 'name', 'sheetId', 'createdAt', 'deletedAt']) implements CompanyFindOneData {}

export class CompanyFindManyDataDto extends PaginationResponseDto implements CompanyFindManyData {
	@ApiProperty({ type: CompanyFindOneDataDto, isArray: true })
	data: CompanyFindOneData[]
}

export class CompanyFindManyResponseDto extends GlobalResponseDto implements CompanyFindManyResponse {
	@ApiProperty({ type: CompanyFindManyDataDto })
	data: CompanyFindManyData | CompanyFindOneData[]
}

export class CompanyFindOneResponseDto extends GlobalResponseDto implements CompanyFindOneResponse {
	@ApiProperty({ type: CompanyFindOneDataDto })
	data: CompanyFindOneData
}

export class CompanyCreateOneResponseDto extends GlobalResponseDto implements CompanyCreateOneResponse {
	@ApiProperty({ type: CompanyFindOneDataDto })
	data: CompanyFindOneData
}

export class CompanyUpdateOneResponseDto extends GlobalResponseDto implements CompanyUpdateOneResponse {
	@ApiProperty({ type: CompanyFindOneDataDto })
	data: CompanyFindOneData
}

export class CompanyModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements CompanyModifyResposne {}

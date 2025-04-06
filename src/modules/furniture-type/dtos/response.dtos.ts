import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	FurnitureTypeCreateOneResponse,
	FurnitureTypeFindManyData,
	FurnitureTypeFindManyResponse,
	FurnitureTypeFindOneData,
	FurnitureTypeFindOneResponse,
	FurnitureTypeModifyResposne,
	FurnitureTypeUpdateOneResponse,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { FurnitureTypeRequiredDto } from './fields.dtos'

export class FurnitureTypeFindOneDataDto extends PickType(FurnitureTypeRequiredDto, ['id', 'name', 'createdAt']) implements FurnitureTypeFindOneData {}

export class FurnitureTypeFindManyDataDto extends PaginationResponseDto implements FurnitureTypeFindManyData {
	@ApiProperty({ type: FurnitureTypeFindOneDataDto, isArray: true })
	data: FurnitureTypeFindOneData[]
}

export class FurnitureTypeFindManyResponseDto extends GlobalResponseDto implements FurnitureTypeFindManyResponse {
	@ApiProperty({ type: FurnitureTypeFindManyDataDto })
	data: FurnitureTypeFindManyData | FurnitureTypeFindOneData[]
}

export class FurnitureTypeFindOneResponseDto extends GlobalResponseDto implements FurnitureTypeFindOneResponse {
	@ApiProperty({ type: FurnitureTypeFindOneDataDto })
	data: FurnitureTypeFindOneData
}

export class FurnitureTypeCreateOneResponseDto extends GlobalResponseDto implements FurnitureTypeCreateOneResponse {
	@ApiProperty({ type: FurnitureTypeFindOneDataDto })
	data: FurnitureTypeFindOneData
}

export class FurnitureTypeUpdateOneResponseDto extends GlobalResponseDto implements FurnitureTypeUpdateOneResponse {
	@ApiProperty({ type: FurnitureTypeFindOneDataDto })
	data: FurnitureTypeFindOneData
}

export class FurnitureTypeModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements FurnitureTypeModifyResposne {}

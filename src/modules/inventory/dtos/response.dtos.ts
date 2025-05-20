import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { InventoryFindManyData, InventoryFindManyResponse, InventoryFindOneData, InventoryFindOneResponse, InventoryModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { InventoryRequiredDto } from './fields.dtos'

export class InventoryFindOneDataDto extends PickType(InventoryRequiredDto, ['id', 'type', 'createdAt']) implements InventoryFindOneData {}

export class InventoryFindManyDataDto extends PaginationResponseDto implements InventoryFindManyData {
	@ApiProperty({ type: InventoryFindOneDataDto, isArray: true })
	data: InventoryFindOneData[]
}

export class InventoryFindManyResponseDto extends GlobalResponseDto implements InventoryFindManyResponse {
	@ApiProperty({ type: InventoryFindManyDataDto })
	data: InventoryFindManyData
}

export class InventoryFindOneResponseDto extends GlobalResponseDto implements InventoryFindOneResponse {
	@ApiProperty({ type: InventoryFindOneDataDto })
	data: InventoryFindOneData
}

export class InventoryModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements InventoryModifyResposne {}

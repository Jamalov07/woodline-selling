import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { CartSPStatusFindManyData, CartSPStatusFindManyResponse, CartSPStatusFindOneData, CartSPStatusFindOneResponse, CartSPStatusModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { CartSPStatusRequiredDto } from './fields.dtos'

export class CartSPStatusFindOneDataDto extends PickType(CartSPStatusRequiredDto, ['id', 'createdAt']) implements CartSPStatusFindOneData {}

export class CartSPStatusFindManyDataDto extends PaginationResponseDto implements CartSPStatusFindManyData {
	@ApiProperty({ type: CartSPStatusFindOneDataDto, isArray: true })
	data: CartSPStatusFindOneData[]
}

export class CartSPStatusFindManyResponseDto extends GlobalResponseDto implements CartSPStatusFindManyResponse {
	@ApiProperty({ type: CartSPStatusFindManyDataDto })
	data: CartSPStatusFindManyData
}

export class CartSPStatusFindOneResponseDto extends GlobalResponseDto implements CartSPStatusFindOneResponse {
	@ApiProperty({ type: CartSPStatusFindOneDataDto })
	data: CartSPStatusFindOneData
}

export class CartSPStatusModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements CartSPStatusModifyResposne {}

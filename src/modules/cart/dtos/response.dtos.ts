import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { CartFindManyData, CartFindManyResponse, CartFindOneData, CartFindOneResponse, CartModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { CartRequiredDto } from './fields.dtos'
import { ModelFindOneData, ModelFindOneDataDto } from '../../model'
import { StaffFindOneData, StaffFindOneDataDto } from '../../staff'

export class CartFindOneDataDto
	extends PickType(CartRequiredDto, ['id', 'createdAt', 'description', 'direction', 'price', 'priceWithSale', 'publicId', 'quantity', 'sale', 'tissue', 'totalSum'])
	implements CartFindOneData
{
	@ApiProperty({ type: ModelFindOneDataDto })
	model?: ModelFindOneData

	@ApiProperty({ type: StaffFindOneDataDto })
	staff?: StaffFindOneData
}

export class CartFindManyDataDto extends PaginationResponseDto implements CartFindManyData {
	@ApiProperty({ type: CartFindOneDataDto, isArray: true })
	data: CartFindOneData[]
}

export class CartFindManyResponseDto extends GlobalResponseDto implements CartFindManyResponse {
	@ApiProperty({ type: CartFindManyDataDto })
	data: CartFindManyData
}

export class CartFindOneResponseDto extends GlobalResponseDto implements CartFindOneResponse {
	@ApiProperty({ type: CartFindOneDataDto })
	data: CartFindOneData
}

export class CartModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements CartModifyResposne {}

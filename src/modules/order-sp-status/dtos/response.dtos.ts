import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { OrderSPStatusFindManyData, OrderSPStatusFindManyResponse, OrderSPStatusFindOneData, OrderSPStatusFindOneResponse, OrderSPStatusModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { OrderSPStatusRequiredDto } from './fields.dtos'

export class OrderSPStatusFindOneDataDto extends PickType(OrderSPStatusRequiredDto, ['id', 'createdAt']) implements OrderSPStatusFindOneData {}

export class OrderSPStatusFindManyDataDto extends PaginationResponseDto implements OrderSPStatusFindManyData {
	@ApiProperty({ type: OrderSPStatusFindOneDataDto, isArray: true })
	data: OrderSPStatusFindOneData[]
}

export class OrderSPStatusFindManyResponseDto extends GlobalResponseDto implements OrderSPStatusFindManyResponse {
	@ApiProperty({ type: OrderSPStatusFindManyDataDto })
	data: OrderSPStatusFindManyData
}

export class OrderSPStatusFindOneResponseDto extends GlobalResponseDto implements OrderSPStatusFindOneResponse {
	@ApiProperty({ type: OrderSPStatusFindOneDataDto })
	data: OrderSPStatusFindOneData
}

export class OrderSPStatusModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements OrderSPStatusModifyResposne {}

import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { OrderFindManyData, OrderFindManyResponse, OrderFindOneData, OrderFindOneResponse, OrderModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { OrderRequiredDto } from './fields.dtos'

export class OrderFindOneDataDto extends PickType(OrderRequiredDto, ['id', 'deliveryAddress', 'deliveryDate', 'createdAt']) implements OrderFindOneData {}

export class OrderFindManyDataDto extends PaginationResponseDto implements OrderFindManyData {
	@ApiProperty({ type: OrderFindOneDataDto, isArray: true })
	data: OrderFindOneData[]
}

export class OrderFindManyResponseDto extends GlobalResponseDto implements OrderFindManyResponse {
	@ApiProperty({ type: OrderFindManyDataDto })
	data: OrderFindManyData
}

export class OrderFindOneResponseDto extends GlobalResponseDto implements OrderFindOneResponse {
	@ApiProperty({ type: OrderFindOneDataDto })
	data: OrderFindOneData
}

export class OrderModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements OrderModifyResposne {}

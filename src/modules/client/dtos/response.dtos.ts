import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ClientCreateOneResponse, ClientFindManyData, ClientFindManyResponse, ClientFindOneData, ClientFindOneResponse, ClientModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ClientRequiredDto } from './fields.dtos'

export class ClientFindOneDataDto extends PickType(ClientRequiredDto, ['id', 'phone', 'name', 'createdAt', 'deletedAt', 'whereFrom']) implements ClientFindOneData {}

export class ClientFindManyDataDto extends PaginationResponseDto implements ClientFindManyData {
	@ApiProperty({ type: ClientFindOneDataDto, isArray: true })
	data: ClientFindOneData[]
}

export class ClientFindManyResponseDto extends GlobalResponseDto implements ClientFindManyResponse {
	@ApiProperty({ type: ClientFindManyDataDto })
	data: ClientFindManyData | ClientFindOneData[]
}

export class ClientFindOneResponseDto extends GlobalResponseDto implements ClientFindOneResponse {
	@ApiProperty({ type: ClientFindOneDataDto })
	data: ClientFindOneData
}

export class ClientCreateOneResponseDto extends GlobalResponseDto implements ClientCreateOneResponse {
	@ApiProperty({ type: ClientFindOneDataDto })
	data: ClientFindOneData
}

export class ClientModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ClientModifyResposne {}

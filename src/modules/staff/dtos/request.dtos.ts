import { PickType, IntersectionType, ApiProperty } from '@nestjs/swagger'
import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import {
	StaffCreateManyRequest,
	StaffCreateOneRequest,
	StaffDeleteManyRequest,
	StaffDeleteOneRequest,
	StaffFindManyRequest,
	StaffFindOneRequest,
	StaffUpdateManyRequest,
	StaffUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { StaffOptionalDto, StaffRequiredDto } from './fields.dtos'

export class StaffFindManyRequestDto
	extends IntersectionType(PickType(StaffOptionalDto, ['name', 'phone']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']))
	implements StaffFindManyRequest {}

export class StaffFindOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id'])) implements StaffFindOneRequest {}

export class StaffCreateOneRequestDto
	extends IntersectionType(PickType(StaffRequiredDto, ['phone', 'password', 'name']), PickType(RequestOtherFieldsDto, ['actionsToConnect']))
	implements StaffCreateOneRequest {}

export class StaffCreateManyRequestDto implements StaffCreateManyRequest {
	@ApiProperty({ type: StaffCreateOneRequestDto, isArray: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => StaffCreateOneRequestDto)
	datas: StaffCreateOneRequest[]
}

export class StaffUpdateOneRequestDto
	extends IntersectionType(PickType(StaffOptionalDto, ['name', 'password', 'phone', 'deletedAt']), PickType(RequestOtherFieldsDto, ['actionsToConnect', 'actionsToDisconnect']))
	implements StaffUpdateOneRequest {}

export class StaffUpdateManyRequestDto
	extends IntersectionType(PickType(StaffOptionalDto, ['deletedAt']), PickType(RequestOtherFieldsDto, ['ids']))
	implements StaffUpdateManyRequest {}

export class StaffDeleteOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['method'])) implements StaffDeleteOneRequest {}

export class StaffDeleteManyRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['ids']), PickType(RequestOtherFieldsDto, ['method']))
	implements StaffDeleteManyRequest {}

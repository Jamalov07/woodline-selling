import { PickType, IntersectionType } from '@nestjs/swagger'
import { StaffCreateOneRequest, StaffDeleteOneRequest, StaffFindManyRequest, StaffFindOneRequest, StaffUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { StaffOptionalDto, StaffRequiredDto } from './fields.dtos'

export class StaffFindManyRequestDto extends IntersectionType(PickType(StaffOptionalDto, ['fullname', 'phone']), PaginationRequestDto) implements StaffFindManyRequest {}

export class StaffFindOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id'])) implements StaffFindOneRequest {}

export class StaffCreateOneRequestDto
	extends IntersectionType(PickType(StaffRequiredDto, ['fullname', 'phone', 'password']), PickType(RequestOtherFieldsDto, ['actionsToConnect']))
	implements StaffCreateOneRequest {}

export class StaffUpdateOneRequestDto
	extends IntersectionType(
		PickType(StaffOptionalDto, ['deletedAt', 'fullname', 'password', 'phone', 'token']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'actionsToDisconnect']),
	)
	implements StaffUpdateOneRequest {}

export class StaffDeleteOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id'])) implements StaffDeleteOneRequest {}

import { PickType, IntersectionType } from '@nestjs/swagger'
import { StaffCreateOneRequest, StaffDeleteOneRequest, StaffFindManyRequest, StaffFindOneRequest, StaffUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { StaffOptionalDto, StaffRequiredDto } from './fields.dtos'

export class StaffFindManyRequestDto
	extends IntersectionType(PickType(StaffOptionalDto, ['name', 'phone']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']))
	implements StaffFindManyRequest {}

export class StaffFindOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id'])) implements StaffFindOneRequest {}

export class StaffCreateOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['phone', 'password', 'name', 'companyId', 'role'])) implements StaffCreateOneRequest {}

export class StaffUpdateOneRequestDto
	extends IntersectionType(PickType(StaffOptionalDto, ['phone', 'name', 'deletedAt', 'password', 'token', 'role', 'botAccess', 'companyId', 'telegramId']))
	implements StaffUpdateOneRequest {}

export class StaffDeleteOneRequestDto extends IntersectionType(PickType(StaffRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['method'])) implements StaffDeleteOneRequest {}

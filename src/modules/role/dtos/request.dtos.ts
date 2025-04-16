import { PickType, IntersectionType } from '@nestjs/swagger'
import { RoleDeleteOneRequest, RoleFindManyRequest, RoleFindOneRequest, RoleUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { RoleOptionalDto, RoleRequiredDto } from './fields.dtos'

export class RoleFindManyRequestDto extends IntersectionType(PickType(RoleOptionalDto, ['name']), PaginationRequestDto) implements RoleFindManyRequest {}

export class RoleFindOneRequestDto extends IntersectionType(PickType(RoleRequiredDto, ['id'])) implements RoleFindOneRequest {}

export class RoleUpdateOneRequestDto extends IntersectionType(PickType(RequestOtherFieldsDto, ['actionsToConnect', 'actionsToDisconnect'])) implements RoleUpdateOneRequest {}

export class RoleDeleteOneRequestDto extends IntersectionType(PickType(RoleRequiredDto, ['id'])) implements RoleDeleteOneRequest {}

import { PickType, IntersectionType } from '@nestjs/swagger'
import { UserCreateOneRequest, UserDeleteOneRequest, UserFindManyRequest, UserFindOneRequest, UserUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { PartnerInfoOptionalDto, PartnerInfoRequiredDto, UserOptionalDto, UserRequiredDto } from './fields.dtos'

export class UserFindManyRequestDto
	extends IntersectionType(PickType(UserOptionalDto, ['fullname', 'phone']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']))
	implements UserFindManyRequest {}

export class UserFindOneRequestDto extends IntersectionType(PickType(UserRequiredDto, ['id'])) implements UserFindOneRequest {}

export class UserCreateOneRequestDto
	extends IntersectionType(
		PickType(UserRequiredDto, ['phone', 'fullname']),
		PickType(UserOptionalDto, ['username', 'password']),
		PickType(PartnerInfoRequiredDto, ['balance', 'whereFrom']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'rolesToConnect']),
	)
	implements UserCreateOneRequest {}

export class UserUpdateOneRequestDto
	extends IntersectionType(
		PickType(UserOptionalDto, ['fullname', 'password', 'phone', 'deletedAt']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'actionsToDisconnect']),
		PickType(PartnerInfoOptionalDto, ['balance', 'whereFrom']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'rolesToConnect', 'rolesToDisconnect', 'actionsToDisconnect']),
	)
	implements UserUpdateOneRequest {}

export class UserDeleteOneRequestDto extends IntersectionType(PickType(UserRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['method'])) implements UserDeleteOneRequest {}

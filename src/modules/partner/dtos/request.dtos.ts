import { PickType, IntersectionType } from '@nestjs/swagger'
import { PartnerCreateOneRequest, PartnerDeleteOneRequest, PartnerFindManyRequest, PartnerFindOneRequest, PartnerUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { PartnerOptionalDto, PartnerRequiredDto } from './fields.dtos'

export class PartnerFindManyRequestDto
	extends IntersectionType(PickType(PartnerOptionalDto, ['fullname', 'phone', 'whereFrom']), PaginationRequestDto)
	implements PartnerFindManyRequest {}

export class PartnerFindOneRequestDto extends IntersectionType(PickType(PartnerRequiredDto, ['id'])) implements PartnerFindOneRequest {}

export class PartnerCreateOneRequestDto
	extends IntersectionType(PickType(PartnerRequiredDto, ['fullname', 'whereFrom', 'phone', 'password']), PickType(RequestOtherFieldsDto, ['rolesToConnect', 'actionsToConnect']))
	implements PartnerCreateOneRequest {}

export class PartnerUpdateOneRequestDto
	extends IntersectionType(
		PickType(PartnerOptionalDto, ['balance', 'deletedAt', 'fullname', 'password', 'phone', 'token', 'whereFrom']),
		PickType(RequestOtherFieldsDto, ['rolesToConnect', 'actionsToConnect', 'rolesToDisconnect', 'actionsToDisconnect']),
	)
	implements PartnerUpdateOneRequest {}

export class PartnerDeleteOneRequestDto extends IntersectionType(PickType(PartnerRequiredDto, ['id'])) implements PartnerDeleteOneRequest {}

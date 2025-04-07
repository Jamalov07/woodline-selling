import { IntersectionType, PickType } from '@nestjs/swagger'
import { ClientCreateOneRequest, ClientDeleteOneRequest, ClientFindManyRequest, ClientFindOneRequest, ClientUpdateOneRequest } from '../interfaces'
import { ClientOptionalDto, ClientRequiredDto } from './fields.dtos'
import { RequestOtherFieldsDto } from '../../../common'

export class ClientFindManyRequestDto
	extends IntersectionType(PickType(ClientOptionalDto, ['name', 'phone', 'whereFrom']), PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']))
	implements ClientFindManyRequest {}

export class ClientFindOneRequestDto
	extends IntersectionType(PickType(ClientRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['isDeleted']))
	implements ClientFindOneRequest {}

export class ClientCreateOneRequestDto extends PickType(ClientRequiredDto, ['name', 'phone', 'whereFrom']) implements ClientCreateOneRequest {}

export class ClientUpdateOneRequestDto extends PickType(ClientOptionalDto, ['name', 'phone', 'whereFrom']) implements ClientUpdateOneRequest {}

export class ClientDeleteOneRequestDto
	extends IntersectionType(PickType(ClientRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['isDeleted', 'method']))
	implements ClientDeleteOneRequest {}

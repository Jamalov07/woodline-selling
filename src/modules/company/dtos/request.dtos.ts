import { IntersectionType, PickType } from '@nestjs/swagger'
import { CompanyCreateOneRequest, CompanyDeleteOneRequest, CompanyFindManyRequest, CompanyFindOneRequest, CompanyUpdateOneRequest } from '../interfaces'
import { CompanyOptionalDto, CompanyRequiredDto } from './fields.dtos'
import { RequestOtherFieldsDto } from '../../../common'

export class CompanyFindManyRequestDto
	extends IntersectionType(PickType(CompanyOptionalDto, ['name', 'sheetId']), PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']))
	implements CompanyFindManyRequest {}

export class CompanyFindOneRequestDto
	extends IntersectionType(PickType(CompanyRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['isDeleted']))
	implements CompanyFindOneRequest {}

export class CompanyCreateOneRequestDto extends PickType(CompanyRequiredDto, ['name', 'sheetId']) implements CompanyCreateOneRequest {}

export class CompanyUpdateOneRequestDto extends PickType(CompanyOptionalDto, ['name', 'sheetId']) implements CompanyUpdateOneRequest {}

export class CompanyDeleteOneRequestDto
	extends IntersectionType(PickType(CompanyRequiredDto, ['id']), PickType(RequestOtherFieldsDto, ['isDeleted', 'method']))
	implements CompanyDeleteOneRequest {}

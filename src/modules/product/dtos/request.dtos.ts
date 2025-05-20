import { ApiPropertyOptional, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductCreateOneRequest, ProductDeleteOneRequest, ProductFindManyRequest, ProductFindOneRequest, ProductUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { ProductOptionalDto, ProductRequiredDto } from './fields.dtos'
import { $Enums, ProductStatusEnum } from '@prisma/client'
import { IsArray, IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class ProductFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['search', 'isDeleted']),
		PickType(ProductOptionalDto, ['description', 'direction', 'modelId', 'publicId', 'tissue']),
	)
	implements ProductFindManyRequest
{
	@ApiPropertyOptional({ enum: ProductStatusEnum, isArray: true })
	@IsOptional()
	@IsArray()
	@IsEnum(ProductStatusEnum, { each: true })
	statuses?: $Enums.ProductStatusEnum[]

	@ApiPropertyOptional({ type: Boolean })
	@Transform(({ value }) => ([false, 'false'].includes(value) ? false : [true, 'true'].includes(value) ? true : undefined))
	@IsBoolean()
	@IsOptional()
	isBooked?: boolean
}

export class ProductFindOneRequestDto extends PickType(ProductRequiredDto, ['id']) implements ProductFindOneRequest {}

export class ProductCreateOneRequestDto
	extends PickType(ProductRequiredDto, ['description', 'direction', 'modelId', 'publicId', 'tissue', 'quantity'])
	implements ProductCreateOneRequest {}

export class ProductUpdateOneRequestDto
	extends PickType(ProductOptionalDto, ['description', 'direction', 'modelId', 'publicId', 'tissue', 'quantity', 'deletedAt'])
	implements ProductUpdateOneRequest {}

export class ProductDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(ProductRequiredDto, ['id']))
	implements ProductDeleteOneRequest {}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CompanyService } from './company.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	CompanyCreateOneRequestDto,
	CompanyCreateOneResponseDto,
	CompanyDeleteOneRequestDto,
	CompanyFindManyRequestDto,
	CompanyFindManyResponseDto,
	CompanyFindOneRequestDto,
	CompanyFindOneResponseDto,
	CompanyModifyResponseDto,
	CompanyUpdateOneRequestDto,
} from './dtos'
import { Roles, StaffRoles } from '../../common'

@Controller('company')
export class CompanyController {
	private readonly companyService: CompanyService
	constructor(companyService: CompanyService) {
		this.companyService = companyService
	}

	@Roles(StaffRoles.SUPER_ADMIN, StaffRoles.MAIN_STOREKEEPER)
	@Get('many')
	@ApiOkResponse({ type: CompanyFindManyResponseDto })
	@ApiOperation({ summary: 'get all companys' })
	async findMany(@Query() query: CompanyFindManyRequestDto): Promise<CompanyFindManyResponseDto> {
		return this.companyService.findMany(query)
	}

	@Roles(StaffRoles.SUPER_ADMIN, StaffRoles.MAIN_STOREKEEPER)
	@Get('one')
	@ApiOperation({ summary: 'find one company' })
	@ApiOkResponse({ type: CompanyFindOneResponseDto })
	async findOne(@Param() query: CompanyFindOneRequestDto): Promise<CompanyFindOneResponseDto> {
		return this.companyService.findOne(query)
	}

	@Roles(StaffRoles.SUPER_ADMIN)
	@Post('one')
	@ApiOperation({ summary: 'add one company' })
	@ApiOkResponse({ type: CompanyCreateOneResponseDto })
	async createOne(@Body() body: CompanyCreateOneRequestDto): Promise<CompanyCreateOneResponseDto> {
		return this.companyService.createOne(body)
	}

	@Roles(StaffRoles.SUPER_ADMIN)
	@Patch('one')
	@ApiOperation({ summary: 'update one company' })
	@ApiOkResponse({ type: CompanyModifyResponseDto })
	async updateOne(@Param() query: CompanyFindOneRequestDto, @Body() body: CompanyUpdateOneRequestDto): Promise<CompanyModifyResponseDto> {
		return this.companyService.updateOne(query, body)
	}

	@Roles(StaffRoles.ACCOUNTANT, StaffRoles.SUPER_ADMIN)
	@Delete('one')
	@ApiOperation({ summary: 'delete one company' })
	@ApiOkResponse({ type: CompanyModifyResponseDto })
	async deleteOne(@Param() query: CompanyDeleteOneRequestDto): Promise<CompanyModifyResponseDto> {
		return this.companyService.deleteOne(query)
	}
}

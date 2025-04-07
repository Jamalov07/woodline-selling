import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StaffService } from './staff.service'
import { AuthOptions, CheckStaffRolesGuard, Roles, StaffRoles } from '@common'
import {
	StaffFindManyRequestDto,
	StaffCreateOneRequestDto,
	StaffUpdateOneRequestDto,
	StaffDeleteOneRequestDto,
	StaffFindOneRequestDto,
	StaffFindManyResponseDto,
	StaffFindOneResponseDto,
	StaffModifyResponseDto,
	StaffCreateOneResponseDto,
} from './dtos'

@ApiTags('Staff')
@UseGuards(CheckStaffRolesGuard)
@AuthOptions(true, true)
@Controller('staff')
export class StaffController {
	private readonly staffService: StaffService

	constructor(staffService: StaffService) {
		this.staffService = staffService
	}

	@Get('many')
	@ApiOkResponse({ type: StaffFindManyResponseDto })
	@ApiOperation({ summary: 'get all staffs' })
	async findMany(@Query() query: StaffFindManyRequestDto): Promise<StaffFindManyResponseDto> {
		return this.staffService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one staff' })
	@ApiOkResponse({ type: StaffFindOneResponseDto })
	async findOne(@Param() query: StaffFindOneRequestDto): Promise<StaffFindOneResponseDto> {
		return this.staffService.findOne(query)
	}

	@Roles(StaffRoles.SUPER_ADMIN)
	@Post('one')
	@ApiOperation({ summary: 'add one staff' })
	@ApiOkResponse({ type: StaffCreateOneResponseDto })
	async createOne(@Body() body: StaffCreateOneRequestDto): Promise<StaffCreateOneResponseDto> {
		return this.staffService.createOne(body)
	}

	@Roles(StaffRoles.SUPER_ADMIN)
	@Patch('one')
	@ApiOperation({ summary: 'update one staff' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async updateOne(@Param() query: StaffFindOneRequestDto, @Body() body: StaffUpdateOneRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.updateOne(query, body)
	}

	@Roles(StaffRoles.ACCOUNTANT, StaffRoles.SUPER_ADMIN)
	@Delete('one')
	@ApiOperation({ summary: 'delete one staff' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async deleteOne(@Param() query: StaffDeleteOneRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.deleteOne(query)
	}
}

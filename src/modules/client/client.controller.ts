import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ClientService } from './client.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	ClientCreateOneRequestDto,
	ClientCreateOneResponseDto,
	ClientDeleteOneRequestDto,
	ClientFindManyRequestDto,
	ClientFindManyResponseDto,
	ClientFindOneRequestDto,
	ClientFindOneResponseDto,
	ClientModifyResponseDto,
	ClientUpdateOneRequestDto,
} from './dtos'
import { Roles, StaffRoles } from '../../common'

@Controller('client')
export class ClientController {
	private readonly clientService: ClientService
	constructor(clientService: ClientService) {
		this.clientService = clientService
	}

	@Get('many')
	@ApiOkResponse({ type: ClientFindManyResponseDto })
	@ApiOperation({ summary: 'get all clients' })
	async findMany(@Query() query: ClientFindManyRequestDto): Promise<ClientFindManyResponseDto> {
		return this.clientService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one client' })
	@ApiOkResponse({ type: ClientFindOneResponseDto })
	async findOne(@Param() query: ClientFindOneRequestDto): Promise<ClientFindOneResponseDto> {
		return this.clientService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one client' })
	@ApiOkResponse({ type: ClientCreateOneResponseDto })
	async createOne(@Body() body: ClientCreateOneRequestDto): Promise<ClientCreateOneResponseDto> {
		return this.clientService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one client' })
	@ApiOkResponse({ type: ClientModifyResponseDto })
	async updateOne(@Param() query: ClientFindOneRequestDto, @Body() body: ClientUpdateOneRequestDto): Promise<ClientModifyResponseDto> {
		return this.clientService.updateOne(query, body)
	}

	@Roles(StaffRoles.ACCOUNTANT, StaffRoles.SUPER_ADMIN)
	@Delete('one')
	@ApiOperation({ summary: 'delete one client' })
	@ApiOkResponse({ type: ClientModifyResponseDto })
	async deleteOne(@Param() query: ClientDeleteOneRequestDto): Promise<ClientModifyResponseDto> {
		return this.clientService.deleteOne(query)
	}
}

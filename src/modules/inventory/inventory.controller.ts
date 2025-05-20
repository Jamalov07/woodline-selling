import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	InventoryCreateOneRequestDto,
	InventoryDeleteOneRequestDto,
	InventoryFindManyRequestDto,
	InventoryFindOneRequestDto,
	InventoryUpdateOneRequestDto,
} from './dtos/request.dtos'
import { InventoryFindManyResponseDto, InventoryFindOneResponseDto, InventoryModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('inventory')
export class InventoryController {
	private readonly inventoryService: InventoryService
	constructor(inventoryService: InventoryService) {
		this.inventoryService = inventoryService
	}

	@Get('many')
	@ApiOkResponse({ type: InventoryFindManyResponseDto })
	@ApiOperation({ summary: 'get all inventorys' })
	async findMany(@Query() query: InventoryFindManyRequestDto): Promise<InventoryFindManyResponseDto> {
		return this.inventoryService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one inventory' })
	@ApiOkResponse({ type: InventoryFindOneResponseDto })
	async findOne(@Query() query: InventoryFindOneRequestDto): Promise<InventoryFindOneResponseDto> {
		return this.inventoryService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one inventory' })
	@ApiOkResponse({ type: InventoryModifyResponseDto })
	async createOne(@Req() request: CRequest, @Body() body: InventoryCreateOneRequestDto): Promise<InventoryModifyResponseDto> {
		return this.inventoryService.createOne(request, body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one inventory' })
	@ApiOkResponse({ type: InventoryModifyResponseDto })
	async updateOne(@Query() query: InventoryFindOneRequestDto, @Body() body: InventoryUpdateOneRequestDto): Promise<InventoryModifyResponseDto> {
		return this.inventoryService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one inventory' })
	@ApiOkResponse({ type: InventoryModifyResponseDto })
	async deleteOne(@Query() query: InventoryDeleteOneRequestDto): Promise<InventoryModifyResponseDto> {
		return this.inventoryService.deleteOne(query)
	}
}

import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { DeliveryService } from './delivery.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	DeliveryCreateManyRequestDto,
	DeliveryCreateManyResponseDto,
	DeliveryCreateOneRequestDto,
	DeliveryCreateOneResponseDto,
	DeliveryDeleteOneRequestDto,
	DeliveryFindManyRequestDto,
	DeliveryFindManyResponseDto,
	DeliveryFindOneRequestDto,
	DeliveryFindOneResponseDto,
	DeliveryModifyResponseDto,
	DeliveryUpdateOneRequestDto,
	DeliveryUpdateOneResponseDto,
} from './dtos'

@Controller('delivery')
export class DeliveryController {
	private readonly deliveryService: DeliveryService
	constructor(deliveryService: DeliveryService) {
		this.deliveryService = deliveryService
	}

	@Get('many')
	@ApiOkResponse({ type: DeliveryFindManyResponseDto })
	@ApiOperation({ summary: 'get all deliverys' })
	async findMany(@Query() query: DeliveryFindManyRequestDto): Promise<DeliveryFindManyResponseDto> {
		return this.deliveryService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one delivery' })
	@ApiOkResponse({ type: DeliveryFindOneResponseDto })
	async findOne(@Query() query: DeliveryFindOneRequestDto): Promise<DeliveryFindOneResponseDto> {
		return this.deliveryService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one delivery' })
	@ApiOkResponse({ type: DeliveryCreateOneResponseDto })
	async createOne(@Body() body: DeliveryCreateOneRequestDto): Promise<DeliveryCreateOneResponseDto> {
		return this.deliveryService.createOne(body)
	}

	@Post('many')
	@ApiOperation({ summary: 'add many delivery' })
	@ApiOkResponse({ type: DeliveryCreateManyResponseDto })
	async createMany(@Body() body: DeliveryCreateManyRequestDto): Promise<DeliveryCreateManyResponseDto> {
		return this.deliveryService.createMany(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one delivery' })
	@ApiOkResponse({ type: DeliveryUpdateOneResponseDto })
	async updateOne(@Query() query: DeliveryFindOneRequestDto, @Body() body: DeliveryUpdateOneRequestDto): Promise<DeliveryUpdateOneResponseDto> {
		return this.deliveryService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one delivery' })
	@ApiOkResponse({ type: DeliveryModifyResponseDto })
	async deleteOne(@Query() query: DeliveryDeleteOneRequestDto): Promise<DeliveryModifyResponseDto> {
		return this.deliveryService.deleteOne(query)
	}
}

import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { OrderSPStatusService } from './order-sp-status.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	OrderSPStatusCreateOneRequestDto,
	OrderSPStatusDeleteOneRequestDto,
	OrderSPStatusFindManyRequestDto,
	OrderSPStatusFindOneRequestDto,
	OrderSPStatusUpdateOneRequestDto,
} from './dtos/request.dtos'
import { OrderSPStatusFindManyResponseDto, OrderSPStatusFindOneResponseDto, OrderSPStatusModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('order-sp-status')
export class OrderSPStatusController {
	private readonly orderSPStatusService: OrderSPStatusService
	constructor(orderSPStatusService: OrderSPStatusService) {
		this.orderSPStatusService = orderSPStatusService
	}

	@Get('many')
	@ApiOkResponse({ type: OrderSPStatusFindManyResponseDto })
	@ApiOperation({ summary: 'get all order SP Statuss' })
	async findMany(@Query() query: OrderSPStatusFindManyRequestDto): Promise<OrderSPStatusFindManyResponseDto> {
		return this.orderSPStatusService.findMany(query)
	}

	@Get('my/many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: OrderSPStatusFindManyResponseDto })
	@ApiOperation({ summary: 'get all my order SP Statuss' })
	async myOrderSPStatusFindMany(@Req() request: CRequest, @Query() query: OrderSPStatusFindManyRequestDto): Promise<OrderSPStatusFindManyResponseDto> {
		return this.orderSPStatusService.findMany({ ...query, orderId: request.user.id })
	}

	@Get('one')
	@ApiOperation({ summary: 'find one order SP Status' })
	@ApiOkResponse({ type: OrderSPStatusFindOneResponseDto })
	async findOne(@Query() query: OrderSPStatusFindOneRequestDto): Promise<OrderSPStatusFindOneResponseDto> {
		return this.orderSPStatusService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one order SP Status' })
	@ApiOkResponse({ type: OrderSPStatusModifyResponseDto })
	async createOne(@Req() request: CRequest, @Body() body: OrderSPStatusCreateOneRequestDto): Promise<OrderSPStatusModifyResponseDto> {
		return this.orderSPStatusService.createOne(request, body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one order SP Status' })
	@ApiOkResponse({ type: OrderSPStatusModifyResponseDto })
	async updateOne(@Query() query: OrderSPStatusFindOneRequestDto, @Body() body: OrderSPStatusUpdateOneRequestDto): Promise<OrderSPStatusModifyResponseDto> {
		return this.orderSPStatusService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one order SP Status' })
	@ApiOkResponse({ type: OrderSPStatusModifyResponseDto })
	async deleteOne(@Query() query: OrderSPStatusDeleteOneRequestDto): Promise<OrderSPStatusModifyResponseDto> {
		return this.orderSPStatusService.deleteOne(query)
	}
}

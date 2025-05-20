import { Body, Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common'
import { CartSPStatusService } from './cart-sp-status.service'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import {
	CartSPStatusCreateOneRequestDto,
	CartSPStatusDeleteOneRequestDto,
	CartSPStatusFindManyRequestDto,
	CartSPStatusFindOneRequestDto,
	CartSPStatusUpdateOneRequestDto,
} from './dtos/request.dtos'
import { CartSPStatusFindManyResponseDto, CartSPStatusFindOneResponseDto, CartSPStatusModifyResponseDto } from './dtos/response.dtos'
import { AuthOptions, CRequest } from '../../common'

@Controller('cart-sp-status')
export class CartSPStatusController {
	private readonly cartSPStatusService: CartSPStatusService
	constructor(cartSPStatusService: CartSPStatusService) {
		this.cartSPStatusService = cartSPStatusService
	}

	@Get('many')
	@ApiOkResponse({ type: CartSPStatusFindManyResponseDto })
	@ApiOperation({ summary: 'get all cart SP Statuss' })
	async findMany(@Query() query: CartSPStatusFindManyRequestDto): Promise<CartSPStatusFindManyResponseDto> {
		return this.cartSPStatusService.findMany(query)
	}

	@Get('my/many')
	@AuthOptions(true, true)
	@ApiOkResponse({ type: CartSPStatusFindManyResponseDto })
	@ApiOperation({ summary: 'get all my cart SP Statuss' })
	async myCartSPStatusFindMany(@Req() request: CRequest, @Query() query: CartSPStatusFindManyRequestDto): Promise<CartSPStatusFindManyResponseDto> {
		return this.cartSPStatusService.findMany({ ...query, staffId: request.user.id })
	}

	@Get('one')
	@ApiOperation({ summary: 'find one cart SP Status' })
	@ApiOkResponse({ type: CartSPStatusFindOneResponseDto })
	async findOne(@Query() query: CartSPStatusFindOneRequestDto): Promise<CartSPStatusFindOneResponseDto> {
		return this.cartSPStatusService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one cart SP Status' })
	@ApiOkResponse({ type: CartSPStatusModifyResponseDto })
	async createOne(@Req() request: CRequest, @Body() body: CartSPStatusCreateOneRequestDto): Promise<CartSPStatusModifyResponseDto> {
		return this.cartSPStatusService.createOne(request, body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one cart SP Status' })
	@ApiOkResponse({ type: CartSPStatusModifyResponseDto })
	async updateOne(@Query() query: CartSPStatusFindOneRequestDto, @Body() body: CartSPStatusUpdateOneRequestDto): Promise<CartSPStatusModifyResponseDto> {
		return this.cartSPStatusService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one cart SP Status' })
	@ApiOkResponse({ type: CartSPStatusModifyResponseDto })
	async deleteOne(@Query() query: CartSPStatusDeleteOneRequestDto): Promise<CartSPStatusModifyResponseDto> {
		return this.cartSPStatusService.deleteOne(query)
	}
}

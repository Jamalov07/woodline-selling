import { BadRequestException, Injectable } from '@nestjs/common'
import { CartRepository } from './cart.repository'
import { CartCreateOneRequest, CartDeleteOneRequest, CartFindManyRequest, CartFindOneRequest, CartGetManyRequest, CartGetOneRequest, CartUpdateOneRequest } from './interfaces'
import { createResponse } from '../../common'

@Injectable()
export class CartService {
	private readonly cartRepository: CartRepository
	constructor(cartRepository: CartRepository) {
		this.cartRepository = cartRepository
	}

	async findMany(query: CartFindManyRequest) {
		const carts = await this.cartRepository.findMany(query)
		const cartsCount = await this.cartRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: cartsCount,
					pagesCount: Math.ceil(cartsCount / query.pageSize),
					pageSize: carts.length,
					data: carts,
				}
			: { data: carts }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: CartFindOneRequest) {
		const cart = await this.cartRepository.findOne(query)

		if (!cart) {
			throw new BadRequestException('cart not found')
		}
		return createResponse({ data: { ...cart }, success: { messages: ['find one success'] } })
	}

	async getMany(query: CartGetManyRequest) {
		const carts = await this.cartRepository.getMany(query)
		const cartsCount = await this.cartRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(cartsCount / query.pageSize),
					pageSize: carts.length,
					data: carts,
				}
			: { data: carts }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: CartGetOneRequest) {
		const cart = await this.cartRepository.getOne(query)

		if (!cart) {
			throw new BadRequestException('cart not found')
		}

		return createResponse({ data: cart, success: { messages: ['get one success'] } })
	}

	async createOne(body: CartCreateOneRequest) {
		await this.cartRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: CartGetOneRequest, body: CartUpdateOneRequest) {
		await this.getOne(query)

		await this.cartRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: CartDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.cartRepository.deleteOne(query)
		} else {
			await this.cartRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

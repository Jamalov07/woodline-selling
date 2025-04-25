import { BadRequestException, Injectable } from '@nestjs/common'
import { CartRepository } from './cart.repository'
import { CartCreateOneRequest, CartDeleteOneRequest, CartFindManyRequest, CartFindOneRequest, CartGetManyRequest, CartGetOneRequest, CartUpdateOneRequest } from './interfaces'
import { createResponse } from '../../common'

@Injectable()
export class CartService {
	private readonly furnitureTypeRepository: CartRepository
	constructor(furnitureTypeRepository: CartRepository) {
		this.furnitureTypeRepository = furnitureTypeRepository
	}

	async findMany(query: CartFindManyRequest) {
		const furnitureTypes = await this.furnitureTypeRepository.findMany(query)
		const furnitureTypesCount = await this.furnitureTypeRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: furnitureTypesCount,
					pagesCount: Math.ceil(furnitureTypesCount / query.pageSize),
					pageSize: furnitureTypes.length,
					data: furnitureTypes,
				}
			: { data: furnitureTypes }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: CartFindOneRequest) {
		const staff = await this.furnitureTypeRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: CartGetManyRequest) {
		const furnitureTypes = await this.furnitureTypeRepository.getMany(query)
		const furnitureTypesCount = await this.furnitureTypeRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(furnitureTypesCount / query.pageSize),
					pageSize: furnitureTypes.length,
					data: furnitureTypes,
				}
			: { data: furnitureTypes }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: CartGetOneRequest) {
		const staff = await this.furnitureTypeRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: CartCreateOneRequest) {
		await this.furnitureTypeRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: CartGetOneRequest, body: CartUpdateOneRequest) {
		await this.getOne(query)

		await this.furnitureTypeRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: CartDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.furnitureTypeRepository.deleteOne(query)
		} else {
			await this.furnitureTypeRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

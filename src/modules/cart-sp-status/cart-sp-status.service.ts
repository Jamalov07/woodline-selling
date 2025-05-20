import { BadRequestException, Injectable } from '@nestjs/common'
import { CartSPStatusRepository } from './cart-sp-status.repository'
import {
	CartSPStatusCreateOneRequest,
	CartSPStatusDeleteOneRequest,
	CartSPStatusFindManyRequest,
	CartSPStatusFindOneRequest,
	CartSPStatusGetManyRequest,
	CartSPStatusGetOneRequest,
	CartSPStatusUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'
import { StaffService } from '../staff'
import { StaffRoleEnum } from '@prisma/client'

@Injectable()
export class CartSPStatusService {
	private readonly cartSPStatusRepository: CartSPStatusRepository
	private readonly staffService: StaffService
	constructor(cartSPStatusRepository: CartSPStatusRepository, staffService: StaffService) {
		this.cartSPStatusRepository = cartSPStatusRepository
		this.staffService = staffService
	}

	async findMany(query: CartSPStatusFindManyRequest) {
		const cartSPStatuss = await this.cartSPStatusRepository.findMany(query)
		const cartSPStatussCount = await this.cartSPStatusRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: cartSPStatussCount,
					pagesCount: Math.ceil(cartSPStatussCount / query.pageSize),
					pageSize: cartSPStatuss.length,
					data: cartSPStatuss,
				}
			: { data: cartSPStatuss }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: CartSPStatusFindOneRequest) {
		const cartSPStatus = await this.cartSPStatusRepository.findOne(query)

		if (!cartSPStatus) {
			throw new BadRequestException('cartSPStatus not found')
		}
		return createResponse({ data: { ...cartSPStatus }, success: { messages: ['find one success'] } })
	}

	async getMany(query: CartSPStatusGetManyRequest) {
		const cartSPStatuss = await this.cartSPStatusRepository.getMany(query)
		const cartSPStatussCount = await this.cartSPStatusRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(cartSPStatussCount / query.pageSize),
					pageSize: cartSPStatuss.length,
					data: cartSPStatuss,
				}
			: { data: cartSPStatuss }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: CartSPStatusGetOneRequest) {
		const cartSPStatus = await this.cartSPStatusRepository.getOne(query)

		if (!cartSPStatus) {
			throw new BadRequestException('cartSPStatus not found')
		}

		return createResponse({ data: cartSPStatus, success: { messages: ['get one success'] } })
	}

	async createOne(request: CRequest, body: CartSPStatusCreateOneRequest) {
		const seller = await this.staffService.getOne({ id: request.user.id })
		const sellerRole = seller.data.roles.find((r) => r.name === StaffRoleEnum.seller)
		if (!sellerRole) {
			throw new BadRequestException('seller not found')
		}

		await this.cartSPStatusRepository.createOne({ ...body, staffId: request.user.id })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: CartSPStatusGetOneRequest, body: CartSPStatusUpdateOneRequest) {
		await this.getOne(query)

		await this.cartSPStatusRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: CartSPStatusDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.cartSPStatusRepository.deleteOne(query)
		} else {
			await this.cartSPStatusRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}

	async deleteMany(query: CartSPStatusDeleteOneRequest[]) {
		await this.cartSPStatusRepository.deleteMany(query)

		return createResponse({ data: null, success: { messages: ['delete many success'] } })
	}
}

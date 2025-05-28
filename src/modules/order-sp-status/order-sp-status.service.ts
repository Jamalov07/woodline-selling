import { BadRequestException, Injectable } from '@nestjs/common'
import { OrderSPStatusRepository } from './order-sp-status.repository'
import {
	OrderSPStatusCreateOneRequest,
	OrderSPStatusDeleteOneRequest,
	OrderSPStatusFindManyRequest,
	OrderSPStatusFindOneRequest,
	OrderSPStatusGetManyRequest,
	OrderSPStatusGetOneRequest,
	OrderSPStatusUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'
import { StaffService } from '../staff'
import { OrderProductStatusEnum, StaffRoleEnum } from '@prisma/client'

@Injectable()
export class OrderSPStatusService {
	private readonly orderSPStatusRepository: OrderSPStatusRepository
	private readonly staffService: StaffService
	constructor(orderSPStatusRepository: OrderSPStatusRepository, staffService: StaffService) {
		this.orderSPStatusRepository = orderSPStatusRepository
		this.staffService = staffService
	}

	async findMany(query: OrderSPStatusFindManyRequest) {
		const orderSPStatuss = await this.orderSPStatusRepository.findMany(query)
		const orderSPStatussCount = await this.orderSPStatusRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: orderSPStatussCount,
					pagesCount: Math.ceil(orderSPStatussCount / query.pageSize),
					pageSize: orderSPStatuss.length,
					data: orderSPStatuss,
				}
			: { data: orderSPStatuss }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: OrderSPStatusFindOneRequest) {
		const orderSPStatus = await this.orderSPStatusRepository.findOne(query)

		if (!orderSPStatus) {
			throw new BadRequestException('orderSPStatus not found')
		}
		return createResponse({ data: { ...orderSPStatus }, success: { messages: ['find one success'] } })
	}

	async getMany(query: OrderSPStatusGetManyRequest) {
		const orderSPStatuss = await this.orderSPStatusRepository.getMany(query)
		const orderSPStatussCount = await this.orderSPStatusRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(orderSPStatussCount / query.pageSize),
					pageSize: orderSPStatuss.length,
					data: orderSPStatuss,
				}
			: { data: orderSPStatuss }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: OrderSPStatusGetOneRequest) {
		const orderSPStatus = await this.orderSPStatusRepository.getOne(query)

		if (!orderSPStatus) {
			throw new BadRequestException('orderSPStatus not found')
		}

		return createResponse({ data: orderSPStatus, success: { messages: ['get one success'] } })
	}

	async createOne(request: CRequest, body: OrderSPStatusCreateOneRequest) {
		const seller = await this.staffService.getOne({ id: request.user.id })
		const sellerRole = seller.data.roles.find((r) => r.name === StaffRoleEnum.seller)
		if (!sellerRole) {
			throw new BadRequestException('seller not found')
		}

		await this.orderSPStatusRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async createMany(body: OrderSPStatusCreateOneRequest[]) {
		const orderSPStatuses = await this.orderSPStatusRepository.createMany(body)

		return createResponse({ data: orderSPStatuses, success: { messages: ['create many success'] } })
	}

	async updateOne(query: OrderSPStatusGetOneRequest, body: OrderSPStatusUpdateOneRequest) {
		const orderSPS = await this.getOne(query)

		if (orderSPS.data.status == OrderProductStatusEnum.received) {
			throw new BadRequestException("you can't update received product")
		}

		await this.orderSPStatusRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: OrderSPStatusDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.orderSPStatusRepository.deleteOne(query)
		} else {
			await this.orderSPStatusRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}

	async deleteMany(query: OrderSPStatusDeleteOneRequest[]) {
		await this.orderSPStatusRepository.deleteMany(query)

		return createResponse({ data: null, success: { messages: ['delete many success'] } })
	}
}

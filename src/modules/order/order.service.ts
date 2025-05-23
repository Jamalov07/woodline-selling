import { BadRequestException, Injectable } from '@nestjs/common'
import { OrderRepository } from './order.repository'
import {
	OrderCreateOneRequest,
	OrderCreateOneWithPaymentProductRequest,
	OrderDeleteOneRequest,
	OrderFindManyRequest,
	OrderFindOneRequest,
	OrderGetManyRequest,
	OrderGetOneRequest,
	OrderUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'
import { PartnerService } from '../partner'
import { ClientPurchaseStatusEnum, PartnerRoleEnum } from '@prisma/client'
import { OrderProductFindOneData } from '../order-product'
import { GoogleSheetService } from '../shared/google-sheet'

@Injectable()
export class OrderService {
	private readonly orderRepository: OrderRepository
	private readonly partnerService: PartnerService
	private readonly googleSheetService: GoogleSheetService
	constructor(orderRepository: OrderRepository, partnerService: PartnerService, googleSheetService: GoogleSheetService) {
		this.orderRepository = orderRepository
		this.partnerService = partnerService
		this.googleSheetService = googleSheetService
	}

	async findMany(query: OrderFindManyRequest) {
		const orders = await this.orderRepository.findMany(query)
		const ordersCount = await this.orderRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: ordersCount,
					pagesCount: Math.ceil(ordersCount / query.pageSize),
					pageSize: orders.length,
					data: orders,
				}
			: { data: orders }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: OrderFindOneRequest) {
		const staff = await this.orderRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: OrderGetManyRequest) {
		const orders = await this.orderRepository.getMany(query)
		const ordersCount = await this.orderRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(ordersCount / query.pageSize),
					pageSize: orders.length,
					data: orders,
				}
			: { data: orders }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: OrderGetOneRequest) {
		const staff = await this.orderRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: OrderCreateOneRequest) {
		const client = await this.partnerService.getOne({ id: body.clientId })
		const clientRole = client.data.roles.find((r) => r.name === PartnerRoleEnum.client)
		if (!clientRole) {
			throw new BadRequestException('client not found')
		}

		await this.orderRepository.createOne({ ...body, purchaseStatus: client.data.orders.length ? ClientPurchaseStatusEnum.next : ClientPurchaseStatusEnum.first })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async createOneWithPaymentProduct(request: CRequest, body: OrderCreateOneWithPaymentProductRequest) {
		const client = await this.partnerService.getOne({ id: body.clientId })
		const clientRole = client.data.roles.find((r) => r.name === PartnerRoleEnum.client)
		if (!clientRole) {
			throw new BadRequestException('client not found')
		}
		const order = await this.orderRepository.createOneWithAll({
			...body,
			staffId: request.user.id,
			purchaseStatus: client.data.orders.length ? ClientPurchaseStatusEnum.next : ClientPurchaseStatusEnum.first,
		})

		const mappedOrSPs: OrderProductFindOneData[] = order.sps.map((p) => {
			return {
				createdAt: p.createdAt,
				description: p.description,
				direction: p.spStatus.sp.product.direction,
				price: p.price,
				priceWithSale: p.priceWithSale,
				sale: p.sale,
				quantity: p.quantity,
				tissue: p.spStatus.sp.product.tissue,
				publicId: p.spStatus.sp.product.publicId,
				id: p.id,
				totalSum: p.totalSum,
				model: p.spStatus.sp.product.model,
				status: p.status,
			}
		})

		await this.googleSheetService.addOrderToSheet(order, [...order.products, ...mappedOrSPs], order.payments)

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: OrderGetOneRequest, body: OrderUpdateOneRequest) {
		await this.getOne(query)

		if (body.clientId) {
			const client = await this.partnerService.getOne({ id: body.clientId })
			const clientRole = client.data.roles.find((r) => r.name === PartnerRoleEnum.client)
			if (!clientRole) {
				throw new BadRequestException('client not found')
			}
		}

		await this.orderRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: OrderDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.orderRepository.deleteOne(query)
		} else {
			await this.orderRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

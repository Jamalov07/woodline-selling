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
import { PaymentService } from '../payment'
import { OrderProductFindOneData, OrderProductService } from '../order-product'
import { GoogleSheetService } from '../shared'
import { CartService } from '../cart'
import { CartSPStatusService } from '../cart-sp-status'
import { OrderSPStatusService } from '../order-sp-status'

@Injectable()
export class OrderService {
	private readonly orderRepository: OrderRepository
	private readonly partnerService: PartnerService
	private readonly paymentService: PaymentService
	private readonly orderProductService: OrderProductService
	private readonly cartService: CartService
	private readonly cartSPStatusService: CartSPStatusService
	private readonly orderSPStatusService: OrderSPStatusService
	private readonly googleSheetService: GoogleSheetService
	constructor(
		orderRepository: OrderRepository,
		partnerService: PartnerService,
		paymentService: PaymentService,
		orderProductService: OrderProductService,
		googleSheetService: GoogleSheetService,
		cartService: CartService,
		cartSPStatusService: CartSPStatusService,
		orderSPStatusService: OrderSPStatusService,
	) {
		this.orderRepository = orderRepository
		this.partnerService = partnerService
		this.paymentService = paymentService
		this.orderProductService = orderProductService
		this.googleSheetService = googleSheetService
		this.cartService = cartService
		this.cartSPStatusService = cartSPStatusService
		this.orderSPStatusService = orderSPStatusService
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
		const order = await this.orderRepository.createOne({
			...body,
			staffId: request.user.id,
			purchaseStatus: client.data.orders.length ? ClientPurchaseStatusEnum.next : ClientPurchaseStatusEnum.first,
		})

		const orderProducts = await this.orderProductService.createMany(body.products.map((p) => ({ id: undefined, ...p, orderId: order.id })))

		const cartSPStatuses = await this.cartSPStatusService.getMany({ pagination: false, ids: body.cartSPStatusIds })

		const orderSPStatuses = await this.orderSPStatusService.createMany(
			cartSPStatuses.data.data.map((p) => ({
				orderId: order.id,
				quantity: p.quantity,
				spStatusId: p.spStatusId,
				description: p.description,
				price: p.price,
				priceWithSale: p.priceWithSale,
				sale: p.sale,
				totalSum: p.totalSum,
			})),
		)

		const mappedOrSPs: OrderProductFindOneData[] = orderSPStatuses.data.map((p) => {
			return {
				createdAt: p.createdAt,
				description: p.spStatus.sp.product.description,
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
				status: p.spStatus.status,
			}
		})

		const payments = await this.paymentService.createMany(body.payments.map((p) => ({ ...p, orderId: order.id })))

		const staffCarts = await this.cartService.getMany({ staffId: request.user.id, pagination: false })

		await this.cartService.deleteMany(staffCarts.data.data)
		await this.cartSPStatusService.deleteMany(cartSPStatuses.data.data)

		await this.googleSheetService.addOrderToSheet(order, [...orderProducts.data, ...mappedOrSPs], payments.data)

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

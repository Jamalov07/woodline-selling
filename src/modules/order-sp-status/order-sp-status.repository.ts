import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	OrderSPStatusCreateOneRequest,
	OrderSPStatusDeleteOneRequest,
	OrderSPStatusFindManyRequest,
	OrderSPStatusFindOneRequest,
	OrderSPStatusGetManyRequest,
	OrderSPStatusGetOneRequest,
	OrderSPStatusUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { OrderSPStatusController } from './order-sp-status.controller'
import { OrderProductStatusEnum } from '@prisma/client'

@Injectable()
export class OrderSPStatusRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: OrderSPStatusFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orderSPStatuss = await this.prisma.orderSPStatusModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),

				orderId: query.orderId,
				spStatusId: query.spStatusId,
			},
			select: {
				id: true,
				createdAt: true,
				quantity: true,
				description: true,
				price: true,
				priceWithSale: true,
				totalSum: true,
				sale: true,
				spStatus: {
					select: {
						id: true,
						status: true,
						sp: { select: { product: { select: { direction: true, publicId: true, description: true, model: true, quantity: true, tissue: true } } } },
					},
				},
			},
			...paginationOptions,
		})

		return orderSPStatuss
	}

	async findOne(query: OrderSPStatusFindOneRequest) {
		const staff = await this.prisma.orderSPStatusModel.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				createdAt: true,
				quantity: true,
				description: true,
				price: true,
				priceWithSale: true,
				totalSum: true,
				sale: true,
				spStatus: {
					select: {
						id: true,
						status: true,
						sp: { select: { product: { select: { direction: true, publicId: true, description: true, model: true, quantity: true, tissue: true } } } },
					},
				},
			},
		})

		return staff
	}

	async countFindMany(query: OrderSPStatusFindManyRequest) {
		const orderSPStatusCount = await this.prisma.orderSPStatusModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				orderId: query.orderId,
				spStatusId: query.spStatusId,
			},
		})

		return orderSPStatusCount
	}

	async getMany(query: OrderSPStatusGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orderSPStatuss = await this.prisma.orderSPStatusModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				orderId: query.orderId,
				spStatusId: query.spStatusId,
			},
			...paginationOptions,
		})

		return orderSPStatuss
	}

	async getOne(query: OrderSPStatusGetOneRequest) {
		const staff = await this.prisma.orderSPStatusModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countGetMany(query: OrderSPStatusGetManyRequest) {
		const orderSPStatusCount = await this.prisma.orderSPStatusModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				orderId: query.orderId,
				spStatusId: query.spStatusId,
			},
		})

		return orderSPStatusCount
	}

	async createOne(body: OrderSPStatusCreateOneRequest) {
		const orderSPStatus = await this.prisma.orderSPStatusModel.create({
			data: {
				orderId: body.orderId,
				spStatusId: body.spStatusId,
				quantity: body.quantity,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
			},
		})
		return orderSPStatus
	}

	async createMany(body: OrderSPStatusCreateOneRequest[]) {
		const orderSPStatuses = await this.prisma.orderSPStatusModel.createManyAndReturn({
			data: body.map((p) => {
				return {
					spStatusId: p.spStatusId,
					quantity: p.quantity,
					orderId: p.orderId,
					description: p.description,
					price: p.price,
					priceWithSale: p.priceWithSale,
					sale: p.sale,
					totalSum: p.totalSum,
				}
			}),
			select: {
				id: true,
				createdAt: true,
				quantity: true,
				description: true,
				price: true,
				priceWithSale: true,
				totalSum: true,
				sale: true,
				status: true,
				spStatus: {
					select: {
						id: true,
						status: true,
						sp: { select: { product: { select: { direction: true, publicId: true, description: true, model: true, quantity: true, tissue: true } } } },
					},
				},
			},
		})
		return orderSPStatuses
	}

	async updateOne(query: OrderSPStatusGetOneRequest, body: OrderSPStatusUpdateOneRequest) {
		const orderSPStatus = await this.prisma.orderSPStatusModel.update({
			where: { id: query.id },
			data: {
				quantity: body.quantity,
				spStatusId: body.spStatusId,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
				status: body.status,
			},
		})

		if (body.status === OrderProductStatusEnum.received) {
			await this.prisma.sPStatusModel.update({ where: { id: orderSPStatus.spStatusId }, data: { quantity: { decrement: orderSPStatus.quantity } } })
		}

		return orderSPStatus
	}

	async deleteOne(query: OrderSPStatusDeleteOneRequest) {
		const orderSPStatus = await this.prisma.orderSPStatusModel.delete({
			where: { id: query.id },
		})
		return orderSPStatus
	}

	async deleteMany(query: OrderSPStatusDeleteOneRequest[]) {
		const orderSPStatus = await this.prisma.orderSPStatusModel.deleteMany({
			where: { id: { in: query.map((q) => q.id) } },
		})
		return orderSPStatus
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(OrderSPStatusController)
	}
}

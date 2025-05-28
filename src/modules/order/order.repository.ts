import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
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
import { deletedAtConverter } from '../../common'
import { OrderController } from './order.controller'

@Injectable()
export class OrderRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: OrderFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orders = await this.prisma.orderModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: { contains: query.deliveryAddress, mode: 'insensitive' },
				clientId: query.clientId,
				staffId: query.staffId,
				OR: [
					{ client: { phone: { contains: query.search, mode: 'insensitive' } } },
					{ client: { fullname: { contains: query.search, mode: 'insensitive' } } },
					{ products: { some: { publicId: { contains: query.search, mode: 'insensitive' } } } },
				],
			},
			select: {
				id: true,
				createdAt: true,
				status: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				payments: true,
				purchaseStatus: true,
				products: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						direction: true,
						model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } }, provider: true } },
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						publicId: true,
						tissue: true,
						totalSum: true,
						status: true,
					},
				},
				sps: {
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
				},
			},
			...paginationOptions,
		})

		return orders
	}

	async findOne(query: OrderFindOneRequest) {
		const staff = await this.prisma.orderModel.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				createdAt: true,
				status: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				payments: true,
				purchaseStatus: true,
				products: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						direction: true,
						model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } }, provider: true } },
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						publicId: true,
						tissue: true,
						totalSum: true,
						status: true,
					},
				},
				sps: {
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
				},
			},
		})

		return staff
	}

	async countFindMany(query: OrderFindManyRequest) {
		const orderCount = await this.prisma.orderModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: { contains: query.deliveryAddress, mode: 'insensitive' },
				clientId: query.clientId,
				staffId: query.staffId,
				OR: [
					{ client: { phone: { contains: query.search, mode: 'insensitive' } } },
					{ client: { fullname: { contains: query.search, mode: 'insensitive' } } },
					{ products: { some: { publicId: { contains: query.search, mode: 'insensitive' } } } },
				],
			},
		})

		return orderCount
	}

	async getMany(query: OrderGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orders = await this.prisma.orderModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: query.deliveryAddress,
				clientId: query.clientId,
				staffId: query.staffId,
			},
			...paginationOptions,
		})

		return orders
	}

	async getOne(query: OrderGetOneRequest) {
		const staff = await this.prisma.orderModel.findFirst({
			where: {
				id: query.id,
				deliveryAddress: query.deliveryAddress,
			},
		})

		return staff
	}

	async countGetMany(query: OrderGetManyRequest) {
		const orderCount = await this.prisma.orderModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: query.deliveryAddress,
				clientId: query.clientId,
				staffId: query.staffId,
			},
		})

		return orderCount
	}

	async createOne(body: OrderCreateOneRequest) {
		const order = await this.prisma.orderModel.create({
			data: {
				deliveryAddress: body.deliveryAddress,
				clientId: body.clientId,
				deliveryDate: new Date(body.deliveryDate),
				staffId: body.staffId,
				purchaseStatus: body.purchaseStatus,
			},
			select: { id: true, createdAt: true, client: true, deliveryAddress: true, deliveryDate: true, purchaseStatus: true, staff: true, status: true },
		})
		return order
	}

	async createOneWithAll(body: OrderCreateOneWithPaymentProductRequest) {
		let carts = []
		if (body.cartIds?.length) {
			carts = await this.prisma.cartModel.findMany({ where: { id: { in: body.cartIds } } })
			await this.prisma.cartModel.deleteMany({ where: { id: { in: body.cartIds } } })
		}

		let cartSPSs = []
		if (body.cartSPSIds?.length) {
			cartSPSs = await this.prisma.cartSPStatusModel.findMany({ where: { id: { in: body.cartSPSIds } } })
			await this.prisma.cartSPStatusModel.deleteMany({ where: { id: { in: body.cartSPSIds } } })
		}

		const order = await this.prisma.orderModel.create({
			data: {
				deliveryAddress: body.deliveryAddress,
				clientId: body.clientId,
				deliveryDate: new Date(body.deliveryDate),
				staffId: body.staffId,
				purchaseStatus: body.purchaseStatus,
				payments: {
					createMany: {
						skipDuplicates: false,
						data: body.payments.map((p) => {
							return {
								description: p.description,
								exchangeRate: p.exchangeRate,
								fromCurrency: p.fromCurrency,
								method: p.method,
								sum: p.sum,
								totalSum: p.totalSum,
							}
						}),
					},
				},
				products: {
					createMany: {
						skipDuplicates: false,
						data: carts.map((c) => {
							return {
								direction: c.direction,
								modelId: c.modelId,
								totalSum: c.totalSum,
								publicId: c.publicId,
								tissue: c.tissue,
								description: c.direction,
								price: c.price,
								priceWithSale: c.priceWithSale,
								sale: c.sale,
								quantity: c.quantity,
							}
						}),
					},
				},
				sps: {
					createMany: {
						skipDuplicates: false,
						data: cartSPSs.map((p) => {
							return {
								spStatusId: p.spStatusId,
								quantity: p.quantity,
								description: p.description,
								price: p.price,
								priceWithSale: p.priceWithSale,
								sale: p.sale,
								totalSum: p.totalSum,
							}
						}),
					},
				},
			},
			select: {
				id: true,
				createdAt: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				purchaseStatus: true,
				staff: true,
				status: true,
				payments: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						exchangeRate: true,
						fromCurrency: true,
						method: true,
						sum: true,
						toCurrency: true,
						totalSum: true,
					},
				},
				products: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						direction: true,
						model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } } } },
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						publicId: true,
						tissue: true,
						totalSum: true,
						status: true,
					},
				},
				sps: {
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
								sp: {
									select: {
										product: {
											select: {
												direction: true,
												publicId: true,
												description: true,
												model: {
													select: {
														id: true,
														createdAt: true,
														name: true,
														provider: true,
														furnitureType: { select: { id: true, name: true, createdAt: true } },
													},
												},
												quantity: true,
												tissue: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		})

		return order
	}

	async updateOne(query: OrderGetOneRequest, body: OrderUpdateOneRequest) {
		const order = await this.prisma.orderModel.update({
			where: { id: query.id },
			data: { deliveryAddress: body.deliveryAddress, clientId: body.clientId, staffId: body.staffId, deliveryDate: body.deliveryDate, status: body.status },
		})

		return order
	}

	async deleteOne(query: OrderDeleteOneRequest) {
		const order = await this.prisma.orderModel.delete({
			where: { id: query.id },
		})
		return order
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(OrderController)
	}
}

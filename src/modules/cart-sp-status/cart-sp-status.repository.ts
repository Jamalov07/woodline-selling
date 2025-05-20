import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	CartSPStatusCreateOneRequest,
	CartSPStatusDeleteOneRequest,
	CartSPStatusFindManyRequest,
	CartSPStatusFindOneRequest,
	CartSPStatusGetManyRequest,
	CartSPStatusGetOneRequest,
	CartSPStatusUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { CartSPStatusController } from './cart-sp-status.controller'

@Injectable()
export class CartSPStatusRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: CartSPStatusFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const cartSPStatuss = await this.prisma.cartSPStatusModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),

				staffId: query.staffId,
				spStatusId: query.spStatusId,
			},
			...paginationOptions,
		})

		return cartSPStatuss
	}

	async findOne(query: CartSPStatusFindOneRequest) {
		const staff = await this.prisma.cartSPStatusModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countFindMany(query: CartSPStatusFindManyRequest) {
		const cartSPStatusCount = await this.prisma.cartSPStatusModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				staffId: query.staffId,
				spStatusId: query.spStatusId,
			},
		})

		return cartSPStatusCount
	}

	async getMany(query: CartSPStatusGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const cartSPStatuss = await this.prisma.cartSPStatusModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				staffId: query.staffId,
				spStatusId: query.spStatusId,
			},
			...paginationOptions,
		})

		return cartSPStatuss
	}

	async getOne(query: CartSPStatusGetOneRequest) {
		const staff = await this.prisma.cartSPStatusModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countGetMany(query: CartSPStatusGetManyRequest) {
		const cartSPStatusCount = await this.prisma.cartSPStatusModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				staffId: query.staffId,
				spStatusId: query.spStatusId,
			},
		})

		return cartSPStatusCount
	}

	async createOne(body: CartSPStatusCreateOneRequest) {
		const cartSPStatus = await this.prisma.cartSPStatusModel.create({
			data: {
				staffId: body.staffId,
				spStatusId: body.spStatusId,
				quantity: body.quantity,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
			},
		})
		return cartSPStatus
	}

	async updateOne(query: CartSPStatusGetOneRequest, body: CartSPStatusUpdateOneRequest) {
		const cartSPStatus = await this.prisma.cartSPStatusModel.update({
			where: { id: query.id },
			data: {
				quantity: body.quantity,
				spStatusId: body.spStatusId,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
			},
		})

		return cartSPStatus
	}

	async deleteOne(query: CartSPStatusDeleteOneRequest) {
		const cartSPStatus = await this.prisma.cartSPStatusModel.delete({
			where: { id: query.id },
		})
		return cartSPStatus
	}

	async deleteMany(query: CartSPStatusDeleteOneRequest[]) {
		const cartSPStatus = await this.prisma.cartSPStatusModel.deleteMany({
			where: { id: { in: query.map((q) => q.id) } },
		})
		return cartSPStatus
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(CartSPStatusController)
	}
}

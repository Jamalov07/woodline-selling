import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	StorehouseProductCreateOneRequest,
	StorehouseProductDeleteOneRequest,
	StorehouseProductFindManyRequest,
	StorehouseProductFindOneRequest,
	StorehouseProductGetManyRequest,
	StorehouseProductGetOneRequest,
	StorehouseProductUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { StorehouseProductController } from './storehouse-product.controller'

@Injectable()
export class StorehouseProductRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StorehouseProductFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sps = await this.prisma.sPModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				storehouseId: query.storehouseId,
				OR: [
					{ product: { publicId: { contains: query.search, mode: 'insensitive' } } },
					{ product: { model: { name: { contains: query.search, mode: 'insensitive' } } } },
					{ product: { model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } } },
				],
				statuses: {
					some: {
						status: {
							in: query.statuses,
						},
						isBooked: query.isBooked,
					},
				},
			},
			...paginationOptions,
		})

		return sps
	}

	async findOne(query: StorehouseProductFindOneRequest) {
		const staff = await this.prisma.sPModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countFindMany(query: StorehouseProductFindManyRequest) {
		const spCount = await this.prisma.sPModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				storehouseId: query.storehouseId,
				OR: [
					{ product: { publicId: { contains: query.search, mode: 'insensitive' } } },
					{ product: { model: { name: { contains: query.search, mode: 'insensitive' } } } },
					{ product: { model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } } },
				],
				statuses: {
					some: {
						status: {
							in: query.statuses,
						},
						isBooked: query.isBooked,
					},
				},
			},
		})

		return spCount
	}

	async getMany(query: StorehouseProductGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sps = await this.prisma.sPModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				storehouseId: query.storehouseId,
			},
			...paginationOptions,
		})

		return sps
	}

	async getOne(query: StorehouseProductGetOneRequest) {
		const staff = await this.prisma.sPModel.findFirst({
			where: {
				id: query.id,
				storehouseId: query.storehouseId,
			},
		})

		return staff
	}

	async countGetMany(query: StorehouseProductGetManyRequest) {
		const spCount = await this.prisma.sPModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				storehouseId: query.storehouseId,
			},
		})

		return spCount
	}

	async createOne(body: StorehouseProductCreateOneRequest) {
		const sp = await this.prisma.sPModel.create({
			data: {
				storehouseId: body.storehouseId,
				productId: body.productId,
			},
		})
		return sp
	}

	async updateOne(query: StorehouseProductGetOneRequest, body: StorehouseProductUpdateOneRequest) {
		const sp = await this.prisma.sPModel.update({
			where: { id: query.id },
			data: {
				storehouseId: body.storehouseId,
				productId: body.productId,
				deletedAt: body.deletedAt,
			},
		})

		return sp
	}

	async deleteOne(query: StorehouseProductDeleteOneRequest) {
		const sp = await this.prisma.sPModel.delete({
			where: { id: query.id },
		})
		return sp
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StorehouseProductController)
	}
}

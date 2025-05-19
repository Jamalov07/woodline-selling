import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	StorehouseCreateOneRequest,
	StorehouseDeleteOneRequest,
	StorehouseFindManyRequest,
	StorehouseFindOneRequest,
	StorehouseGetManyRequest,
	StorehouseGetOneRequest,
	StorehouseUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { StorehouseController } from './storehouse.controller'

@Injectable()
export class StorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StorehouseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouseModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				name: { contains: query.name, mode: 'insensitive' },
				type: query.type,
			},
			...paginationOptions,
		})

		return storehouses
	}

	async findOne(query: StorehouseFindOneRequest) {
		const staff = await this.prisma.storehouseModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countFindMany(query: StorehouseFindManyRequest) {
		const storehouseCount = await this.prisma.storehouseModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				type: query.type,
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return storehouseCount
	}

	async getMany(query: StorehouseGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouseModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
			...paginationOptions,
		})

		return storehouses
	}

	async getOne(query: StorehouseGetOneRequest) {
		const staff = await this.prisma.storehouseModel.findFirst({
			where: {
				id: query.id,
				name: query.name,
			},
		})

		return staff
	}

	async countGetMany(query: StorehouseGetManyRequest) {
		const storehouseCount = await this.prisma.storehouseModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
		})

		return storehouseCount
	}

	async createOne(body: StorehouseCreateOneRequest) {
		const storehouse = await this.prisma.storehouseModel.create({
			data: { name: body.name, type: body.type },
		})
		return storehouse
	}

	async updateOne(query: StorehouseGetOneRequest, body: StorehouseUpdateOneRequest) {
		const storehouse = await this.prisma.storehouseModel.update({
			where: { id: query.id },
			data: { name: body.name, type: body.type, deletedAt: body.deletedAt },
		})

		return storehouse
	}

	async deleteOne(query: StorehouseDeleteOneRequest) {
		const storehouse = await this.prisma.storehouseModel.delete({
			where: { id: query.id },
		})
		return storehouse
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StorehouseController)
	}
}

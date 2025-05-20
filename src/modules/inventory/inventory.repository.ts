import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	InventoryCreateOneRequest,
	InventoryDeleteOneRequest,
	InventoryFindManyRequest,
	InventoryFindOneRequest,
	InventoryGetManyRequest,
	InventoryGetOneRequest,
	InventoryUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { InventoryController } from './inventory.controller'

@Injectable()
export class InventoryRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: InventoryFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const inventorys = await this.prisma.inventoryModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
			...paginationOptions,
		})

		return inventorys
	}

	async findOne(query: InventoryFindOneRequest) {
		const staff = await this.prisma.inventoryModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countFindMany(query: InventoryFindManyRequest) {
		const inventoryCount = await this.prisma.inventoryModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return inventoryCount
	}

	async getMany(query: InventoryGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const inventorys = await this.prisma.inventoryModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
			...paginationOptions,
		})

		return inventorys
	}

	async getOne(query: InventoryGetOneRequest) {
		const staff = await this.prisma.inventoryModel.findFirst({
			where: {
				id: query.id,
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return staff
	}

	async countGetMany(query: InventoryGetManyRequest) {
		const inventoryCount = await this.prisma.inventoryModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return inventoryCount
	}

	async createOne(body: InventoryCreateOneRequest) {
		const inventory = await this.prisma.inventoryModel.create({
			data: {
				fromStorekeeperId: body.fromStorekeeperId,
				fromWarehouseId: body.fromWarehouseId,
				providerId: body.providerId,
				toStorekeeperId: body.toStorekeeperId,
				toWarehouseId: body.toWarehouseId,
				status: body.status,
				type: body.type,
			},
		})
		return inventory
	}

	async updateOne(query: InventoryGetOneRequest, body: InventoryUpdateOneRequest) {
		const inventory = await this.prisma.inventoryModel.update({
			where: { id: query.id },
			data: {
				deletedAt: body.deletedAt,
				fromStorekeeperId: body.fromStorekeeperId,
				fromWarehouseId: body.fromWarehouseId,
				providerId: body.providerId,
				toStorekeeperId: body.toStorekeeperId,
				toWarehouseId: body.toWarehouseId,
				status: body.status,
				type: body.type,
			},
		})

		return inventory
	}

	async deleteOne(query: InventoryDeleteOneRequest) {
		const inventory = await this.prisma.inventoryModel.delete({
			where: { id: query.id },
		})
		return inventory
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(InventoryController)
	}
}

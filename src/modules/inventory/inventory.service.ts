import { BadRequestException, Injectable } from '@nestjs/common'
import { InventoryRepository } from './inventory.repository'
import {
	InventoryCreateOneRequest,
	InventoryDeleteOneRequest,
	InventoryFindManyRequest,
	InventoryFindOneRequest,
	InventoryGetManyRequest,
	InventoryGetOneRequest,
	InventoryUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'
import { InventoryStatusEnum, InventoryTypeEnum } from '@prisma/client'

@Injectable()
export class InventoryService {
	private readonly inventoryRepository: InventoryRepository
	constructor(inventoryRepository: InventoryRepository) {
		this.inventoryRepository = inventoryRepository
	}

	async findMany(query: InventoryFindManyRequest) {
		const inventorys = await this.inventoryRepository.findMany(query)
		const inventorysCount = await this.inventoryRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: inventorysCount,
					pagesCount: Math.ceil(inventorysCount / query.pageSize),
					pageSize: inventorys.length,
					data: inventorys,
				}
			: { data: inventorys }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: InventoryFindOneRequest) {
		const staff = await this.inventoryRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('inventory not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: InventoryGetManyRequest) {
		const inventorys = await this.inventoryRepository.getMany(query)
		const inventorysCount = await this.inventoryRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(inventorysCount / query.pageSize),
					pageSize: inventorys.length,
					data: inventorys,
				}
			: { data: inventorys }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: InventoryGetOneRequest) {
		const staff = await this.inventoryRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('inventory not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(request: CRequest, body: InventoryCreateOneRequest) {
		let payload: InventoryCreateOneRequest = body
		if (body.type === InventoryTypeEnum.purchase) {
			if (!body.providerId) throw new BadRequestException('providerId should not be empty')
			if (!body.toWarehouseId) throw new BadRequestException('toWarehouseId should not be empty')

			payload = {
				...body,
				fromWarehouseId: undefined,
				toStorekeeperId: request.user.id,
				fromStorekeeperId: undefined,
			}
		} else if (body.type === InventoryTypeEnum.selling) {
			if (!body.fromWarehouseId) throw new BadRequestException('fromWarehouseId should not be empty')

			payload = {
				...body,
				toWarehouseId: undefined,
				fromStorekeeperId: request.user.id,
				toStorekeeperId: undefined,
			}
		} else {
			if (!body.fromWarehouseId) throw new BadRequestException('fromWarehouseId should not be empty')
			if (!body.toWarehouseId) throw new BadRequestException('toWarehouseId should not be empty')

			payload = {
				...body,
				fromStorekeeperId: request.user.id,
			}
		}

		await this.inventoryRepository.createOne({ ...payload })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: InventoryGetOneRequest, body: InventoryUpdateOneRequest) {
		const inventory = await this.getOne(query)

		if (inventory.data.status === InventoryStatusEnum.accepted) {
			throw new BadRequestException(`you can't update accepted inventory`)
		}

		await this.inventoryRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: InventoryDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.inventoryRepository.deleteOne(query)
		} else {
			await this.inventoryRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

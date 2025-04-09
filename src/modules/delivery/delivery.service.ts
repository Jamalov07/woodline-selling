import { BadRequestException, Injectable } from '@nestjs/common'
import { DeliveryRepository } from './delivery.repository'
import {
	DeliveryCreateManyRequest,
	DeliveryCreateOneRequest,
	DeliveryDeleteOneRequest,
	DeliveryFindManyRequest,
	DeliveryFindOneRequest,
	DeliveryGetManyRequest,
	DeliveryGetOneRequest,
	DeliveryUpdateOneRequest,
} from './interfaces'
import { createResponse } from '../../common'

@Injectable()
export class DeliveryService {
	private readonly deliveryRepository: DeliveryRepository
	constructor(deliveryRepository: DeliveryRepository) {
		this.deliveryRepository = deliveryRepository
	}

	async findMany(query: DeliveryFindManyRequest) {
		const deliverys = await this.deliveryRepository.findMany(query)
		const deliverysCount = await this.deliveryRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: deliverysCount,
					pagesCount: Math.ceil(deliverysCount / query.pageSize),
					pageSize: deliverys.length,
					data: deliverys,
				}
			: { data: deliverys }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: DeliveryFindOneRequest) {
		const staff = await this.deliveryRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: DeliveryGetManyRequest) {
		const deliverys = await this.deliveryRepository.getMany(query)
		const deliverysCount = await this.deliveryRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(deliverysCount / query.pageSize),
					pageSize: deliverys.length,
					data: deliverys,
				}
			: { data: deliverys }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: DeliveryGetOneRequest) {
		const staff = await this.deliveryRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('furniture type not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: DeliveryCreateOneRequest) {
		const delivery = await this.deliveryRepository.createOne({ ...body })

		return createResponse({ data: delivery, success: { messages: ['create success'] } })
	}

	async createMany(body: DeliveryCreateManyRequest) {
		const delivery = await this.deliveryRepository.createMany(body)

		return createResponse({ data: delivery, success: { messages: ['create success'] } })
	}

	async updateOne(query: DeliveryGetOneRequest, body: DeliveryUpdateOneRequest) {
		await this.getOne(query)

		const delivery = await this.deliveryRepository.updateOne(query, { ...body })

		return createResponse({ data: delivery, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: DeliveryDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.deliveryRepository.deleteOne(query)
		} else {
			await this.deliveryRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { ClientRepository } from './client.repository'
import {
	ClientCreateOneRequest,
	ClientDeleteOneRequest,
	ClientFindManyRequest,
	ClientFindOneRequest,
	ClientGetManyRequest,
	ClientGetOneRequest,
	ClientUpdateOneRequest,
} from './interfaces'
import { createResponse } from '../../common'

@Injectable()
export class ClientService {
	private readonly clientRepository: ClientRepository
	constructor(clientRepository: ClientRepository) {
		this.clientRepository = clientRepository
	}

	async findMany(query: ClientFindManyRequest) {
		const clients = await this.clientRepository.findMany(query)
		const clientsCount = await this.clientRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: clientsCount,
					pagesCount: Math.ceil(clientsCount / query.pageSize),
					pageSize: clients.length,
					data: clients,
				}
			: { data: clients }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ClientFindOneRequest) {
		const client = await this.clientRepository.findOne(query)

		if (!client) {
			throw new BadRequestException('client not found')
		}
		return createResponse({ data: { ...client }, success: { messages: ['find one success'] } })
	}

	async getMany(query: ClientGetManyRequest) {
		const clients = await this.clientRepository.getMany(query)
		const clientsCount = await this.clientRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(clientsCount / query.pageSize),
					pageSize: clients.length,
					data: clients,
				}
			: { data: clients }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ClientGetOneRequest) {
		const client = await this.clientRepository.getOne(query)

		if (!client) {
			throw new BadRequestException('client not found')
		}

		return createResponse({ data: client, success: { messages: ['get one success'] } })
	}

	async createOne(body: ClientCreateOneRequest) {
		const candidate = await this.clientRepository.getOne({ phone: body.phone })
		if (candidate) {
			throw new BadRequestException('phone already exists')
		}

		const client = await this.clientRepository.createOne({ ...body })

		return createResponse({ data: client, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ClientGetOneRequest, body: ClientUpdateOneRequest) {
		await this.getOne(query)

		if (body.phone) {
			const candidate = await this.clientRepository.getOne({ phone: body.phone })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('phone already exists')
			}
		}

		if (body.name) {
			const candidate = await this.clientRepository.getOne({ name: body.name })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('name already exists')
			}
		}

		await this.clientRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ClientDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.clientRepository.deleteOne(query)
		} else {
			await this.clientRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

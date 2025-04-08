import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	ClientCreateOneRequest,
	ClientDeleteOneRequest,
	ClientFindManyRequest,
	ClientFindOneRequest,
	ClientGetManyRequest,
	ClientGetOneRequest,
	ClientUpdateOneRequest,
} from './interfaces'
import { ClientController } from './client.controller'
import { deletedAtConverter } from '../../common'

@Injectable()
export class ClientRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ClientFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const clients = await this.prisma.clientModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { contains: query.phone, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
			},
			...paginationOptions,
		})

		return clients
	}

	async findOne(query: ClientFindOneRequest) {
		const client = await this.prisma.clientModel.findFirst({
			where: {
				id: query.id,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
			select: { id: true, createdAt: true, deletedAt: true, name: true, whereFrom: true, phone: true, updatedAt: true },
		})

		return client
	}

	async countFindMany(query: ClientFindManyRequest) {
		const clientsCount = await this.prisma.clientModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { contains: query.phone, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return clientsCount
	}

	async getMany(query: ClientGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const clients = await this.prisma.clientModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: query.phone,
				name: query.name,
			},
			...paginationOptions,
		})

		return clients
	}

	async getOne(query: ClientGetOneRequest) {
		const client = await this.prisma.clientModel.findFirst({
			where: {
				id: query.id,
				phone: { contains: query.phone },
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return client
	}

	async countGetMany(query: ClientGetManyRequest) {
		const clientsCount = await this.prisma.clientModel.count({
			where: {
				id: { in: query.ids },
				phone: query.phone,
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return clientsCount
	}

	async createOne(body: ClientCreateOneRequest) {
		const client = await this.prisma.clientModel.create({
			data: {
				phone: body.phone,
				name: body.name,
				whereFrom: body.whereFrom,
			},
		})
		return client
	}

	async updateOne(query: ClientGetOneRequest, body: ClientUpdateOneRequest) {
		const client = await this.prisma.clientModel.update({
			where: { id: query.id },
			data: {
				phone: body.phone,
				name: body.name,
				deletedAt: body.deletedAt,
			},
		})

		return client
	}

	async deleteOne(query: ClientDeleteOneRequest) {
		const client = await this.prisma.clientModel.delete({
			where: { id: query.id },
		})
		return client
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(ClientController)
	}
}

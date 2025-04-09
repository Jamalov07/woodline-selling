import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
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
import { deletedAtConverter } from '../../common'

@Injectable()
export class DeliveryRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: DeliveryFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const deliverys = await this.prisma.deliveryModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				title: { contains: query.title, mode: 'insensitive' },
			},
			...paginationOptions,
			select: {
				id: true,
				createdAt: true,
				deletedAt: true,
				title: true,
				updatedAt: true,
				deliveryDate: true,
				isCopied: true,
				publicId: true,
				tripId: true,
				price: true,
				staff: true,
				order: true,
			},
		})

		return deliverys
	}

	async findOne(query: DeliveryFindOneRequest) {
		const staff = await this.prisma.deliveryModel.findFirst({
			where: { id: query.id },
			select: {
				id: true,
				createdAt: true,
				deletedAt: true,
				title: true,
				updatedAt: true,
				deliveryDate: true,
				isCopied: true,
				publicId: true,
				tripId: true,
				price: true,
				staff: true,
				order: true,
			},
		})

		return staff
	}

	async countFindMany(query: DeliveryFindManyRequest) {
		const deliveryCount = await this.prisma.deliveryModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				title: { contains: query.title, mode: 'insensitive' },
			},
		})

		return deliveryCount
	}

	async getMany(query: DeliveryGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const deliverys = await this.prisma.deliveryModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				title: query.title,
			},
			...paginationOptions,
		})

		return deliverys
	}

	async getOne(query: DeliveryGetOneRequest) {
		const staff = await this.prisma.deliveryModel.findFirst({
			where: {
				id: query.id,
				title: query.title,
			},
			select: {
				id: true,
				createdAt: true,
				deletedAt: true,
				title: true,
				updatedAt: true,
				deliveryDate: true,
				isCopied: true,
				publicId: true,
				tripId: true,
				price: true,
				staff: true,
				order: true,
			},
		})

		return staff
	}

	async countGetMany(query: DeliveryFindManyRequest) {
		const deliveryCount = await this.prisma.deliveryModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				title: query.title,
			},
		})

		return deliveryCount
	}

	async createOne(body: DeliveryCreateOneRequest) {
		const delivery = await this.prisma.deliveryModel.create({
			data: { title: body.title, deliveryDate: body.deliveryDate, orderId: body.orderId, price: body.price, staffId: body.staffId, tripId: body.tripId },
			select: {
				id: true,
				createdAt: true,
				deletedAt: true,
				title: true,
				updatedAt: true,
				deliveryDate: true,
				isCopied: true,
				publicId: true,
				tripId: true,
				price: true,
				staff: true,
				order: true,
			},
		})
		return delivery
	}

	async createMany(body: DeliveryCreateManyRequest) {
		const deliverys = await this.prisma.deliveryModel.createMany({
			data: body.datas.map((d) => ({ title: d.title, deliveryDate: d.deliveryDate, orderId: d.orderId, price: d.price, staffId: d.staffId, tripId: d.tripId })),
		})
		return deliverys
	}

	async updateOne(query: DeliveryGetOneRequest, body: DeliveryUpdateOneRequest) {
		const delivery = await this.prisma.deliveryModel.update({
			where: { id: query.id },
			data: { title: body.title, deliveryDate: body.deliveryDate, orderId: body.orderId, price: body.price, staffId: body.staffId, tripId: body.tripId },
		})

		return delivery
	}

	async deleteOne(query: DeliveryDeleteOneRequest) {
		const delivery = await this.prisma.deliveryModel.delete({
			where: { id: query.id },
		})
		return delivery
	}
}

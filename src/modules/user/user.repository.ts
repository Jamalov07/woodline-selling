import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import { UserCreateOneRequest, UserDeleteOneRequest, UserFindManyRequest, UserFindOneRequest, UserGetManyRequest, UserGetOneRequest, UserUpdateOneRequest } from './interfaces'

@Injectable()
export class UserRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: UserFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const users = await this.prisma.userModel.findMany({
			where: {
				fullname: { contains: query.fullname, mode: 'insensitive' },
				username: { contains: query.username, mode: 'insensitive' },
				phone: { contains: query.phone, mode: 'insensitive' },
			},
			select: {
				id: true,
				fullname: true,
				createdAt: true,
				actions: { select: { id: true, name: true, method: true, description: true, url: true } },
			},

			...paginationOptions,
		})

		return users
	}

	async findOne(query: UserFindOneRequest) {
		const role = await this.prisma.userModel.findFirst({
			where: { id: query.id },
			select: {
				id: true,
				fullname: true,
				createdAt: true,
				token: true,
				actions: { select: { id: true, name: true, method: true, description: true, url: true } },
			},
		})

		return role
	}

	async countFindMany(query: UserFindManyRequest) {
		const usersCount = await this.prisma.userModel.count({
			where: {
				fullname: { contains: query.fullname, mode: 'insensitive' },
				username: { contains: query.username, mode: 'insensitive' },
				phone: { contains: query.phone, mode: 'insensitive' },
			},
		})

		return usersCount
	}

	async getMany(query: UserGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const users = await this.prisma.userModel.findMany({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
				username: query.username,
				phone: query.phone,
			},
			...paginationOptions,
		})

		return users
	}

	async getOne(query: UserGetOneRequest) {
		const role = await this.prisma.userModel.findFirst({
			where: {
				id: query.id,
				fullname: query.fullname,
			},
		})

		return role
	}

	async countGetMany(query: UserGetManyRequest) {
		const usersCount = await this.prisma.userModel.count({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
				username: query.username,
				phone: query.phone,
			},
		})

		return usersCount
	}

	async createOne(body: UserCreateOneRequest) {
		const user = await this.prisma.userModel.create({
			data: {
				fullname: body.fullname,
				username: body.username,
				phone: body.phone,
				password: body.password,
				partnerInfo: { create: { whereFrom: body.whereFrom, balance: body.balance } },
			},
		})

		return user
	}

	async updateOne(query: UserGetOneRequest, body: UserUpdateOneRequest) {
		const user = await this.prisma.userModel.update({
			where: { id: query.id },
			data: {
				fullname: body.fullname,
				username: body.username,
				phone: body.phone,
				password: body.password,
				token: body.token,
				deletedAt: body.deletedAt,
				partnerInfo: { update: { whereFrom: body.whereFrom, balance: body.balance } },
			},
		})

		return user
	}

	async deleteOne(query: UserDeleteOneRequest) {
		const user = await this.prisma.userModel.delete({
			where: { id: query.id },
		})

		return user
	}
}

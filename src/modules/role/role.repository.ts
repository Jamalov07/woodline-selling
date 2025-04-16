import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../shared'
import { RoleCreateOneRequest, RoleDeleteOneRequest, RoleFindManyRequest, RoleFindOneRequest, RoleGetManyRequest, RoleGetOneRequest, RoleUpdateOneRequest } from './interfaces'
import { RoleController } from './role.controller'
import { RoleNameEnum } from '@prisma/client'

@Injectable()
export class RoleRepository implements OnModuleInit {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: RoleFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const roles = await this.prisma.roleModel.findMany({
			where: {
				id: { in: query.ids },
				name: query.name,
			},
			select: { id: true, name: true, createdAt: true, actions: { select: { id: true, name: true, method: true, description: true, url: true } } },
			...paginationOptions,
		})

		return roles
	}

	async findOne(query: RoleFindOneRequest) {
		const role = await this.prisma.roleModel.findFirst({
			where: {
				id: query.id,
				name: query.name,
			},
			select: { id: true, name: true, createdAt: true, actions: { select: { id: true, name: true, method: true, description: true, url: true } } },
		})

		return role
	}

	async countFindMany(query: RoleFindManyRequest) {
		const rolesCount = await this.prisma.roleModel.count({
			where: {
				id: { in: query.ids },
				name: query.name,
			},
		})

		return rolesCount
	}

	async getMany(query: RoleGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const roles = await this.prisma.roleModel.findMany({
			where: { id: { in: query.ids }, name: query.name },
			...paginationOptions,
		})

		return roles
	}

	async getOne(query: RoleGetOneRequest) {
		const role = await this.prisma.roleModel.findFirst({
			where: { id: query.id, name: query.name },
		})

		return role
	}

	async countGetMany(query: RoleGetManyRequest) {
		const rolesCount = await this.prisma.roleModel.count({
			where: { id: { in: query.ids }, name: query.name },
		})

		return rolesCount
	}

	async createOne(body: RoleCreateOneRequest) {
		const role = await this.prisma.roleModel.create({
			data: { name: body.name, actions: { connect: body.actionsToConnect.map((a) => ({ id: a })) } },
		})
		return role
	}

	async updateOne(query: RoleGetOneRequest, body: RoleUpdateOneRequest) {
		const role = await this.prisma.roleModel.update({
			where: { id: query.id },
			data: {
				actions: {
					connect: body.actionsToConnect.map((a) => ({ id: a })),
					disconnect: body.actionsToDisconnect.map((a) => ({ id: a })),
				},
			},
		})

		return role
	}

	async deleteOne(query: RoleDeleteOneRequest) {
		const role = await this.prisma.roleModel.delete({
			where: { id: query.id },
		})

		return role
	}

	async onModuleInit() {
		await this.prisma.roleModel.createMany({ skipDuplicates: true, data: Object.values(RoleNameEnum).map((n) => ({ name: n })) })
		await this.prisma.createActionMethods(RoleController)
	}
}

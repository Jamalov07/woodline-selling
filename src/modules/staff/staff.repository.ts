import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	StaffCreateOneRequest,
	StaffDeleteOneRequest,
	StaffFindManyRequest,
	StaffFindOneRequest,
	StaffGetManyRequest,
	StaffGetOneRequest,
	StaffUpdateOneRequest,
} from './interfaces'
import { StaffController } from './staff.controller'

@Injectable()
export class StaffRepository implements OnModuleInit {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StaffFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const staffs = await this.prisma.staffModel.findMany({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
			},
			select: {
				id: true,
				fullname: true,
				phone: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},
			...paginationOptions,
		})

		return staffs
	}

	async findOne(query: StaffFindOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: { id: query.id },
			select: {
				id: true,
				fullname: true,
				phone: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},
		})

		return staff
	}

	async countFindMany(query: StaffFindManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
			},
		})

		return staffsCount
	}

	async getMany(query: StaffGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const staffs = await this.prisma.staffModel.findMany({
			where: { id: { in: query.ids }, fullname: query.fullname },
			...paginationOptions,
		})

		return staffs
	}

	async getOne(query: StaffGetOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: { id: query.id, fullname: query.fullname },
		})

		return staff
	}

	async countGetMany(query: StaffGetManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: { id: { in: query.ids }, fullname: query.fullname },
		})

		return staffsCount
	}

	async createOne(body: StaffCreateOneRequest) {
		const rolesToConnect = body.actionsToConnect.length
			? await this.prisma.staffRoleModel.findMany({
					where: { actions: { some: { id: { in: body.actionsToConnect } } } },
				})
			: []

		const staff = await this.prisma.staffModel.create({
			data: {
				fullname: body.fullname,
				password: body.password,
				phone: body.phone,
				roles: { connect: rolesToConnect.map((r) => ({ id: r.id })) },
				actions: { connect: body.actionsToConnect.map((r) => ({ id: r })) },
			},
		})
		return staff
	}

	async updateOne(query: StaffGetOneRequest, body: StaffUpdateOneRequest) {
		const user = await this.prisma.staffModel.findFirst({ where: { id: query.id }, select: { actions: true, roles: true } })

		const currentActionIds = user.actions.map((a) => a.id)

		const actionIdsToConnect = [...currentActionIds.filter((id) => !body.actionsToDisconnect.includes(id)), ...body.actionsToConnect]

		const rolesToConnect = (
			await this.prisma.staffRoleModel.findMany({
				where: { actions: { some: { id: { in: actionIdsToConnect } } } },
			})
		).map((r) => r.id)

		const rolesToDisconnect = (
			await this.prisma.staffRoleModel.findMany({
				where: { actions: { some: { id: { in: body.actionsToDisconnect } } } },
			})
		)
			.map((r) => r.id)
			.filter((r) => !rolesToConnect.includes(r))

		const staff = await this.prisma.staffModel.update({
			where: { id: query.id },
			data: {
				fullname: body.fullname,
				password: body.password,
				phone: body.phone,
				token: body.token,
				deletedAt: body.deletedAt,
				roles: {
					connect: rolesToConnect.map((r) => ({ id: r })),
					disconnect: rolesToDisconnect.map((r) => ({ id: r })),
				},
				actions: {
					connect: (body.actionsToConnect ?? []).map((r) => ({ id: r })),
					disconnect: (body.actionsToDisconnect ?? []).map((r) => ({ id: r })),
				},
			},
		})

		return staff
	}

	async deleteOne(query: StaffDeleteOneRequest) {
		const staff = await this.prisma.staffModel.delete({
			where: { id: query.id },
		})

		return staff
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StaffController)
	}
}

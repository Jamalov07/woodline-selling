import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	PartnerCreateOneRequest,
	PartnerDeleteOneRequest,
	PartnerFindManyRequest,
	PartnerFindOneRequest,
	PartnerGetManyRequest,
	PartnerGetOneRequest,
	PartnerUpdateOneRequest,
} from './interfaces'
import { PartnerController } from './partner.controller'
import { PartnerRoleEnum } from '@prisma/client'

@Injectable()
export class PartnerRepository implements OnModuleInit {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: PartnerFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const partners = await this.prisma.partnerModel.findMany({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
			},
			select: {
				id: true,
				fullname: true,
				phone: true,
				balance: true,
				whereFrom: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},

			...paginationOptions,
		})

		return partners
	}

	async findManyProvider(query: PartnerFindManyRequest) {
		const partnerRole = await this.prisma.partnerRoleModel.findFirst({ where: { name: PartnerRoleEnum.provider } })

		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const partners = await this.prisma.partnerModel.findMany({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
				roles: { some: { id: partnerRole?.id } },
			},
			select: {
				id: true,
				fullname: true,
				phone: true,
				balance: true,
				whereFrom: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},

			...paginationOptions,
		})

		return partners
	}

	async findOne(query: PartnerFindOneRequest) {
		const partner = await this.prisma.partnerModel.findFirst({
			where: { id: query.id },
			select: {
				id: true,
				fullname: true,
				phone: true,
				balance: true,
				whereFrom: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},
		})

		return partner
	}

	async countFindMany(query: PartnerFindManyRequest) {
		const partnersCount = await this.prisma.partnerModel.count({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
			},
		})

		return partnersCount
	}

	async countFindManyProvider(query: PartnerFindManyRequest) {
		const partnerRole = await this.prisma.partnerRoleModel.findFirst({ where: { name: PartnerRoleEnum.provider } })

		const partnersCount = await this.prisma.partnerModel.count({
			where: {
				id: { in: query.ids },
				fullname: query.fullname,
				roles: { some: { id: partnerRole.id } },
			},
		})

		return partnersCount
	}

	async getMany(query: PartnerGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const partners = await this.prisma.partnerModel.findMany({
			where: { id: { in: query.ids }, fullname: query.fullname },
			...paginationOptions,
		})

		return partners
	}

	async getOne(query: PartnerGetOneRequest) {
		const partner = await this.prisma.partnerModel.findFirst({
			where: { id: query.id, fullname: query.fullname, phone: query.phone },
			select: { id: true, balance: true, createdAt: true, fullname: true, phone: true, roles: true, token: true },
		})

		return partner
	}

	async countGetMany(query: PartnerGetManyRequest) {
		const partnersCount = await this.prisma.partnerModel.count({
			where: { id: { in: query.ids }, fullname: query.fullname },
		})

		return partnersCount
	}

	async createOne(body: PartnerCreateOneRequest) {
		const rolesToConnect = body.actionsToConnect.length
			? await this.prisma.staffRoleModel.findMany({
					where: { actions: { some: { id: { in: body.actionsToConnect } } } },
				})
			: []

		const partner = await this.prisma.partnerModel.create({
			data: {
				fullname: body.fullname,
				whereFrom: body.whereFrom,
				password: body.password,
				phone: body.phone,
				roles: { connect: rolesToConnect.map((r) => ({ id: r.id })) },
				actions: { connect: body.actionsToConnect.map((r) => ({ id: r })) },
			},
		})
		return partner
	}

	async updateOne(query: PartnerGetOneRequest, body: PartnerUpdateOneRequest) {
		const user = await this.prisma.partnerModel.findFirst({ where: { id: query.id }, select: { actions: true, roles: true } })

		const currentActionIds = user.actions.map((a) => a.id)

		const actionIdsToConnect = [...currentActionIds.filter((id) => !body.actionsToDisconnect.includes(id)), ...body.actionsToConnect]

		const rolesToConnect = (
			await this.prisma.partnerRoleModel.findMany({
				where: { actions: { some: { id: { in: actionIdsToConnect } } } },
			})
		).map((r) => r.id)

		const rolesToDisconnect = (
			await this.prisma.partnerRoleModel.findMany({
				where: { actions: { some: { id: { in: body.actionsToDisconnect } } } },
			})
		)
			.map((r) => r.id)
			.filter((r) => !rolesToConnect.includes(r))

		const partner = await this.prisma.partnerModel.update({
			where: { id: query.id },
			data: {
				balance: body.balance,
				fullname: body.fullname,
				whereFrom: body.whereFrom,
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

		return partner
	}

	async deleteOne(query: PartnerDeleteOneRequest) {
		const partner = await this.prisma.partnerModel.delete({
			where: { id: query.id },
		})

		return partner
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(PartnerController)
	}
}

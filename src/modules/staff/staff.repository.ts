import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '@shared'
import {
	StaffGetOneRequest,
	StaffCreateOneRequest,
	StaffUpdateOneRequest,
	StaffDeleteOneRequest,
	StaffGetManyRequest,
	StaffFindOneRequest,
	StaffFindManyRequest,
} from './interfaces'
import { deletedAtConverter } from '@common'
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
				deletedAt: deletedAtConverter(query.isDeleted),
				OR: [
					{ phone: { contains: query.phone, mode: 'insensitive' } },
					{ name: { contains: query.name, mode: 'insensitive' } },
					{ phone: { contains: query.search, mode: 'insensitive' } },
					{ name: { contains: query.search, mode: 'insensitive' } },
				],
			},
			...paginationOptions,
		})

		return staffs
	}

	async findOne(query: StaffFindOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: {
				id: query.id,
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { contains: query.phone, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
			},
			select: { id: true, createdAt: true, deletedAt: true, token: true, name: true, phone: true, updatedAt: true },
		})

		return staff
	}

	async countFindMany(query: StaffFindManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				OR: [
					{ phone: { contains: query.phone, mode: 'insensitive' } },
					{ name: { contains: query.name, mode: 'insensitive' } },
					{ phone: { contains: query.search, mode: 'insensitive' } },
					{ name: { contains: query.search, mode: 'insensitive' } },
				],
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
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: query.phone,
				name: query.name,
			},
			...paginationOptions,
		})

		return staffs
	}

	async getOne(query: StaffGetOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: {
				id: query.id,
				phone: { contains: query.phone },
				name: query.name,
				token: query.token,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return staff
	}

	async countGetMany(query: StaffGetManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: {
				id: { in: query.ids },
				phone: query.phone,
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return staffsCount
	}

	async createOne(body: StaffCreateOneRequest) {
		const company = await this.prisma.companyModel.findFirst({ where: { id: body.companyId } })

		const staff = await this.prisma.staffModel.create({
			data: {
				phone: body.phone,
				name: body.name,
				password: body.password,
				role: body.role,
				companyId: body.companyId,
				sheetId: company.sheetId,
			},
		})
		return staff
	}

	async updateOne(query: StaffGetOneRequest, body: StaffUpdateOneRequest) {
		const company = await this.prisma.companyModel.findFirst({ where: { id: body.companyId } })

		const staff = await this.prisma.staffModel.update({
			where: { id: query.id },
			data: {
				phone: body.phone,
				name: body.name,
				password: body.password,
				deletedAt: body.deletedAt,
				token: body.token,
				botAccess: body.botAccess,
				companyId: body.companyId,
				telegramId: body.telegramId,
				role: body.role,
				sheetId: body.companyId ? company.sheetId : undefined,
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

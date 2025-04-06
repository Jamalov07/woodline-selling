import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '@shared'
import {
	StaffGetOneRequest,
	StaffCreateOneRequest,
	StaffCreateManyRequest,
	StaffUpdateOneRequest,
	StaffUpdateManyRequest,
	StaffDeleteOneRequest,
	StaffDeleteManyRequest,
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
				phone: { contains: query.phone, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
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
				phone: { contains: query.phone, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
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
				phone: { contains: query.phone },
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
				phone: { contains: query.phone },
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return staffsCount
	}

	async createOne(body: StaffCreateOneRequest) {
		const staff = await this.prisma.staffModel.create({
			data: {
				phone: body.phone,
				name: body.name,
				password: body.password,
				hashedPassword: body.password,
				role: 'a',
				sheetId: 'a',
				botAccess: true,
				companyId: 'a',
			},
		})
		return staff
	}

	async createMany(body: StaffCreateManyRequest) {
		const staffs = await this.prisma.staffModel.createMany({
			data: body.datas.map((u) => ({
				phone: u.phone,
				name: u.name,
				password: u.password,
				hashedPassword: u.password,
				role: 'a',
				sheetId: 'a',
				botAccess: true,
				companyId: 'a',
			})),
		})

		return staffs
	}

	async updateOne(query: StaffGetOneRequest, body: StaffUpdateOneRequest) {
		const staff = await this.prisma.staffModel.update({
			where: { id: query.id },
			data: {
				phone: body.phone,
				name: body.name,
				password: body.password,
				deletedAt: body.deletedAt,
				token: body.token,
			},
		})

		return staff
	}

	async updateMany(body: StaffUpdateManyRequest) {
		const staffs = await this.prisma.staffModel.updateMany({
			where: { id: { in: body.ids } },
			data: { deletedAt: body.deletedAt },
		})

		return staffs
	}

	async deleteOne(query: StaffDeleteOneRequest) {
		const staff = await this.prisma.staffModel.delete({
			where: { id: query.id },
		})
		return staff
	}

	async deleteMany(query: StaffDeleteManyRequest) {
		const staffs = await this.prisma.staffModel.deleteMany({
			where: { id: { in: query.ids } },
		})
		return staffs
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StaffController)
	}
}

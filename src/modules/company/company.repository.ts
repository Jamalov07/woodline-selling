import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	CompanyCreateOneRequest,
	CompanyDeleteOneRequest,
	CompanyFindManyRequest,
	CompanyFindOneRequest,
	CompanyGetManyRequest,
	CompanyGetOneRequest,
	CompanyUpdateOneRequest,
} from './interfaces'
import { CompanyController } from './company.controller'
import { deletedAtConverter } from '../../common'

@Injectable()
export class CompanyRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: CompanyFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const companys = await this.prisma.companyModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sheetId: { contains: query.sheetId, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
			},
			...paginationOptions,
		})

		return companys
	}

	async findOne(query: CompanyFindOneRequest) {
		const company = await this.prisma.companyModel.findFirst({
			where: {
				id: query.id,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
			select: { id: true, createdAt: true, deletedAt: true, name: true, sheetId: true, updatedAt: true },
		})

		return company
	}

	async countFindMany(query: CompanyFindManyRequest) {
		const companysCount = await this.prisma.companyModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sheetId: { contains: query.sheetId, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return companysCount
	}

	async getMany(query: CompanyGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const companys = await this.prisma.companyModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sheetId: query.sheetId,
				name: query.name,
			},
			...paginationOptions,
		})

		return companys
	}

	async getOne(query: CompanyGetOneRequest) {
		const company = await this.prisma.companyModel.findFirst({
			where: {
				id: query.id,
				sheetId: query.sheetId,
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return company
	}

	async countGetMany(query: CompanyGetManyRequest) {
		const companysCount = await this.prisma.companyModel.count({
			where: {
				id: { in: query.ids },
				sheetId: query.sheetId,
				name: query.name,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return companysCount
	}

	async createOne(body: CompanyCreateOneRequest) {
		const company = await this.prisma.companyModel.create({
			data: {
				sheetId: body.sheetId,
				name: body.name,
			},
		})
		return company
	}

	async updateOne(query: CompanyGetOneRequest, body: CompanyUpdateOneRequest) {
		const company = await this.prisma.companyModel.update({
			where: { id: query.id },
			data: {
				name: body.name,
				sheetId: body.sheetId,
				deletedAt: body.deletedAt,
			},
		})

		return company
	}

	async deleteOne(query: CompanyDeleteOneRequest) {
		const company = await this.prisma.companyModel.delete({
			where: { id: query.id },
		})
		return company
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(CompanyController)
	}
}

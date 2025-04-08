import { BadRequestException, Injectable } from '@nestjs/common'
import { CompanyRepository } from './company.repository'
import { createResponse } from '../../common'
import {
	CompanyCreateOneRequest,
	CompanyDeleteOneRequest,
	CompanyFindManyRequest,
	CompanyFindOneRequest,
	CompanyGetManyRequest,
	CompanyGetOneRequest,
	CompanyUpdateOneRequest,
} from './interfaces'

@Injectable()
export class CompanyService {
	private readonly companyRepository: CompanyRepository
	constructor(companyRepository: CompanyRepository) {
		this.companyRepository = companyRepository
	}

	async findMany(query: CompanyFindManyRequest) {
		const companys = await this.companyRepository.findMany(query)
		const companysCount = await this.companyRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: companysCount,
					pagesCount: Math.ceil(companysCount / query.pageSize),
					pageSize: companys.length,
					data: companys,
				}
			: { data: companys }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: CompanyFindOneRequest) {
		const company = await this.companyRepository.findOne(query)

		if (!company) {
			throw new BadRequestException('company not found')
		}
		return createResponse({ data: { ...company }, success: { messages: ['find one success'] } })
	}

	async getMany(query: CompanyGetManyRequest) {
		const companys = await this.companyRepository.getMany(query)
		const companysCount = await this.companyRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(companysCount / query.pageSize),
					pageSize: companys.length,
					data: companys,
				}
			: { data: companys }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: CompanyGetOneRequest) {
		const company = await this.companyRepository.getOne(query)

		if (!company) {
			throw new BadRequestException('company not found')
		}

		return createResponse({ data: company, success: { messages: ['get one success'] } })
	}

	async createOne(body: CompanyCreateOneRequest) {
		const candidate = await this.companyRepository.getOne({ name: body.name })
		if (candidate) {
			throw new BadRequestException('phone already exists')
		}

		const company = await this.companyRepository.createOne({ ...body })

		return createResponse({ data: company, success: { messages: ['create one success'] } })
	}

	async updateOne(query: CompanyGetOneRequest, body: CompanyUpdateOneRequest) {
		await this.getOne(query)

		if (body.name) {
			const candidate = await this.companyRepository.getOne({ name: body.name })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('name already exists')
			}
		}

		await this.companyRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: CompanyDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.companyRepository.deleteOne(query)
		} else {
			await this.companyRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

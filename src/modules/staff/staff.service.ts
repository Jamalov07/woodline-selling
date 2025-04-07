import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { StaffRepository } from './staff.repository'
import { createResponse } from '@common'
import {
	StaffGetOneRequest,
	StaffCreateOneRequest,
	StaffUpdateOneRequest,
	StaffDeleteOneRequest,
	StaffGetManyRequest,
	StaffFindManyRequest,
	StaffFindOneRequest,
} from './interfaces'

@Injectable()
export class StaffService {
	private readonly staffRepository: StaffRepository

	constructor(staffRepository: StaffRepository) {
		this.staffRepository = staffRepository
	}

	async findMany(query: StaffFindManyRequest) {
		const staffs = await this.staffRepository.findMany(query)
		const staffsCount = await this.staffRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: staffsCount,
					pagesCount: Math.ceil(staffsCount / query.pageSize),
					pageSize: staffs.length,
					data: staffs,
				}
			: { data: staffs }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: StaffFindOneRequest) {
		const staff = await this.staffRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('staff not found')
		}
		delete staff.token
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: StaffGetManyRequest) {
		const staffs = await this.staffRepository.getMany(query)
		const staffsCount = await this.staffRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(staffsCount / query.pageSize),
					pageSize: staffs.length,
					data: staffs,
				}
			: { data: staffs }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: StaffGetOneRequest) {
		const staff = await this.staffRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('staff not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: StaffCreateOneRequest) {
		const candidate = await this.staffRepository.getOne({ phone: body.phone })
		if (candidate) {
			throw new BadRequestException('phone already exists')
		}

		const password = await bcrypt.hash(body.password, 7)

		const staff = await this.staffRepository.createOne({ ...body, password: password })

		return createResponse({ data: staff, success: { messages: ['create one success'] } })
	}

	async updateOne(query: StaffGetOneRequest, body: StaffUpdateOneRequest) {
		await this.getOne(query)

		if (body.phone) {
			const candidate = await this.staffRepository.getOne({ phone: body.phone })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('phone already exists')
			}
		}

		if (body.name) {
			const candidate = await this.staffRepository.getOne({ name: body.name })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('name already exists')
			}
		}

		await this.staffRepository.updateOne(query, { ...body, password: body.password ? await bcrypt.hash(body.password, 7) : undefined })

		const result = await this.findMany({})

		return createResponse({ data: result.data, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: StaffDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.staffRepository.deleteOne(query)
		} else {
			await this.staffRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

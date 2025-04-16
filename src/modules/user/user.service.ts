import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from './user.repository'
import { createResponse } from '@common'
import { UserGetOneRequest, UserCreateOneRequest, UserUpdateOneRequest, UserDeleteOneRequest, UserGetManyRequest, UserFindManyRequest, UserFindOneRequest } from './interfaces'

@Injectable()
export class UserService {
	private readonly userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async findMany(query: UserFindManyRequest) {
		const users = await this.userRepository.findMany(query)
		const usersCount = await this.userRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: usersCount,
					pagesCount: Math.ceil(usersCount / query.pageSize),
					pageSize: users.length,
					data: users,
				}
			: { data: users }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: UserFindOneRequest) {
		const user = await this.userRepository.findOne(query)

		if (!user) {
			throw new BadRequestException('user not found')
		}
		delete user.token
		return createResponse({ data: { ...user, actionIds: user.actions.map((a) => a.id), actions: undefined }, success: { messages: ['find one success'] } })
	}

	async getMany(query: UserGetManyRequest) {
		const users = await this.userRepository.getMany(query)
		const usersCount = await this.userRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(usersCount / query.pageSize),
					pageSize: users.length,
					data: users,
				}
			: { data: users }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: UserGetOneRequest) {
		const user = await this.userRepository.getOne(query)

		if (!user) {
			throw new BadRequestException('user not found')
		}

		return createResponse({ data: user, success: { messages: ['get one success'] } })
	}

	async createOne(body: UserCreateOneRequest) {
		const candidate = await this.userRepository.getOne({ phone: body.phone })
		if (candidate) {
			throw new BadRequestException('phone already exists')
		}

		const candidate2 = await this.userRepository.getOne({ username: body.username })
		if (candidate2) {
			throw new BadRequestException('username already exists')
		}

		const password = await bcrypt.hash(body.password, 7)

		await this.userRepository.createOne({ ...body, password: password })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: UserGetOneRequest, body: UserUpdateOneRequest) {
		await this.getOne(query)

		if (body.phone) {
			const candidate = await this.userRepository.getOne({ phone: body.phone })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('phone already exists')
			}
		}

		await this.userRepository.updateOne(query, { ...body, password: body.password ? await bcrypt.hash(body.password, 7) : undefined })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: UserDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			await this.userRepository.deleteOne(query)
		} else {
			await this.userRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}

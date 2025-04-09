import { Injectable } from '@nestjs/common'
import { ModelRepository } from './model.repository'
import { PrismaService } from '../shared'

@Injectable()
export class ModelService {
	private readonly modelRepository: ModelRepository
	private readonly prisma: PrismaService
	constructor(modelRepository: ModelRepository, prisma: PrismaService) {
		this.modelRepository = modelRepository
		this.prisma = prisma
	}
}

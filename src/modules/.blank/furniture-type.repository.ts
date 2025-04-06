import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'

@Injectable()
export class FurnitureTypeRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}
}

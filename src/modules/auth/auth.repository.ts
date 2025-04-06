import { Injectable } from '@nestjs/common'
import { PrismaService } from '@shared'
import { StaffSignInRequest } from './interfaces'

@Injectable()
export class AuthRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findOneStaff(body: StaffSignInRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: { name: body.name },
			select: {
				id: true,
				name: true,
				password: true,
				phone: true,
				createdAt: true,
				deletedAt: true,
				updatedAt: true,
				companyId: true,
				role: true,
				sheetId: true,
			},
		})
		
		return staff
	}
}

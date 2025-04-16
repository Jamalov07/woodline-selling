import { Injectable } from '@nestjs/common'
import { PrismaService } from '@shared'
import { UserSignInRequest } from './interfaces'

@Injectable()
export class AuthRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findOneUser(body: UserSignInRequest) {
		const user = await this.prisma.userModel.findFirst({
			where: { username: body.username },
			select: {
				id: true,
				fullname: true,
				password: true,
				phone: true,
				createdAt: true,
				deletedAt: true,
				updatedAt: true,
			},
		})

		return user
	}
}

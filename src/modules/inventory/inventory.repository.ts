import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	InventoryCreateOneRequest,
	InventoryDeleteOneRequest,
	InventoryFindManyRequest,
	InventoryFindOneRequest,
	InventoryGetManyRequest,
	InventoryGetOneRequest,
	InventoryUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { InventoryController } from './inventory.controller'
import { InventoryStatusEnum, InventoryTypeEnum, SPStatusEnum } from '@prisma/client'

@Injectable()
export class InventoryRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: InventoryFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const inventorys = await this.prisma.inventoryModel.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
			select: {
				id: true,
				createdAt: true,
				fromStorekeeper: true,
				toStorekeeper: true,
				fromWarehouse: true,
				toWarehouse: true,
				provider: true,
				status: true,
				type: true,
				products: {
					select: {
						id: true,
						productId: true,
						createdAt: true,
						statuses: { select: { id: true, quantity: true, status: true } },
					},
				},
			},
			...paginationOptions,
		})

		return inventorys
	}

	async findOne(query: InventoryFindOneRequest) {
		const staff = await this.prisma.inventoryModel.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				createdAt: true,
				fromStorekeeper: true,
				toStorekeeper: true,
				fromWarehouse: true,
				toWarehouse: true,
				provider: true,
				status: true,
				type: true,
				products: {
					select: {
						id: true,
						productId: true,
						createdAt: true,
						statuses: { select: { id: true, quantity: true, status: true } },
					},
				},
			},
		})

		return staff
	}

	async countFindMany(query: InventoryFindManyRequest) {
		const inventoryCount = await this.prisma.inventoryModel.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return inventoryCount
	}

	async getMany(query: InventoryGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const inventorys = await this.prisma.inventoryModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
			...paginationOptions,
		})

		return inventorys
	}

	async getOne(query: InventoryGetOneRequest) {
		const staff = await this.prisma.inventoryModel.findFirst({
			where: {
				id: query.id,
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return staff
	}

	async countGetMany(query: InventoryGetManyRequest) {
		const inventoryCount = await this.prisma.inventoryModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				fromStorekeeperId: query.fromStorekeeperId,
				fromWarehouseId: query.fromWarehouseId,
				providerId: query.providerId,
				toStorekeeperId: query.toStorekeeperId,
				toWarehouseId: query.toWarehouseId,
				status: query.status,
				type: query.type,
			},
		})

		return inventoryCount
	}

	async createOne(body: InventoryCreateOneRequest) {
		const inventory = await this.prisma.inventoryModel.create({
			data: {
				fromStorekeeperId: body.fromStorekeeperId,
				fromWarehouseId: body.fromWarehouseId,
				providerId: body.providerId,
				toStorekeeperId: body.toStorekeeperId,
				toWarehouseId: body.toWarehouseId,
				status: body.status,
				type: body.type,
			},
		})

		for (const pr of body.products) {
			await this.prisma.iPModel.create({
				data: {
					productId: pr.productId,
					inventoryId: inventory.id,
					statuses: {
						createMany: {
							skipDuplicates: true,
							data: pr.statuses.map((s) => ({ status: s.name, quantity: s.quantity })),
						},
					},
				},
			})
		}

		return inventory
	}

	async updateOne(query: InventoryGetOneRequest, body: InventoryUpdateOneRequest) {
		const inventory = await this.prisma.inventoryModel.update({
			where: { id: query.id },
			data: {
				deletedAt: body.deletedAt,
				fromStorekeeperId: body.fromStorekeeperId,
				fromWarehouseId: body.fromWarehouseId,
				providerId: body.providerId,
				toStorekeeperId: body.toStorekeeperId,
				toWarehouseId: body.toWarehouseId,
				status: body.status,
				type: body.type,
			},
		})

		if (body.productStatusIdsToDelete?.length) {
			await this.prisma.iPStatusModel.deleteMany({ where: { id: { in: body.productStatusIdsToDelete } } })
		}

		if (body.productIdsToDelete?.length) {
			await this.prisma.iPModel.deleteMany({ where: { id: { in: body.productIdsToDelete } } })
		}

		for (const pr of body.products || []) {
			await this.prisma.iPModel.create({
				data: {
					productId: pr.productId,
					inventoryId: inventory.id,
					statuses: {
						createMany: {
							skipDuplicates: true,
							data: pr.statuses.map((s) => ({ status: s.name, quantity: s.quantity })),
						},
					},
				},
			})
		}

		if (inventory.status === InventoryStatusEnum.accepted) {
			const invent = await this.findOne({ id: inventory.id })

			//purchase
			if (inventory.type === InventoryTypeEnum.purchase) {
				for (const pr of invent.products) {
					let storehouseProduct = await this.prisma.sPModel.findFirst({ where: { storehouseId: inventory.toWarehouseId, productId: pr.productId } })
					if (!storehouseProduct) {
						storehouseProduct = await this.prisma.sPModel.create({
							data: {
								storehouseId: inventory.toWarehouseId,
								productId: pr.productId,
								statuses: {
									createMany: { skipDuplicates: false, data: pr.statuses.map((s) => ({ quantity: s.quantity, status: s.status })) },
								},
							},
						})
					} else {
						for (const status of pr.statuses) {
							let newSt = await this.prisma.sPStatusModel.findFirst({ where: { spId: storehouseProduct.id, status: status.status } })
							if (newSt) {
								await this.prisma.sPStatusModel.update({ where: { id: newSt.id }, data: { quantity: newSt.quantity + status.quantity } })
							} else {
								newSt = await this.prisma.sPStatusModel.create({ data: { status: status.status, quantity: status.quantity, spId: storehouseProduct.id } })
							}
						}
					}
				}

				//selling
			} else if (inventory.type === InventoryTypeEnum.selling) {
				for (const pr of invent.products) {
					const storehouseProduct = await this.prisma.sPModel.findFirst({ where: { storehouseId: inventory.toWarehouseId, productId: pr.productId } })
					if (!storehouseProduct) {
						throw new BadRequestException('product not found in storehouse')
					} else {
						for (const status of pr.statuses) {
							const newSt = await this.prisma.sPStatusModel.findFirst({ where: { spId: storehouseProduct.id, status: status.status } })
							if (newSt) {
								if (!(newSt.quantity - status.quantity)) {
									throw new BadRequestException('product not enough in stehouse')
								} else {
									await this.prisma.sPStatusModel.update({ where: { id: newSt.id }, data: { quantity: newSt.quantity - status.quantity } })
									await this.prisma.sPStatusModel.create({ data: { quantity: status.quantity, status: SPStatusEnum.sold, spId: storehouseProduct.id } })
								}
							} else {
								throw new BadRequestException('product with this status not found in storehouse')
							}
						}
					}
				}

				//transfer
			} else {
				for (const pr of invent.products) {
					const fromSP = await this.prisma.sPModel.findFirst({ where: { storehouseId: invent.fromWarehouse.id, productId: pr.productId } })
					if (!fromSP) {
						throw new BadRequestException('product not found in storehouse')
					}
					let toSP = await this.prisma.sPModel.findFirst({ where: { storehouseId: invent.toWarehouse.id, productId: pr.productId } })
					if (!toSP) {
						toSP = await this.prisma.sPModel.create({
							data: {
								productId: pr.productId,
								storehouseId: invent.toWarehouse.id,
								statuses: {
									createMany: { skipDuplicates: false, data: pr.statuses.map((s) => ({ quantity: s.quantity, status: s.status })) },
								},
							},
						})
					} else {
						for (const st of pr.statuses) {
							let toSt = await this.prisma.sPStatusModel.findFirst({ where: { spId: toSP.id, status: st.status } })
							const fromSt = await this.prisma.sPStatusModel.findFirst({ where: { spId: fromSP.id, status: st.status } })
							if (!fromSt) {
								throw new BadRequestException('product with this status not found')
							}
							if (toSt) {
								await this.prisma.sPStatusModel.update({ where: { id: toSt.id }, data: { quantity: toSt.quantity + st.quantity } })
							} else {
								toSt = await this.prisma.sPStatusModel.create({ data: { status: st.status, quantity: st.quantity, spId: toSP.id } })
							}
							await this.prisma.sPStatusModel.update({ where: { id: fromSt.id }, data: { quantity: fromSt.quantity - st.quantity } })
						}
					}
				}
			}
		}

		return inventory
	}

	async deleteOne(query: InventoryDeleteOneRequest) {
		const inventory = await this.prisma.inventoryModel.delete({
			where: { id: query.id },
		})
		return inventory
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(InventoryController)
	}
}

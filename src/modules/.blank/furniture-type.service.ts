import { Injectable } from '@nestjs/common'
import { FurnitureTypeRepository } from './furniture-type.repository'

@Injectable()
export class FurnitureTypeService {
	private readonly furnitureTypeRepository: FurnitureTypeRepository
	constructor(furnitureTypeRepository: FurnitureTypeRepository) {
		this.furnitureTypeRepository = furnitureTypeRepository
	}
}

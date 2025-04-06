import { Controller } from '@nestjs/common'
import { FurnitureTypeService } from './furniture-type.service'

@Controller('furniture-type')
export class FurnitureTypeController {
	private readonly furnitureTypeService: FurnitureTypeService
	constructor(furnitureTypeService: FurnitureTypeService) {
		this.furnitureTypeService = furnitureTypeService
	}
}

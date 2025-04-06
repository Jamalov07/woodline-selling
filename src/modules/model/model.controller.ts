import { Controller } from '@nestjs/common'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
	private readonly modelService: ModelService
	constructor(modelService: ModelService) {
		this.modelService = modelService
	}
}

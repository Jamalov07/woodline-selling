import { Injectable } from '@nestjs/common'
import { ModelRepository } from './model.repository'

@Injectable()
export class ModelService {
	private readonly modelRepository: ModelRepository
	constructor(modelRepository: ModelRepository) {
		this.modelRepository = modelRepository
	}
}

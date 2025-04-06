import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { ModelController } from './model.controller'
import { ModelService } from './model.service'
import { ModelRepository } from './model.repository'

@Module({
	imports: [PrismaModule],
	controllers: [ModelController],
	providers: [ModelService, ModelRepository],
	exports: [ModelService, ModelRepository],
})
export class ModelModule {}

import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { DeliveryController } from './delivery.controller'
import { DeliveryService } from './delivery.service'
import { DeliveryRepository } from './delivery.repository'

@Module({
	imports: [PrismaModule],
	controllers: [DeliveryController],
	providers: [DeliveryService, DeliveryRepository],
	exports: [DeliveryService, DeliveryRepository],
})
export class DeliveryModule {}

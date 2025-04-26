import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { OrderRepository } from './order.repository'
import { PartnerModule } from '../partner'

@Module({
	imports: [PrismaModule, PartnerModule],
	controllers: [OrderController],
	providers: [OrderService, OrderRepository],
	exports: [OrderService, OrderRepository],
})
export class OrderModule {}

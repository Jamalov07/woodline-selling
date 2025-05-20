import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { OrderSPStatusController } from './order-sp-status.controller'
import { OrderSPStatusService } from './order-sp-status.service'
import { OrderSPStatusRepository } from './order-sp-status.repository'
import { StaffModule } from '../staff'

@Module({
	imports: [PrismaModule, StaffModule],
	controllers: [OrderSPStatusController],
	providers: [OrderSPStatusService, OrderSPStatusRepository],
	exports: [OrderSPStatusService, OrderSPStatusRepository],
})
export class OrderSPStatusModule {}

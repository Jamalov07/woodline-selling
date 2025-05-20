import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { CartSPStatusController } from './cart-sp-status.controller'
import { CartSPStatusService } from './cart-sp-status.service'
import { CartSPStatusRepository } from './cart-sp-status.repository'
import { StaffModule } from '../staff'

@Module({
	imports: [PrismaModule, StaffModule],
	controllers: [CartSPStatusController],
	providers: [CartSPStatusService, CartSPStatusRepository],
	exports: [CartSPStatusService, CartSPStatusRepository],
})
export class CartSPStatusModule {}

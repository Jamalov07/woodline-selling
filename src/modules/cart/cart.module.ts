import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { CartRepository } from './cart.repository'

@Module({
	imports: [PrismaModule],
	controllers: [CartController],
	providers: [CartService, CartRepository],
	exports: [CartService, CartRepository],
})
export class CartModule {}

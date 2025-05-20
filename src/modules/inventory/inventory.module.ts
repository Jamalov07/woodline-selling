import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { InventoryController } from './inventory.controller'
import { InventoryService } from './inventory.service'
import { InventoryRepository } from './inventory.repository'

@Module({
	imports: [PrismaModule],
	controllers: [InventoryController],
	providers: [InventoryService, InventoryRepository],
	exports: [InventoryService, InventoryRepository],
})
export class InventoryModule {}

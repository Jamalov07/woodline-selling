import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { StaffController } from './staff.controller'
import { StaffService } from './staff.service'
import { StaffRepository } from './staff.repository'

@Module({
	imports: [PrismaModule],
	controllers: [StaffController],
	providers: [StaffService, StaffRepository],
	exports: [StaffService, StaffRepository],
})
export class StaffModule {}

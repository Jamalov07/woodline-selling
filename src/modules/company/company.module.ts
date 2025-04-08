import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyRepository } from './company.repository'

@Module({
	imports: [PrismaModule],
	controllers: [CompanyController],
	providers: [CompanyService, CompanyRepository],
	exports: [CompanyService, CompanyRepository],
})
export class CompanyModule {}

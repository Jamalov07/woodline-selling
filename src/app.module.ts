import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ActionModule, AuthModule, ClientModule, CompanyModule, CronModule, ExcelModule, FurnitureTypeModule, ModelModule, PrismaModule, StaffModule } from '@module'
import { appConfig, databaseConfig, jwtConfig } from '@config'
import { AuthGuard, CheckPermissionGuard } from '@common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, databaseConfig, jwtConfig],
		}),
		PrismaModule,
		StaffModule,
		FurnitureTypeModule,
		ClientModule,
		CompanyModule,
		ModelModule,
		AuthModule,
		ActionModule,
		CronModule,
		ExcelModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	ActionModule,
	AuthModule,
	CartModule,
	CronModule,
	ExcelModule,
	FurnitureTypeModule,
	ModelModule,
	OrderModule,
	PartnerModule,
	PrismaModule,
	RoleModule,
	StaffModule,
} from '@module'
import { appConfig, databaseConfig, jwtConfig } from '@config'
import { AuthGuard, CheckPermissionGuard } from '@common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, databaseConfig, jwtConfig],
		}),
		PrismaModule,
		ActionModule,
		AuthModule,
		FurnitureTypeModule,
		ModelModule,
		PartnerModule,
		RoleModule,
		StaffModule,
		CartModule,
		OrderModule,
		CronModule,
		ExcelModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}

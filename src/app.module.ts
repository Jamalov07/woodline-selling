import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	ActionModule,
	AuthModule,
	CartModule,
	CronModule,
	ExcelModule,
	FurnitureTypeModule,
	GoogleSheetModule,
	ModelModule,
	OrderModule,
	OrderProductModule,
	PartnerModule,
	PaymentModule,
	PrismaModule,
	ProductModule,
	PublicIdModule,
	RoleModule,
	StaffModule,
	StorehouseModule,
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
		CartModule,
		FurnitureTypeModule,
		ModelModule,
		OrderModule,
		OrderProductModule,
		PartnerModule,
		PaymentModule,
		PublicIdModule,
		RoleModule,
		StaffModule,
		CronModule,
		ExcelModule,
		GoogleSheetModule,
		//2-version
		StorehouseModule,
		ProductModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}

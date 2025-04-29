import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import { google, sheets_v4 } from 'googleapis'
import { ConfigService } from '@nestjs/config'
import { OrderFindOneData } from '../../order'
import { OrderProductFindOneData } from '../../order-product'
import { PaymentFindOneData } from '../../payment'

@Injectable()
export class GoogleSheetService {
	private readonly prisma: PrismaService
	private sheets: sheets_v4.Sheets
	private readonly config: ConfigService

	constructor(prisma: PrismaService, config: ConfigService) {
		this.prisma = prisma
		this.config = config

		const auth = new google.auth.GoogleAuth({
			keyFile: JSON.stringify(this.config.get('google-credential')),
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		})

		this.sheets = google.sheets({ version: 'v4', auth })
	}

	async addOrderToSheet(order: OrderFindOneData, orderProducts: OrderProductFindOneData[], payments: PaymentFindOneData[]) {
		const spreadsheetId = '1fc1rbT1hA8sYz-R73AvzY-fgcwN4l0yGpd5Ks1vc8Jw'
		const sheetName = 'orders'
		const range = `${sheetName}!A:F`

		const res = await this.sheets.spreadsheets.get({ spreadsheetId })
		console.log(res.data.sheets.map((s) => s.properties.title))

		const existing = await this.sheets.spreadsheets.values.get({
			spreadsheetId: spreadsheetId,
			range: range,
		})

		const numRows = existing.data.values?.length || 0
		const nextRow = numRows + 1

		const rowData = [order.createdAt, order.client.fullname, order.client.phone, order.client.whereFrom, order.purchaseStatus]
		await this.sheets.spreadsheets.values.update({
			spreadsheetId,
			range: `${sheetName}!A${nextRow}`,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [rowData],
			},
		})
	}
}

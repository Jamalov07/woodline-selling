import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import { google, sheets_v4 } from 'googleapis'
import { OrderFindOneData } from '../../order'
import { OrderProductFindOneData } from '../../order-product'
import { PaymentFindOneData } from '../../payment'
import { join } from 'path'

@Injectable()
export class GoogleSheetService {
	private readonly prisma: PrismaService
	private sheets: sheets_v4.Sheets
	private readonly spreadSheetId: string

	constructor(prisma: PrismaService) {
		this.prisma = prisma

		const auth = new google.auth.GoogleAuth({
			keyFile: join(process.cwd(), 'credentials.json'),
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		})

		this.spreadSheetId = '1fc1rbT1hA8sYz-R73AvzY-fgcwN4l0yGpd5Ks1vc8Jw'
		this.sheets = google.sheets({ version: 'v4', auth })
	}

	async addOrderToSheet(order: OrderFindOneData, orderProducts: OrderProductFindOneData[], payments: PaymentFindOneData[]) {
		const sheetName = 'orders'
		const range = `${sheetName}!A:F`

		const existing = await this.sheets.spreadsheets.values.get({
			spreadsheetId: this.spreadSheetId,
			range: range,
		})

		const numRows = existing.data.values?.length || 0
		const nextRow = numRows + 1

		const rowData = [order.createdAt, order.client.fullname, order.client.phone, order.client.whereFrom, order.purchaseStatus]
		await this.sheets.spreadsheets.values.update({
			spreadsheetId: this.spreadSheetId,
			range: `${sheetName}!A${nextRow}`,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [rowData],
			},
		})
	}
}

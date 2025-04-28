import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import { google, sheets_v4 } from 'googleapis'

@Injectable()
export class GoogleSheetService {
	private readonly prisma: PrismaService
	// private sheets: sheets_v4.Sheets

	constructor(prisma: PrismaService) {
		this.prisma = prisma

		// const auth = new google.auth.GoogleAuth({
		// 	keyFile: 'path/to/your/credentials.json',
		// 	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		// })

		// this.sheets = google.sheets({ version: 'v4', auth })
	}

	async exportOrdersToSheet() {
		console.log('uu')
	}
}

import { Controller } from '@nestjs/common'
import { ClientService } from './client.service'

@Controller('client')
export class ClientController {
	private readonly clientService: ClientService
	constructor(clientService: ClientService) {
		this.clientService = clientService
	}
}

import { Injectable } from '@nestjs/common'
import { ClientRepository } from './client.repository'

@Injectable()
export class ClientService {
	private readonly clientRepository: ClientRepository
	constructor(clientRepository: ClientRepository) {
		this.clientRepository = clientRepository
	}
}

import { Injectable } from '@nestjs/common'
import { DeliveryRepository } from './delivery.repository'

@Injectable()
export class DeliveryService {
	private readonly deliveryRepository: DeliveryRepository
	constructor(deliveryRepository: DeliveryRepository) {
		this.deliveryRepository = deliveryRepository
	}
}

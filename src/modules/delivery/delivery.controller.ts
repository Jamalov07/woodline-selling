import { Controller } from '@nestjs/common'
import { DeliveryService } from './delivery.service'

@Controller('delivery')
export class DeliveryController {
	private readonly deliveryService: DeliveryService
	constructor(deliveryService: DeliveryService) {
		this.deliveryService = deliveryService
	}
}

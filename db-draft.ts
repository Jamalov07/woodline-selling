enum ProductMVType {
	storehouse,
	selling,
	purchase,
	transfer,
}

enum InventoryStatus {
	new,
	cancelled,
	accepted,
}

enum OrderProductType {
	standart,
	nonstandart,
}

enum ProductDirection {
	right,
	left,
	none,
}

enum OrderProductStatus {
	new,
	accepted,
	cancelled,
	sold,
	loaded,
	received,
}

enum StorehouseType {
	warehouse,
	showroom,
}

interface PublicId {
	id: string
}

interface Storehouse {
	name: string
	type: StorehouseType
}

interface ProductStatusMV {
	status: string
	quantity: number
	productMVId: string
}

interface ProductStatusBooking {
	quantity: number
	productStatusMvId: string
	staffId: string
}

interface ProductMV {
	type: ProductMVType
	productId: string
	statuses: ProductStatusMV[]

	sellingId?: string
	purchaseId?: string
	transferId?: string
	storehouseId?: string
}

interface Selling {
	fromStorekeeperId: string
	fromStorehouseId: string
	status: InventoryStatus

	products: ProductMV[]
}

interface Purchase {
	providerId: string
	toWarehouseId: string
	toStorekeeperId: string
	status: InventoryStatus

	products: ProductMV[]
}

interface Transfer {
	toWarehouseId: string
	fromWarehouseId: string
	toStorekeeperId: string
	fromStorekeeperId: string
	status: InventoryStatus

	products: ProductMV[]
}

interface Product {
	publicId: string
	modelId: string
	tissue: string
	quantity: number
	direction: ProductDirection
	description: string
}

interface NonStandartProduct {
	publicId: string
	tissue: string
	direction: ProductDirection
	quantity: number
	modelId: string
	description: string
}

interface Cart {
	type: OrderProductType

	spsId?: string
	nspId?: string

	quantity: number
	totatSum: number
	sale: number
	price: number
	priceWithSale: number
	description: string

	staffId: string
}

interface OrderProduct {
	type: OrderProductType

	spsId?: string
	nspId?: string

	quantity: number
	totatSum: number
	sale: number
	price: number
	priceWithSale: number
	description: string

	status: OrderProductStatus

	staffId: string
}

enum ClientPurchaseStatus {
	first,
	next,
}

interface Order {
	clientId: string
	staffId: string
	deliveryDate: Date
	deliveryAddress: string
	clientPurchaseStatus: ClientPurchaseStatus

	products: OrderProduct[]
}

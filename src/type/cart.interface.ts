export interface IAddCart {
	id?: number,
	productId: number;
	userId: number;
	total: number;
	price: number;
	productInventoryId: number;
}

export interface IOrder {
	id?: number;
	cartId: number;
	userAddressId: number;
	status?: string;
	userId?: number;
}

export enum ETime {
	MONTH = 'MONTH',
	YEAR = 'YEAR'
}

export interface IBody {
	[key: string]: string
}

export enum IStatus {
	ALL = 'all',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	PENDING = 'PENDING',
	APPROVED_BY_SHOP = 'APPROVED_BY_SHOP',
	REJECTED_BY_SHOP = 'REJECTED_BY_SHOP'
}
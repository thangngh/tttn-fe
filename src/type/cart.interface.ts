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
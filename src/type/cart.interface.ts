export interface IAddCart {
	id?: number,
	productId: number;
	userId: number;
	total: number;
	price: number;
	productInventoryId: number;
}
export interface IProduct {
	id?: number;
	name: string;
	description: string;
	categoryId?: number;
	categoryName?: string;
	discountId?: number;
	discountName?: string;
	createAt?: Date;
	modifiedAt?: Date;
	deletedAt?: Date;
	isActive?: boolean;
}

export interface ICreateProduct extends IProduct { }

export interface IUpdateProduct {
	id: number;
	name?: string;
	description?: string;
	categoryId?: number;
	discountId?: number;
	modifiedAt?: Date;
}

export interface IProductInventory {
	id?: number;
	productId: number;
	quantity: number;
	image?: string;
	price: number;
	createAt?: Date;
}

// export interface ICreateProductInventory {
// 	payload: IProductInventory,
// 	filesPath?: File
// }
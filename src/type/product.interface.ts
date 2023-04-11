export interface IProduct {
	id: number;
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
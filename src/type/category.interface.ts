export interface ICategory {
	id: number;
	name?: string;
	shopId?: number;
	shopName?: string;
	isActive?: boolean
	createAt?: Date;
	modifiedAt?: Date;
	deletedAt?: Date;
}

export interface ICreateCategory {

}

export interface IUpdateCategory {
	id: number;
	name?: string;
	modifiedAt?: Date;
}
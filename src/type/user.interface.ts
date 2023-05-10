export interface IUser {
	id?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	address?: any;
	phone?: string;
	email?: string;
	createAt?: Date;
	isActive: boolean;
	role: any;
	username: string;
}

export interface IUserAddress {
	id?: string;
	city?: string;
	district?: string;
	street?: string;
	country?: string;
	telephone?: string;
	isDefault?: boolean;
	userId?: string;
	user?: string
}

export interface IComment {
	lists?: Array<File>;
}

export interface IAddReview {
	productId?: string;
	userId?: number;
	rating?: number;
	createAt?: Date;
	updateAt?: Date;
	deletedAt?: Date;
	content: string;
}
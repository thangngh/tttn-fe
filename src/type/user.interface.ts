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
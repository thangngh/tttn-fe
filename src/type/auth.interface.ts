export interface ILogin {
	username: string;
	password: string;
}

export interface IRegister {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password?: string;
}
export enum IRole {
	ADMIN = 'ADMIN',
	CUSTOMER = 'CUSTOMER',
	SHOPPER = 'SHOPPER'
}

export interface ILoginGoogle {
	accessToken: string;
	googleAddress?: string;
}
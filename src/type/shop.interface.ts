
export interface IAddress {
	city: string;
	district: string;
	street: string;
	country: string;
}


export interface ICreateShop {
	name: string;
	description: string;
	phone: string;
	address: IAddress;
	userId: string;
}
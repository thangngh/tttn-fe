
export interface IRedirect {
	redirect: () => void;
}
export interface ILogin extends IRedirect {
	username: string;
	password: string;
}
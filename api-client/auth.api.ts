import { ILogin, ILoginGoogle, IRegister } from "@/type/auth.interface";
import { toast } from "react-toastify";
import axiosConfig from "./axios.config";

export const AuthAPI = {
	login: async (body: ILogin) => {
		const { username, password } = body;
		try {
			const response = await axiosConfig.post("/auth/login-user", { username, password });

			toast.success(response.data.message);

			if (response.data.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
			}
			return response;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	register: async (body: IRegister) => {
		const { firstName, lastName, email, username, password } = body;
		try {
			const response = await axiosConfig.post("/auth/register-user", { firstName, lastName, email, username, password });
			console.log("response", response)
			toast.success(response.data.message);

			return response;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	loginWithGoogle: async (body: ILoginGoogle) => {
		const { accessToken } = body;
		try {
			const response = await axiosConfig.post("/auth/login-google", { accessToken });
			console.log("response", response)
			toast.success(response.data.message);

			if (response.data.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
			}
			return response;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	}
}
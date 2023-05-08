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
	},

	sendMailResetPassword: async ({ email }: { email: string }) => {
		try {
			const response = await axiosConfig.post("/auth/send-mail-reset-password", { email });
			return response.data;
		} catch (error: any) {
			return error;
		}
	},

	resetPasswordWithVerifyToken: async ({
		password,
		token
	}: { password: string, token: string }) => {
		try {
			const response = await axiosConfig.patch("/auth/change-password-verify-token", { password, token });
			return response.data;
		} catch (error: any) {
			toast.error(error)
			return error;
		}
	},

	changePassword: async ({
		oldPassword,
		newPassword,
	}: {
		oldPassword: string;
		newPassword: string;
	}) => {
		try {
			const response = await axiosConfig.patch("/auth/change-password", { oldPassword, newPassword });
			toast.success(response.data.message)
			return response.data;
		} catch (error: any) {
			toast.error(error.message)
			return error;
		}
	},

	getTotalOrder: async () => {
		try {
			const response = await axiosConfig.get("/order/total-order");
			return response.data;
		} catch (error: any) {
			return error;
		}
	},

	getTotalUser: async () => {
		try {
			const response = await axiosConfig.get("/user/get-total-user");
			return response.data;
		}
		catch (error: any) {
			return error;
		}
	}

}
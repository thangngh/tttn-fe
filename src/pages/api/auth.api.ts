import { ILogin } from "@/type/auth.interface";
import { toast } from "react-toastify";
import axiosConfig from "./axios.config";

export const AuthAPI = {
	login: async (body: ILogin) => {
		const { username, password, redirect } = body;
		try {
			const response = await axiosConfig.post("/auth/login", { username, password });

			toast.success(response.data.message);

			if (response.data.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);

				await new Promise((resolve) => setTimeout(() => {
					redirect();
				}, 1000));
			}

		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},
	register: async () => {

	}
}
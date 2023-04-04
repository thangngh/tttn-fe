import { toast } from "react-toastify";
import axiosConfig from "./axios.config";

export const UserAPI = {
	getProfile: async () => {

	},
	getRole: async () => {
		try {
			const response = await axiosConfig.get("/user/get-role");
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	}
}
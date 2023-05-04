import { toast } from "react-toastify";
import axiosConfig from "./axios.config";

export const UserAPI = {
	getProfile: async () => {
		try {
			const response = await axiosConfig.get("/user/profile");
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getRole: async () => {
		try {
			const response = await axiosConfig.get("/user/get-role");
			return response.data;
		} catch (error: any) {
			return error;
		}
	},

	getAllUser: async ({ page, limit, role }: { page: number, limit: number, role?: string }) => {
		try {
			const response = await axiosConfig.get("/user/get-all", {
				params: {
					page,
					limit,
					role
				}
			});
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getOneUser: async () => {
		try {
			const response = await axiosConfig.get("/user/get-one");
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	editProfile: async (body: any) => {
		try {
			const response = await axiosConfig.patch("/user/edit-profile", body);
			return response.data;
		} catch (error: any) {
			return error;
		}
	},

	uploadAvatar: async ({ file }: { file: File }) => {
		if (!file) return null;
		try {
			const formData = new FormData();
			formData.append("image", file);
			const response = await axiosConfig.post(`/user/upload-avatar`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			})
			return response.data;
		} catch (error: any) {
			toast.error(error)
			return error;
		}
	},

	addReviewProduct: async () => {

	},

	getReviewProduct: async (productId: string) => {

	}
}
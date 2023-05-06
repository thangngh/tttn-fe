import { toast } from "react-toastify";
import axiosConfig from "./axios.config";
import { IUserAddress } from "@/type/user.interface";

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
			toast.success(response.data.message)
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

	},

	addAddressUser: async (body: IUserAddress) => {
		try {
			const response = await axiosConfig.post("/user-address/add-address-user", body);
			toast.success(response.data.message)
			return response.data;
		} catch (error: any) {
			toast.error(error)
			return error;
		}
	},

	getAddressUser: async () => {
		try {
			const response = await axiosConfig.get("/user-address/get-address-user");
			return response.data;
		} catch (error: any) {
			toast.error(error)
			return error;
		}
	}
}
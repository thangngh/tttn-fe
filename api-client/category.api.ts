import { ICreateCategory, IUpdateCategory } from "@/type/category.interface";
import axiosConfig from "./axios.config";
import { toast } from "react-toastify";

export const CategoryAPI = {
	createCategory: async (payload: ICreateCategory) => {
		try {
			const response = await axiosConfig.post("/category/create-category", payload);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},
	getCategoryByShop: async () => {
		try {
			const response = await axiosConfig.get("/category/get-all-category-shop");
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},
	updateCategory: async (payload: IUpdateCategory) => {
		const { id, name, modifiedAt } = payload
		try {
			const response = await axiosConfig.patch(`/category/update-category/${id}`, {
				name,
				modifiedAt
			});
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	}
}
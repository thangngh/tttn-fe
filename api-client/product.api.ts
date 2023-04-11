import { ICreateProduct } from "@/type/product.interface";
import axiosConfig from "./axios.config";
import { toast } from "react-toastify";

export const ProductAPI = {
	createProduct: async (payload: ICreateProduct) => {
		try {
			const response = await axiosConfig.post("/product/create", payload);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getAllProductWithShop: async ({ page, limit, role }: { page: number, limit: number, role?: string }) => {
		try {
			const response = await axiosConfig.get(`/product/get-all-product-with-shop`, {
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
}
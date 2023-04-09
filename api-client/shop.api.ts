import { ICreateShop } from "@/type/shop.interface";
import { toast } from "react-toastify";
import axiosConfig from "./axios.config";

export const ShopAPI = {
	createShop: async (payload: ICreateShop) => {
		try {
			const response = await axiosConfig.post("/shop/create-shop", payload);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getShopByUser: async () => {
		try {
			const response = await axiosConfig.get("/shop/shop-by-user");
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getShopById: async (shopId: string) => {
		try {
			const response = await axiosConfig.get(`/shop/shop/${shopId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	}
}
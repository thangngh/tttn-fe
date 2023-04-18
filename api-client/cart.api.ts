import { IAddCart } from "@/type/cart.interface";
import axiosConfig from "./axios.config";
import { toast } from "react-toastify";

export const CartAPI = {
	addProductToCart: async (body: IAddCart) => {
		const { productId, userId, total, price } = body;
		try {
			const response = await axiosConfig.post("/cart/add-cart", { productId, userId, total, price });
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	findAllProductCartUser: async () => {
		try {
			const response = await axiosConfig.get("/cart/get-cart");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},
}
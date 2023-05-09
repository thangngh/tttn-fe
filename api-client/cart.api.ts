import { ETime, IAddCart, IBody, IOrder, IStatus } from "@/type/cart.interface";
import axiosConfig from "./axios.config";
import { toast } from "react-toastify";

export const CartAPI = {
	addProductToCart: async (body: IAddCart) => {
		const { productId, userId, total, price, productInventoryId } = body;
		try {
			const response = await axiosConfig.post("/cart/add-cart", { productId, userId, total, price, productInventoryId });
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

	deleteProductToCart: async (cartId: string) => {
		try {
			const response = await axiosConfig.delete(`/cart/delete-cart/${cartId}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	createOrder: async (body: IOrder) => {
		try {
			const response = await axiosConfig.post("/order/create-order", body);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getOrderUser: async (status?: string) => {
		try {
			const response = await axiosConfig.get(`/order/get-order-user/${status}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getOrderShop: async () => {
		try {
			const response = await axiosConfig.get("/order/get-order-shop");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	approvedOrder: async (orderId: string) => {
		try {
			const response = await axiosConfig.patch(`/order/approved-order/${orderId}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	rejectOrder: async (orderId: string) => {
		try {
			const response = await axiosConfig.patch(`/order/reject-order/${orderId}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	totalOderShop: async () => {
		try {
			const response = await axiosConfig.get("/order/total-order-shop");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	totalFinanceShop: async () => {
		try {
			const response = await axiosConfig.get("/order/total-finance-shop");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	totalParticipantVisitShop: async () => {
		try {
			const response = await axiosConfig.get("/page-visit/participant-total-visit");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getUserNewOrder: async () => {
		try {
			const response = await axiosConfig.get("/order/user-order-product-in-shop");
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getTotalRejectAndApprovedInMonth: async (body: ETime) => {
		try {
			const response = await axiosConfig.get(`/order/total-group-reject-approved/${body}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	shopApprovedOrder: async (orderId: string) => {
		try {
			const response = await axiosConfig.post(`/order/approved-order-by-shop/${orderId}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);

			return error;
		}
	},

	shopRejectOrder: async (orderId: string) => {
		try {
			const response = await axiosConfig.post(`/order/reject-order-by-shop/${orderId}`);
			toast.success(response.data.message);

			return response.data;
		} catch (error: any) {
			toast.error(error.message);

			return error;
		}
	},
}
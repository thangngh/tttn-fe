import { ICreateProduct, IProductInventory, IUpdateProduct } from "@/type/product.interface";
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

	getAllProduct: async ({ page, limit, search, category }: { page: number, limit: number, search?: string, category?: string }) => {
		try {
			const response = await axiosConfig.get(`/product/get-all-product`, {
				params: {
					page,
					limit,
					search,
					category
				}
			});
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	updateProduct: async (payload: IUpdateProduct) => {
		const { id, name, description, categoryId, discountId, modifiedAt } = payload
		try {
			const response = await axiosConfig.patch(`/product/update-product/${id}`, {
				name,
				description,
				categoryId,
				discountId,
				modifiedAt
			});
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	deleteProduct: async (productId: string) => {
		try {
			const response = await axiosConfig.delete(`/product/delete-product/${productId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getOneProduct: async (productId: string) => {
		try {
			const response = await axiosConfig.get(`/product/get-product/${productId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	addProductInventory: async ({ productId, quantity, price, file }: { productId: string, quantity: string, price: string, file: File }) => {

		if (!file) return null;

		try {
			const formData = new FormData();

			formData.append("image", file);
			formData.append("productId", productId.toString());
			formData.append("quantity", quantity.toString());
			formData.append("price", price.toString());

			const response = await axiosConfig.post(`/product-inventory/create-product-inventory`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			})
			return response.data;
		} catch (error: any) {
			return error;
		}
	},

	getOneProductInventory: async (productInventoryId: string) => {
		try {
			const response = await axiosConfig.get(`/product-inventory/get-one/${productInventoryId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getProductWithShopId: async (shopId: string) => {
		try {
			const response = await axiosConfig.get(`/product/get-shop/${shopId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	productInMonth: async () => {
		try {
			const response = await axiosConfig.get(`/product/product-in-month`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	getProductByCategory: async (payload: { categoryName: string }) => {
		try {
			const response = await axiosConfig.get(`/product/product-with-category`, {
				params: payload
			});
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	},

	ownerShopProduct: async (productId: string) => {
		try {
			const response = await axiosConfig.get(`/product/is-shop-owner-product/${productId}`);
			return response.data;
		} catch (error: any) {
			toast.error(error.message);
			return error;
		}
	}
}
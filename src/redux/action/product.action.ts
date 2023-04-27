import { ICreateProduct, IProductInventory, IUpdateProduct } from "@/type/product.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductAPI } from "../../../api-client/product.api";

export const createProductAction = createAsyncThunk(
	"/product/create",
	async (payload: ICreateProduct) => {
		const response = await ProductAPI.createProduct(payload);
		return response;
	}
)

export const getAllProductWithShopAction = createAsyncThunk(
	"/product/get-all-shop",
	async ({ page, limit, role }: { page: number, limit: number, role?: string }) => {
		const response = await ProductAPI.getAllProductWithShop({ page, limit, role })
		return response;
	}
)

export const getAllProductAction = createAsyncThunk(
	"/product/get-all",
	async ({ page, limit, search }: { page: number, limit: number, search?: string }) => {
		const response = await ProductAPI.getAllProduct({ page, limit, search })
		return response;
	}
)

export const updateProductAction = createAsyncThunk(
	"/product/update",
	async (payload: IUpdateProduct) => {
		const response = await ProductAPI.updateProduct(payload);
		return response;
	}
)

export const deleteProductAction = createAsyncThunk(
	"/product/delete",
	async (productId: string) => {
		const response = await ProductAPI.deleteProduct(productId);
		return response;
	}
)

export const getOneProductAction = createAsyncThunk(
	'/product/get-one',
	async (productId: string) => {
		const response = await ProductAPI.getOneProduct(productId);
		return response;
	}
)


export const createProductInventoryAction = createAsyncThunk(
	"/product/product-inventory",
	async ({ productId, quantity, price, file }: { productId: string, quantity: string, price: string, file: File }) => {
		const response = await ProductAPI.addProductInventory({ productId, quantity, price, file });
		return response;
	}
)

export const getOneProductInventoryAction = createAsyncThunk(
	"/product-inventory/get-one",
	async (productInventoryId: string) => {
		const response = await ProductAPI.getOneProductInventory(productInventoryId);
		return response;
	}
)

export const getProductWithShopIdAction = createAsyncThunk(
	"/product-shopid",
	async (shopId: string) => {
		const response = await ProductAPI.getProductWithShopId(shopId);
		return response;
	}
)

export const getProductInMonth = createAsyncThunk(
	"/product-in-month",
	async () => {
		const response = await ProductAPI.productInMonth();
		return response;
	}
)
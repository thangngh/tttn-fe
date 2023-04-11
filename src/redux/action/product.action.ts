import { ICreateProduct } from "@/type/product.interface";
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
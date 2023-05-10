import { ICreateShop } from "@/type/shop.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ShopAPI } from "../../../api-client/shop.api";

export const createShopAction = createAsyncThunk(
	"/shop/create",
	async (payload: ICreateShop) => {
		const response = await ShopAPI.createShop(payload);

		return response;
	}
)

export const isShopAction = createAsyncThunk(
	"/shop/is-shop",
	async () => {
		const response = await ShopAPI.isShop();

		return response;
	}
)

export const getShopByUserAction = createAsyncThunk(
	"/shop/user-shop",
	async () => {
		const response = await ShopAPI.getShopByUser();

		return response;
	}
)

export const getRatingProductAction = createAsyncThunk(
	"/shop/get-rating-product",
	async (productId: string) => {
		const response = await ShopAPI.getRatingProduct(productId);

		return response;
	}
)

export const getReviewProductByShopAction = createAsyncThunk(
	"/shop/get-review-product-shop",
	async () => {
		const response = await ShopAPI.getReviewProductByShop();

		return response;
	}
)
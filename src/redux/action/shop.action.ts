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


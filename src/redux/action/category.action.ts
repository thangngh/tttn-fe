import { ICreateCategory, IUpdateCategory } from "@/type/category.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryAPI } from "../../../api-client/category.api";

export const createCategoryAction = createAsyncThunk(
	"/category/create",
	async (payload: ICreateCategory) => {
		const response = await CategoryAPI.createCategory(payload);

		return response;
	}
)

export const getAllCategoryByShopAction = createAsyncThunk(
	"/category/get",
	async () => {
		const response = await CategoryAPI.getCategoryByShop();

		return response;
	}
)

export const updateCategoryAction = createAsyncThunk(
	"/category/update",
	async (payload: IUpdateCategory) => {
		const response = await CategoryAPI.updateCategory(payload);

		return response;
	}
)
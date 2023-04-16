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

export const getAllCategoryAction = createAsyncThunk(
	"/category/get-all",
	async () => {
		const response = await CategoryAPI.getAllCategory();

		return response;
	}
)

export const findProductByCategoryAction = createAsyncThunk(
	"/category/find-product",
	async (name: string) => {
		const response = await CategoryAPI.getProductWithCategory(name);

		return response;
	}
)
import { IAddCart } from "@/type/cart.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartAPI } from "../../../api-client/cart.api";

export const addProductToCartAction = createAsyncThunk(
	"cart/addProductToCart",
	async (body: IAddCart) => {
		const response = await CartAPI.addProductToCart(body);
		return response;

	}
)

export const findAllProductCartUserAction = createAsyncThunk(
	"cart/findAllProductCartUser",
	async () => {
		const response = await CartAPI.findAllProductCartUser();
		return response;
	}
)

export const deleteProductToCartAction = createAsyncThunk(
	"cart/delete-cart",
	async (cartId: string) => {
		const response = await CartAPI.deleteProductToCart(cartId);
		return response;
	}
)
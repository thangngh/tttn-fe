import { IAddCart, IOrder } from "@/type/cart.interface";
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

export const createOrderAction = createAsyncThunk(
	"cart/order-create",
	async (body: IOrder) => {
		const response = await CartAPI.createOrder(body);
		return response;
	}
)

export const getOrderUserAction = createAsyncThunk(
	"cart/get-order-user",
	async () => {
		const response = await CartAPI.getOrderUser();
		return response;
	}
)

export const getOrderShopAction = createAsyncThunk(
	"cart/get-order-shop",
	async () => {
		const response = await CartAPI.getOrderShop();
		return response;
	}
)

export const approvedOrderAction = createAsyncThunk(
	"cart/approved-order",
	async (orderId: string) => {
		const response = await CartAPI.approvedOrder(orderId);
		return response;
	}
)

export const rejectOrderAction = createAsyncThunk(
	"cart/reject-order",
	async (orderId: string) => {
		const response = await CartAPI.rejectOrder(orderId);
		return response;
	}
)

export const totalOderShopAction = createAsyncThunk(
	"order/total-order-shop",
	async () => {
		const response = await CartAPI.totalOderShop()

		return response
	}
)

export const totalFinanceShopAction = createAsyncThunk(
	"order/total-finance-shop",
	async () => {
		const response = await CartAPI.totalFinanceShop()

		return response
	}
)

export const totalParticipantVisitShopAction = createAsyncThunk(
	"page-visit/visit-shop",
	async () => {
		const response = await CartAPI.totalParticipantVisitShop()

		return response
	}
)

export const getUserNewOrderAction = createAsyncThunk(
	"/order/user-order-product-in-shop",
	async () => {
		const response = await CartAPI.getUserNewOrder()

		return response
	}
)
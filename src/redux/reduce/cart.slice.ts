import { IAddCart } from "@/type/cart.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartAction, deleteProductToCartAction, findAllProductCartUserAction, getOrderShopAction, getOrderUserAction, totalFinanceShopAction, totalOderShopAction, totalParticipantVisitShopAction } from "../action/cart.action";
import { getUserAddressDefaultAction } from "../action/user.action";

interface initialState {
	isSuccess: boolean,
	isError: boolean,
	isDelete: boolean,
	totalPrice: number,
	cartProduct: IAddCart[],
	getOrder: any[],
	userAddressDefault: any,
	getOrderShop: any[],
	totalOrder: number,
	totalFinance: number,
	totalParticipant: number
}

const initialState: initialState = {
	cartProduct: [],
	isSuccess: false,
	isDelete: false,
	totalPrice: 0,
	isError: false,
	getOrder: [],
	userAddressDefault: null,
	getOrderShop: [],
	totalOrder: 0,
	totalFinance: 0,
	totalParticipant: 0
}

const CartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		resetSuccess: (state) => {
			state.isSuccess = false
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addProductToCartAction.fulfilled, (state, action) => {
			if (action.payload?.status === 200) {
				state.isSuccess = true
				state.cartProduct.push(action.payload.data)
			}
		})
		builder.addCase(findAllProductCartUserAction.fulfilled, (state, action) => {
			state.cartProduct = action.payload
			let total = 0;
			for (const { price } of action.payload) {
				total = total + price;
			}
			state.totalPrice = total
		})
		builder.addCase(deleteProductToCartAction.fulfilled, (state, action) => {
			if (action.payload?.status === 200) {
				state.totalPrice = state.totalPrice - action.payload.data.price;
				state.cartProduct = state.cartProduct.filter((item) => item.id !== action.payload.data.id)
			}
		})

		builder.addCase(getOrderUserAction.fulfilled, (state, action) => {
			state.getOrder = action.payload
		})

		builder.addCase(getUserAddressDefaultAction.fulfilled, (state, action) => {
			state.userAddressDefault = action.payload.data
		})

		builder.addCase(getOrderShopAction.fulfilled, (state, action) => {
			state.getOrderShop = action.payload.data
		})
		builder.addCase(totalOderShopAction.fulfilled, (state, action) => {
			state.totalOrder = action.payload.data
		})
		builder.addCase(totalFinanceShopAction.fulfilled, (state, action) => {
			state.totalFinance = action.payload
		})
		builder.addCase(totalParticipantVisitShopAction.fulfilled, (state, action) => {
			state.totalParticipant = action.payload.total
		})
	}
})

export const { resetSuccess } = CartSlice.actions

export default CartSlice.reducer
import { IAddCart } from "@/type/cart.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartAction, deleteProductToCartAction, findAllProductCartUserAction } from "../action/cart.action";

interface initialState {
	isSuccess: boolean,
	isError: boolean,
	isDelete: boolean,
	totalPrice: number,
	cartProduct: IAddCart[]
}

const initialState: initialState = {
	cartProduct: [],
	isSuccess: false,
	isDelete: false,
	totalPrice: 0,
	isError: false
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
	}
})

export const { resetSuccess } = CartSlice.actions

export default CartSlice.reducer
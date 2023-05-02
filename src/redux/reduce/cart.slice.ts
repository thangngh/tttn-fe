import { IAddCart } from "@/type/cart.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartAction, deleteProductToCartAction, findAllProductCartUserAction } from "../action/cart.action";

interface initialState {
	isSuccess: boolean,
	isError: boolean,
	isDelete: boolean,
	cartProduct: IAddCart[]
}

const initialState: initialState = {
	cartProduct: [],
	isSuccess: false,
	isDelete: false,
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
		})
		builder.addCase(deleteProductToCartAction.fulfilled, (state, action) => {
			console.log("delete cart", action.payload)
			if (action.payload?.status === 200) {
				// state.isDelete = true
				state.cartProduct = state.cartProduct.filter((item) => item.id !== action.payload.data.id)
			}
		})
	}
})

export const { resetSuccess } = CartSlice.actions

export default CartSlice.reducer
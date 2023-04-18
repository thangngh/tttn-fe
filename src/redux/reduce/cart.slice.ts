import { IAddCart } from "@/type/cart.interface";
import { createSlice } from "@reduxjs/toolkit";
import { addProductToCartAction, findAllProductCartUserAction } from "../action/cart.action";

interface initialState {
	isSuccess: boolean,
	isError: boolean,
	cartProduct: IAddCart[]
}

const initialState: initialState = {
	cartProduct: [],
	isSuccess: false,
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
			if (action.payload.data?.status === 200) {
				state.isSuccess = true
				state.cartProduct.push(action.payload.data)
			}
		})

		builder.addCase(findAllProductCartUserAction.fulfilled, (state, action) => {
			state.cartProduct = action.payload
		})
	}
})

export const { resetSuccess } = CartSlice.actions

export default CartSlice.reducer
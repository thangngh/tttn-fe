import { createSlice } from "@reduxjs/toolkit";
import { createProductAction, getAllProductWithShopAction } from "../action/product.action";
import { IProduct } from "@/type/product.interface";

interface initialState {
	isSuccess: boolean,
	isFail: boolean,
	productWithShop: {
		results: IProduct[],
		pageTotal: number;
		total: number;
	}
}

const initialState: initialState = {
	isSuccess: false,
	isFail: false,
	productWithShop: {
		results: [],
		pageTotal: 0,
		total: 0
	}
}

const ProductSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(createProductAction.fulfilled, (state, action) => {
		})
		builder.addCase(getAllProductWithShopAction.fulfilled, (state, action) => {
			state.productWithShop = action.payload
		})
	}
})

export default ProductSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import { createShopAction, getShopByUserAction, isShopAction } from "../action/shop.action";

interface initState {
	isSuccess: boolean,
	isFail: boolean,
	isShop: boolean,
	shopId: string;
}

const initState: initState = {
	isSuccess: false,
	isFail: false,
	isShop: false,
	shopId: ""
}

const ShopSlice = createSlice({
	name: "shop",
	initialState: initState,
	reducers: {
		setSuccess: (state, action) => {
			state.isSuccess = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createShopAction.fulfilled, (state, action) => {
			state.isSuccess = true;
			state.isFail = false;
		})
		builder.addCase(isShopAction.pending, (state, action) => {
			state.isShop = false;
		})
		builder.addCase(isShopAction.fulfilled, (state, action) => {
			state.isShop = action.payload;
		})

		builder.addCase(getShopByUserAction.fulfilled, (state, action) => {
			console.log(" action.payload", action.payload)
			state.shopId = action.payload?.data?.id
		})
	}
})

export default ShopSlice.reducer
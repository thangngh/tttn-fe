import { createSlice } from "@reduxjs/toolkit";
import { createProductAction, createProductInventoryAction, deleteProductAction, getAllProductAction, getAllProductWithShopAction, getOneProductAction, getOneProductInventoryAction, getProductInMonth, getProductWithShopIdAction, updateProductAction } from "../action/product.action";
import { IProduct } from "@/type/product.interface";

interface initialState {
	isSuccess: boolean,
	isFail: boolean,
	productWithShop: {
		results: IProduct[],
		pageTotal: number;
		total: number;
	},
	product: IProduct | null,
	productInventory: any[],
	getAllProduct: {
		results: any[],
		pageTotal: number;
		total: number;
	},
	getOneProductInventory: any,
	shop: any,
	productInMonth: any[]
}

const initialState: initialState = {
	isSuccess: false,
	isFail: false,
	productWithShop: {
		results: [],
		pageTotal: 0,
		total: 0
	},
	product: null,
	productInventory: [],
	getAllProduct: {
		results: [],
		pageTotal: 0,
		total: 0
	},
	getOneProductInventory: null,
	shop: null,
	productInMonth: []
}

const ProductSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(createProductAction.fulfilled, (state, action) => {
			state.productWithShop.results.unshift(action.payload.data)
		})
		builder.addCase(getAllProductWithShopAction.fulfilled, (state, action) => {
			state.productWithShop = action.payload
		})
		builder.addCase(updateProductAction.fulfilled, (state, action) => {
			state.productWithShop.results.find((product) => {
				if (product.id === action.payload.data.id) {
					product.name = action.payload.data?.name
					product.description = action.payload.data?.description,
						product.categoryName = action.payload.data?.category?.name
					product.modifiedAt = action.payload.data?.modifiedAt
				}
			})
		})
		builder.addCase(deleteProductAction.fulfilled, (state, action) => {
			state.productWithShop.results = state.productWithShop.results.filter((product) => product.id !== action.payload.data)
		})
		builder.addCase(getOneProductAction.fulfilled, (state, action) => {
			state.product = action.payload
			state.productInventory = action.payload?.productInventory
		})

		builder.addCase(createProductInventoryAction.fulfilled, (state, action) => {
			state.productInventory.unshift(action.payload)
		})

		builder.addCase(getAllProductAction.fulfilled, (state, action) => {
			state.getAllProduct = action.payload;
		})

		builder.addCase(getOneProductInventoryAction.fulfilled, (state, action) => {
			state.getOneProductInventory = action.payload;
		})

		builder.addCase(getProductWithShopIdAction.fulfilled, (state, action) => {
			state.shop = action.payload;
		})

		builder.addCase(getProductInMonth.fulfilled, (state, action) => {
			state.productInMonth = action.payload;
		})

	}
})

export default ProductSlice.reducer
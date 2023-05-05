import { createSlice } from "@reduxjs/toolkit";
import { createProductAction, createProductInventoryAction, deleteProductAction, getAllProductAction, getAllProductWithShopAction, getOneProductAction, getOneProductInventoryAction, getProductByCategoryAction, getProductInMonth, getProductWithShopIdAction, updateProductAction } from "../action/product.action";
import { IProduct } from "@/type/product.interface";
import { formatter } from "@/pages/shop/product/[id]";

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
	productInMonth: any[],
	price: string;
	prePrice: string;
	productByCategory: any[];
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
	productInMonth: [],
	price: '',
	prePrice: '',
	productByCategory: []
}

const ProductSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
		increasePrice: (state) => {
			const parseValue = parseInt(state.price.split(" ")[0].replace(/,/g, ""))
			const prePriceValue = parseInt(state.prePrice.split(" ")[0].replace(/,/g, ""))
			state.price = (parseValue + prePriceValue).toLocaleString() + "₫";
		},
		deCreasePrice: (state) => {
			const parseValue = parseInt(state.price.split(" ")[0].replace(/,/g, ""))
			const prePriceValue = parseInt(state.prePrice.split(" ")[0].replace(/,/g, ""))
			state.price = (parseValue - prePriceValue).toLocaleString() + "₫";
		},
		addPrice: (state, action) => {
			state.price = action.payload
			state.prePrice = action.payload
		}
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
			state.price = formatter(action.payload.productInventory[0].price)
			state.productInventory = action.payload?.productInventory
		})

		builder.addCase(createProductInventoryAction.fulfilled, (state, action) => {
			state.productInventory.unshift(action.payload.data)
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

		builder.addCase(getProductByCategoryAction.fulfilled, (state, action) => {
			console.log("action.payload", action.payload)
			state.productByCategory = action.payload;
		})

	}
})

export const { increasePrice, addPrice, deCreasePrice } = ProductSlice.actions
export default ProductSlice.reducer
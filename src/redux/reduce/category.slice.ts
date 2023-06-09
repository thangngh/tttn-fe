import { createSlice } from "@reduxjs/toolkit";
import { createCategoryAction, findProductByCategoryAction, getAllCategoryAction, getAllCategoryByShopAction, updateCategoryAction } from "../action/category.action";
import { ICategory } from "@/type/category.interface";

interface initialState {
	isSuccess: boolean,
	isFail: boolean,
	category: ICategory[],
	listCategory: any[],
	productWithShop: any[]
}

const initialState: initialState = {
	isSuccess: false,
	isFail: false,
	category: [],
	listCategory: [],
	productWithShop: []
}

const CategorySlice = createSlice({
	name: "category",
	initialState: initialState,
	reducers: {
		cleanProductWithCategory: (state) => {
			state.productWithShop = []
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createCategoryAction.fulfilled, (state, action) => {
			console.log("create new category", action.payload)
			state.category.unshift(action.payload.data)
		})
			.addCase(createCategoryAction.rejected, (state, action) => {
				console.log("payload", action.payload)
			})
		builder.addCase(getAllCategoryByShopAction.fulfilled, (state, action) => {
			state.category = action.payload.data
		})

		builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
			state.category.find((category) => {
				if (category.id === action.payload.data.id) {
					category.name = action.payload.data.name
					category.modifiedAt = action.payload.data.modifiedAt
				}
			})
		})

		builder.addCase(getAllCategoryAction.fulfilled, (state, action) => {
			state.listCategory = action.payload.data
		})

		builder.addCase(findProductByCategoryAction.fulfilled, (state, action) => {
			state.listCategory = action.payload.data
		})
	}
})

export const { cleanProductWithCategory } = CategorySlice.actions

export default CategorySlice.reducer;
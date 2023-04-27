import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reduce/user.slice";
import authSlice from "./reduce/auth.slice";
import shopSlice from "./reduce/shop.slice";
import productSlice from "./reduce/product.slice";
import categorySlice from "./reduce/category.slice";
import cartSlice from "./reduce/cart.slice";


const reducer = {
	userReducer: userSlice,
	authReducer: authSlice,
	shopReducer: shopSlice,
	productReducer: productSlice,
	categoryReducer: categorySlice,
	cartReducer: cartSlice
}

const store = configureStore({ reducer })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
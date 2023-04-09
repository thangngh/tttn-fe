import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reduce/user.slice";
import authSlice from "./reduce/auth.slice";


const reducer = {
	userReducer: userSlice,
	authReducer: authSlice
}

const store = configureStore({ reducer })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
import { configureStore } from "@reduxjs/toolkit";


const reducer = {
}

const store = configureStore({ reducer })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
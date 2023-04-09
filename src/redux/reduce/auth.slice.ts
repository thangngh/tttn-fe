import { createSlice } from "@reduxjs/toolkit"

interface initState {
	error: any,
	isLoading: boolean,
	success: any,
}

const initState: initState = {
	error: null,
	isLoading: false,
	success: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState: initState,
	reducers: {
	},
	extraReducers: (builder) => {

	}
})

export default authSlice.reducer
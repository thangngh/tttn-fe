import { createSlice } from "@reduxjs/toolkit"
import { changePasswordAction, resetPasswordWithVerifyTokenAction, sendMailResetPasswordAction } from "../action/auth.action"

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
		builder
			.addCase(sendMailResetPasswordAction.fulfilled, (state, action) => {
				console.log("action send mail", action.payload)
			})
		builder
			.addCase(resetPasswordWithVerifyTokenAction.fulfilled, (state, action) => {
				console.log("action resetPasswordWithVerifyTokenAction", action.payload)
			})
		builder
			.addCase(changePasswordAction.fulfilled, (state, action) => {
				console.log("action changePasswordAction", action.payload)
			})
	}
})

export default authSlice.reducer
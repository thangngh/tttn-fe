import { AuthAPI } from "../../../api-client/auth.api";
import { ILogin } from "@/type/auth.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginAction = createAsyncThunk(
	"/auth/login",
	async ({
		username,
		password,
	}: ILogin) => {
		const payLoad = { username, password };
		const response = await AuthAPI.login({ ...payLoad });

		return response;
	}
)

export const sendMailResetPasswordAction = createAsyncThunk(
	"/auth/sendmail",
	async ({ email }: { email: string }) => {
		const response = await AuthAPI.sendMailResetPassword({ email });
		return response;
	}
)

export const resetPasswordWithVerifyTokenAction = createAsyncThunk(
	"/auth/reset-password-token",
	async ({
		password,
		token
	}: { password: string, token: string }) => {
		const response = await AuthAPI.resetPasswordWithVerifyToken({ password, token });
		return response;
	}
)

export const changePasswordAction = createAsyncThunk(
	"/auth/change-password",
	async ({
		oldPassword,
		newPassword
	}: { oldPassword: string, newPassword: string }) => {
		const response = await AuthAPI.changePassword({ oldPassword, newPassword });
		return response;
	}
)
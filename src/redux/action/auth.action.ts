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
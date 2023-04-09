import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../../../api-client/user.api";

export const getRoleAction = createAsyncThunk(
	"user/get-role",
	async () => {
		const response = await UserAPI.getRole()
		return response;
	}
)

export const getProfileAction = createAsyncThunk(
	"user/get-profile",
	async () => {
		const response = await UserAPI.getProfile()
		return response;
	}
)

export const getAllUserAction = createAsyncThunk(
	"user/get-all",
	async ({ page, limit, role }: { page: number, limit: number, role?: string }) => {
		const response = await UserAPI.getAllUser({ page, limit, role })
		return response;
	}
)
import { UserAPI } from "@/pages/api/user.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRoleAction = createAsyncThunk(
	"user/get-role",
	async () => {
		const response = await UserAPI.getRole()
		return response;
	}
)
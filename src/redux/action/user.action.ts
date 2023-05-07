import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../../../api-client/user.api";
import { IUserAddress } from "@/type/user.interface";

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

export const uploadAvatarAction = createAsyncThunk(
	"user/upload-avatar",
	async ({ file }: { file: File }) => {
		const response = await UserAPI.uploadAvatar({ file })
		return response;
	}
)

export const editProfileAction = createAsyncThunk(
	"user/edit-profile",
	async (body: any) => {
		const response = await UserAPI.editProfile(body)
		return response;
	}
)

export const addAddressUserAction = createAsyncThunk(
	"/user-address/add-user-address",
	async (body: IUserAddress) => {
		const response = await UserAPI.addAddressUser(body)
		return response;
	}
)

export const getAddressUserAction = createAsyncThunk(
	"/user-address/get-address",
	async () => {
		const response = await UserAPI.getAddressUser()
		return response;
	}
)

export const getOneAddressUserAction = createAsyncThunk(
	"/user-address/get-one",
	async (id: string) => {
		const response = await UserAPI.getOneAddressUser(id)
		return response;
	}
)

export const setDefaultUserAddressAction = createAsyncThunk(
	"/user-address/set-default-address",
	async (id: string) => {
		const response = await UserAPI.setDefaultUserAddress(id)
		return response;
	}
)

export const deleteAddressUserAction = createAsyncThunk(
	"/user-address/delete-address",
	async (id: string) => {
		const response = await UserAPI.deleteUserAddress(id)
		return response;
	}
)

export const getUserAddressDefaultAction = createAsyncThunk(
	"/user-address/get-user-address-default",
	async () => {
		const response = await UserAPI.getUserAddressDefault()
		return response;
	}
)
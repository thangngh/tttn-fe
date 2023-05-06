import { createSlice } from "@reduxjs/toolkit";
import { addAddressUserAction, editProfileAction, getAddressUserAction, getAllUserAction, getProfileAction, getRoleAction, uploadAvatarAction } from "../action/user.action";
import { IUser, IUserAddress } from "@/type/user.interface";
import { toast } from "react-toastify";

interface initState {
	role: any;
	user: any;
	success: boolean,
	listUser: {
		results: IUser[],
		pageTotal: number;
		total: number;
	},
	userAddress: IUserAddress[]
}

const initState: initState = {
	role: null,
	user: null,
	success: false,
	listUser: {
		results: [],
		pageTotal: 0,
		total: 0
	},
	userAddress: []
}

const UserSlice = createSlice({
	name: "user",
	initialState: initState,
	reducers: {
		setRole: (state, action) => {
			state.role = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getRoleAction.fulfilled, (state, action) => {
			state.role = action.payload;
		})

		builder
			.addCase(getProfileAction.pending, (state, action) => {
				state.user = null;
			})
			.addCase(getProfileAction.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(getProfileAction.rejected, (state, action) => {
				state.user = action.payload;
			})

		builder
			.addCase(getAllUserAction.pending, (state, action) => {
				// state.user = null;
			})
			.addCase(getAllUserAction.fulfilled, (state, action) => {
				state.listUser = action.payload;
			})
			.addCase(getAllUserAction.rejected, (state, action) => {
				// state.user = action.payload;
			})

		builder
			.addCase(uploadAvatarAction.fulfilled, (state, action) => {
				console.log("upload file", action.payload)
			})

		builder
			.addCase(editProfileAction.fulfilled, (state, action) => {
				console.log("editProfileAction", action.payload)
				toast.success(action.payload?.status)
			})

		builder
			.addCase(getAddressUserAction.fulfilled, (state, action) => {
				state.userAddress = action.payload.data
			})

		builder
			.addCase(addAddressUserAction.fulfilled, (state, action) => {
				state.userAddress.push(action.payload)
			})
	}

})

export default UserSlice.reducer;
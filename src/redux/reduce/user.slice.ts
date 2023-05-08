import { createSlice } from "@reduxjs/toolkit";
import { addAddressUserAction, deleteAddressUserAction, editProfileAction, getAddressUserAction, getAllUserAction, getOneAddressUserAction, getProfileAction, getRoleAction, updateUserAddressAction, uploadAvatarAction } from "../action/user.action";
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
	userAddress: IUserAddress[],
	getOneUserAddress: IUserAddress | null,
	default: boolean
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
	userAddress: [],
	getOneUserAddress: null,
	default: false
}

const UserSlice = createSlice({
	name: "user",
	initialState: initState,
	reducers: {
		setRole: (state, action) => {
			state.role = action.payload;
		},
		changeDefault: (state, action) => {
			state.default = action.payload?.data?.isDefault;
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

				state.userAddress.push(action.payload.data
				)
			})

		builder
			.addCase(getOneAddressUserAction.fulfilled, (state, action) => {
				state.getOneUserAddress = action.payload.data
			})

		builder
			.addCase(deleteAddressUserAction.fulfilled, (state, action) => {
				state.userAddress = state.userAddress.filter(
					(item) => item.id !== action.payload.data.id
				)
			})

		builder
			.addCase(updateUserAddressAction.fulfilled, (state, action) => {

				const address = state.userAddress.find((address) =>
					address.id === action.payload.data.id)
				if (address) {
					address.city = action.payload.data.city
					address.country = action.payload.data.country
					address.isDefault = action.payload.data.default
					address.district = action.payload.data.district
					address.street = action.payload.data.street
					address.telephone = action.payload.data.telephone
				}
			})
	}

})

export const { changeDefault } = UserSlice.actions


export default UserSlice.reducer;
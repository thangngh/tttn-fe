import { createSlice } from "@reduxjs/toolkit";
import { getAllUserAction, getProfileAction, getRoleAction } from "../action/user.action";
import { IUser } from "@/type/user.interface";

interface initState {
	role: any;
	user: any;
	success: boolean,
	listUser: {
		results: IUser[],
		pageTotal: number;
		total: number;
	}
}

const initState: initState = {
	role: null,
	user: null,
	success: false,
	listUser: {
		results: [],
		pageTotal: 0,
		total: 0
	}
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
	}

})

export default UserSlice.reducer;
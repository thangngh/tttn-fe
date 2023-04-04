import { createSlice } from "@reduxjs/toolkit";
import { getRoleAction } from "../action/user.action";

interface initState {
	role: string;
}

const initState: initState = {
	role: ""
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
	}

})

export default UserSlice.reducer;
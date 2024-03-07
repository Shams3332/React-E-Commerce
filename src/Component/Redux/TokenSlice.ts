import { createSlice } from "@reduxjs/toolkit";


interface TokenState {
    token: string | null;
}

const initialState: TokenState = {
    token: null,

};


const tokenSlice = createSlice({
    name: "token",
    initialState,   
    reducers: {

        setToken: (state, action) => {
            state.token = action.payload;
        },

        logout: (state) => {
            state.token = null;
        },
    },
});

export const {setToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
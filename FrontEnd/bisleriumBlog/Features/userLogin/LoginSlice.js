import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    token: ""
}

export const loginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers:{
        newLogin:(state, action)=>{
            const token = action.payload;
            state.token = token;
        },
        renewToken:(state, action)=>{
            state.token=action.payload;
        }
    }
})

export const {newLogin, renewToken} = loginSlice.actions;
export default  loginSlice.reducer
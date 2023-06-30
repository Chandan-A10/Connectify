import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    user:{}
}
const userSlice = createSlice({
    name:'user',
    initialstate,
    reducers:{
        logInUser:(state,action)=>{
            state.user=action.payload
        },
        logOutUser:(state,action)=>{
            state.user={}
        }
    }
})

export const userReducer=userSlice.reducer
export const {logInUser,logOutUser}=userSlice.actions
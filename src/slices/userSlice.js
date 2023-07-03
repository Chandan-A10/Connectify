import { createSlice } from "@reduxjs/toolkit";
import { setStausOnline } from "../databaseOperation/changeOnlineStatus";

const initialstate={
    user:{}
}
const userSlice = createSlice({
    name:'user',
    initialstate,
    reducers:{
        logInUser:(state,action)=>{
            state.user=action.payload
            setStausOnline(action.payload.id)
        },
        logOutUser:(state,action)=>{
            state.user=''
        },
        Editprofile:(state,action)=>{
            state.user={...state.user,name:action.payload}
        },
        Editpic:(state,action)=>{
            state.user={...state.user,pic:action.payload}
        }
    }
})

export const userReducer=userSlice.reducer
export const {Editpic,logInUser,Editprofile,logOutUser}=userSlice.actions
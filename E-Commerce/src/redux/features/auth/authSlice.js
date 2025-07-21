import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    isLoading: false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setCredientioals: (state, action) =>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            const expirationTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); // 1 hour
            localStorage.setItem("expirationTime", expirationTime.toISOString());
        },
        logout: (state)=>{
            state.userInfo = null
            localStorage.clear();
        }
    }
})

export const {setCredientioals, logout} = authSlice.actions;
export default authSlice.reducer;
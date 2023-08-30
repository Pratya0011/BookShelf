import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin : true
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers:{
        setIsLogin : (state,action)=>{
            state.isLogin = action.payload;
        }
    }
})
export const {setIsLogin} = appSlice.actions;
export default appSlice.reducer
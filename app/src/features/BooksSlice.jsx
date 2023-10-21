import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { books } from "../Components/request";
import axios from 'axios'

export const fetchRomanticBooks = createAsyncThunk("romantic", async()=>{
    try{
        const res = await axios.get(books.romanceBooks)
        return res.data
    }catch(error){
        return error.data.message
    }
})

export const fetchFantacyBooks = createAsyncThunk("fantacy", async ()=>{
    try{
        const res = await axios.get(books.fantacyBooks)
    return res.data
    }catch(error){
        return error.data.message
    }
})

export const fetchFlowerBooks = createAsyncThunk("flower", async ()=>{
    try{
        const res = await axios.get(books.flowerBooks)
        return res.data
    }catch(error){
        return error.data.messages
    }
})

export const fetchPoetryBooks = createAsyncThunk("poetry", async ()=>{
    try{
        const res = await axios.get(books.poetryBooks)
        return res.data
    }catch(error){
        return error.data.message
    }
})

export const fetchPremiumBooks = createAsyncThunk("premium", async ()=>{
    try{
        const res = await axios.get(books.premiumBooks)
        return res.data
    }catch(error){
        return error.data.message
    }
})

export const fetchDiscoveryBooks = createAsyncThunk("discovery", async ()=>{
    try{
        const res = await axios.get(books.discoverBooks)
        return res.data
    }catch(error){
        return error.data.message
    }
})


const initialState = {
    romanticBooks: [],
    factacyBooks: [],
    flowerBooks: [],
    poetryBooks: [],
    premiumBooks:[],
    discoveryBooks: [],
    loading: false,
    errMessage:''
}

export const bookSlice =createSlice({
    name: 'books',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchRomanticBooks.pending]: (state)=>{
            state.loading = true
        },
        [fetchRomanticBooks.fulfilled]: (state, action)=>{
            state.loading = false,
            state.romanticBooks = action.payload
        },
        [fetchRomanticBooks.rejected]: (state, action)=>{
            state.loading= true
            state.errMessage = action.payload
        },


        [fetchFantacyBooks.pending]: (state)=>{
            state.loading = true
        },
        [fetchFantacyBooks.fulfilled]: (state, action)=>{
            state.loading = false,
            state.factacyBooks = action.payload
        },
        [fetchFantacyBooks.rejected]: (state, action)=>{
            state.loading = true,
            state.errMessage = action.payload
        },


        [fetchFlowerBooks.pending]: (state)=>{
            state.loading = true
        },
        [fetchFlowerBooks.fulfilled]: (state, action)=>{
            state.loading = false,
            state.flowerBooks = action.payload
        },
        [fetchFlowerBooks.rejected]: (state, action)=>{
            state.loading = true,
            state.errMessage = action.payload
        },


        [fetchPoetryBooks.pending]: (state)=>{
            state.loading = true
        },
        [fetchPoetryBooks.fulfilled]: (state, action)=>{
            state.loading = false
            state.poetryBooks = action.payload
        },
        [fetchPoetryBooks.rejected]: (state, action)=>{
            state.loading = true,
            state.errMessage = action.payload
        },


        [fetchPremiumBooks.pending]:(state)=>{
            state.loading = true
        },
        [fetchPremiumBooks.fulfilled]: (state, action)=>{
            state.loading = false,
            state.premiumBooks = action.payload
        },
        [fetchPremiumBooks.rejected]: (state, action)=>{
            state.loading = true,
            state.errMessage = action.payload
        },

        [fetchDiscoveryBooks.pending]: (state)=>{
            state.loading = true
        },
        [fetchDiscoveryBooks.fulfilled]: (state, action)=>{
            state.loading = false,
            state.discoverBooks = action.payload
        },
        [fetchDiscoveryBooks.rejected]: (state,action)=>{
            state.loading = true,
            state.errMessage = action.payload
        }
    },
})

export default bookSlice.reducer;
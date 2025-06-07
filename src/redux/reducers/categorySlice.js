import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryThunk = createAsyncThunk('api/category', async () => {
    const res = await axios.get()
    return res.data
})

export const categorySlice = createSlice({
    name: 'category',
    initialState:{
        category: [],

    },
    extraReducers: builder =>{
        builder
        .addCase(getCategoryThunk.fulfilled, (state,action) => {
            
        })
    }
})

export default categorySlice.reducer
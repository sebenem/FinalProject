import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// GET: Kategoriya siyahısını gətir
export const getCategoryThunk = createAsyncThunk('api/getCategory', async () => {
    const res = await axios.get('http://localhost:5008/category');
    return res.data;
});

// POST: Yeni kategoriya əlavə et
export const postCategoryThunk = createAsyncThunk('api/postCategory', async (data) => {
    const res = await axios.post('http://localhost:5008/category', data);
    return res.data;
});

// DELETE: Kategoriya sil
export const deleteCategoryThunk = createAsyncThunk('api/deleteCategory', async (id) => {
    await axios.delete(`http://localhost:5008/category/${id}`);
    return id;
});

// Slice
export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        loading: false,
        error: null
    },
    extraReducers: builder => {
        builder
            .addCase(getCategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(getCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(postCategoryThunk.fulfilled, (state, action) => {
                state.category.push(action.payload);
            })
             .addCase(postCategoryThunk.pending, (state) => {
                state.category=true
            })
             .addCase(postCategoryThunk.rejected, (state) => {
                state.category=false
            })

            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.category = state.category.filter(item => item._id !== action.payload);
            })
             .addCase(deleteCategoryThunk.pending, (state) => {
                state.category = true;
            })
             .addCase(deleteCategoryThunk.rejected, (state) => {
                state.category = false;
            });
          
    }
});

export default categorySlice.reducer;

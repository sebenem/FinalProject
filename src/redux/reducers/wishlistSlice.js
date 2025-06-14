import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWishlistThunk = createAsyncThunk('wishlist/get', async () => {
    const res = await axios.get('http://localhost:5008/wishlist');
    return res.data.data;
});

export const updateWishlistThunk = createAsyncThunk('wishlist/update', async (product) => {
    const res = await axios.put(`http://localhost:5008/wishlist/${product._id}`, product);
    return res.data;
});

export const deleteWishlistThunk = createAsyncThunk('wishlist/delete', async (id) => {
    await axios.delete(`http://localhost:5008/wishlist/${id}`);
    return id;
});

export const postWishlistThunk = createAsyncThunk('wishlist/post', async (data, { getState }) => {
    const state = getState();
    const existing = state.wishlist.wishlist.find(item => item._id === data._id);
    if (existing) return;
    const res = await axios.post('http://localhost:5008/wishlist', data);
    return res.data;
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistThunk.pending, state => { state.loading = true; })
            .addCase(getWishlistThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(getWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(postWishlistThunk.pending, state => { state.loading = true; })
            .addCase(postWishlistThunk.fulfilled, (state, action) => {
                if (action.payload) state.wishlist.push(action.payload);
                state.loading = false;
            })
            .addCase(postWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateWishlistThunk.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
            })

            .addCase(deleteWishlistThunk.pending, state => { state.loading = true; })
            .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
            })
            .addCase(deleteWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default wishlistSlice.reducer;


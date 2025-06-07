    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";

    export const getWishlistThunk = createAsyncThunk('api/getWishlist', async () => {
        const res = await axios.get('http://localhost:5008/wishlist');
        return res.data;
    });

    export const updateWishlistThunk = createAsyncThunk('update/wishlist', async (product) => {
        const res = await axios.put(`http://localhost:5008/wishlist/${product._id}`, product);
        return res.data;
    });

    export const deleteWishlistThunk = createAsyncThunk('wishlist/delete', async (id) => {
        await axios.delete(`http://localhost:5008/wishlist/${id}`);
        return id;
    });

    export const postWishlistThunk = createAsyncThunk('post/wishlist', async (data, { getState }) => {
        const state = getState();
        const existingProduct = state.wishlist.wishlist.find(item => item._id === data._id);

        if (existingProduct) {
            return;
        }

        const res = await axios.post('http://localhost:5008/wishlist', data);
        return res.data;
    });

    export const wishlistSlice = createSlice({
        name: 'wishlist',
        initialState: {
            wishlist: [],
            loading: false,
            error: null
        },
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(getWishlistThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.wishlist = action.payload;
                })
                .addCase(getWishlistThunk.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getWishlistThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })

                .addCase(postWishlistThunk.fulfilled, (state, action) => {
                    if (action.payload) {
                        state.wishlist.push(action.payload);
                    }
                    state.loading = false;
                })
                .addCase(postWishlistThunk.pending, (state) => {
                    state.loading = true;
                })
                .addCase(postWishlistThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })

                .addCase(updateWishlistThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.wishlist = state.wishlist.map((item) =>
                        item._id === action.payload._id
                            ? { ...item, quantity: action.payload.quantity }
                            : item
                    );
                })

                .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
                })
                .addCase(deleteWishlistThunk.pending, (state) => {
                    state.loading = true;
                })
                .addCase(deleteWishlistThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                });
        }
    });

    export default wishlistSlice.reducer;

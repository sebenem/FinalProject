import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBasketThunk = createAsyncThunk("basket/get", async () => {
    const res = await axios.get("http://localhost:5008/basket");
    return res.data;
});

export const postBasketThunk = createAsyncThunk("basket/post", async (newData) => {
    const res = await axios.post("http://localhost:5008/basket", newData);
    return res.data;
});

export const deleteBasketThunk = createAsyncThunk("basket/delete", async (id) => {
    await axios.delete(`http://localhost:5008/basket/${id}`);
    return id;
});

// basketSlice.js

export const updateQuantityThunk = createAsyncThunk(
  'basket/updateQuantity',
  async ({ id, quantity }) => {
    const res = await axios.put(`http://localhost:5008/basket/${id}`, { quantity });
    return res.data;
  }
);


const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBasketThunk.pending, state => { state.loading = true; })
            .addCase(getBasketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.basket = action.payload;
            })
            .addCase(getBasketThunk.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(postBasketThunk.fulfilled, (state, action) => {
                state.basket.push(action.payload);
            })

            .addCase(deleteBasketThunk.fulfilled, (state, action) => {
                state.basket = state.basket.filter(item => item._id !== action.payload);
            })
              .addCase(updateQuantityThunk.fulfilled, (state, action) => {
              const index = state.basket.findIndex(item => item._id === action.payload._id);
              if (index !== -1) {
                state.basket[index].quantity = action.payload.quantity
              }
            });
    },
});

export default basketSlice.reducer;


  
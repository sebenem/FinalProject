import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get basket
export const getBasketThunk = createAsyncThunk('api/getbasket', async () => {
  const res = await axios.get('http://localhost:5008/basket');
  return res.data;
});

// Delete item
export const deleteBasketThunk = createAsyncThunk('products/deletebasket', async (id) => {
  await axios.delete(`http://localhost:5008/basket/${id}`);
  return id;
});

// Update quantity
export const updateBasketThunk = createAsyncThunk('update/basket', async (product) => {
  const res = await axios.put(`http://localhost:5008/basket/${product._id}`, product);
  return res.data;
});

// Add item
export const postBasketThunk = createAsyncThunk('post/basket', async (data) => {
  const res = await axios.post('http://localhost:5008/basket', data);
  return res.data;
});

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      // Get
      .addCase(getBasketThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBasketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = action.payload;
      })
      .addCase(getBasketThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Post
      .addCase(postBasketThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBasketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.basket.push(action.payload); // Yeni item əlavə et
      })
      .addCase(postBasketThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(updateBasketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = state.basket.map(item =>
          item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
        );
      })

      // Delete
      .addCase(deleteBasketThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBasketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = state.basket.filter(item => item._id !== action.payload);
      })
      .addCase(deleteBasketThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default basketSlice.reducer;

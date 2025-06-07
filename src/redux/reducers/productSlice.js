import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductsThunk = createAsyncThunk('api/products', async () => {
  const response = await axios.get("http://localhost:5008/products");
  return response.data;
});

export const deleteProductThunk = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`http://localhost:5000/products/${id}`);
  return id;
});

export const addFormikThunk = createAsyncThunk('api/formik', async (data) => {
  const response = await axios.post('http://localhost:5000/products', data);
  return response.data;
});

export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Xəta baş verdi');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addFormikThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFormikThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addFormikThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

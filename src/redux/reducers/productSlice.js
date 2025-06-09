import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// PRODUCTS GET
export const getProductsThunk = createAsyncThunk('products/getAll', async () => {
  const res = await axios.get('http://localhost:5008/products');
  return res.data;
});

// PRODUCT ADD (FORMIK)
export const addFormikThunk = createAsyncThunk('products/add', async (data) => {
  const res = await axios.post('http://localhost:5008/products', data); // DİQQƏT: YALNIZ PRODUCTS
  return res.data;
});

// PRODUCT DELETE
export const deleteProductThunk = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`http://localhost:5008/products/${id}`);
  return id;
});

// PRODUCT BY ID
export const fetchProductDetails = createAsyncThunk('products/getById', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`http://localhost:5008/products/${id}`);
    return res.data;
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
    error: null
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

      .addCase(addFormikThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFormikThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // BASKETƏ YOX, SADƏCƏ PRODUCTS-Ə ƏLAVƏ
      })
      .addCase(addFormikThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => item._id !== action.payload);
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  }
});

export default productSlice.reducer;

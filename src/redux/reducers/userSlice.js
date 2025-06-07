import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ======================= THUNKS =======================

// Login
export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:5008/api/users/login', credentials);
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Login xətası");
    }
});

// Register
export const registerUser = createAsyncThunk('user/register', async (newUser, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:5008/api/users/signup', newUser);
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Qeydiyyat xətası");
    }
});

// Logout
export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        // əgər backend logout API varsa:
        await axios.post('http://localhost:5008/api/users/logout');
        localStorage.removeItem('user');
        return null;
    } catch (err) {
        return rejectWithValue("Çıxış zamanı xəta baş verdi");
    }
});

// Get current user
export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('http://localhost:5008/api/users/getuser');
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    } catch (err) {
        return rejectWithValue("İstifadəçi tapılmadı");
    }
});

// ======================= SLICE =======================

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
        error: null,
    },
    reducers: {
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                state.user = JSON.parse(storedUser);
            }
        }
    },
    extraReducers: builder => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get User
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;

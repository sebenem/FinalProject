import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5008/api/users/login', credentials);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login xətası");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  'user/register',
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5008/api/users/signup', newUser);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Qeydiyyat xətası");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:5008/api/users/logout');
      localStorage.removeItem('user');
      return null;
    } catch (err) {
      return rejectWithValue("Çıxış zamanı xəta baş verdi");
    }
  }
);

// Get current logged-in user info
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5008/api/users/getuser');
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue("İstifadəçi tapılmadı");
    }
  }
);

// Get all users (admin üçün)
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5008/api/users'); // Routerdə GET /users endpointi olmalıdır
      return res.data; // Bütün istifadəçilər gələcək
    } catch (err) {
      return rejectWithValue('İstifadəçiləri almaqda xəta baş verdi');
    }
  }
);

// Delete user by admin
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5008/api/users/deleteuser/${userId}`);
      return userId; // Silinən istifadəçinin ID-si qaytarılır
    } catch (err) {
      return rejectWithValue('İstifadəçini silmək mümkün olmadı');
    }
  }
);
// update user info (profil redaktəsi)
export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5008/api/users/update/${id}`, updatedData);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue('Profil yenilənmədi');
    }
  }
);

// change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.put('http://localhost:5008/api/users/changepassword', {
        currentPassword,
        newPassword
      });
      return res.data.message;
    } catch (err) {
      return rejectWithValue('Parol dəyişdirilə bilmədi');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    allUsers: [],       // Admin üçün bütün istifadəçilər
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
  extraReducers: (builder) => {
    builder
      // login
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

      // register
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

      // logout
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

      // get current user
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
      })

      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Silinmiş istifadəçini allUsers siyahısından çıxarırıq
        state.allUsers = state.allUsers.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      .addCase(changePassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  }
});

export const { loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;

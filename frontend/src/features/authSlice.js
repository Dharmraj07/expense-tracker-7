import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_BASE_URL ='http://localhost:5000/api/auth';

// Helper function for API calls
const apiCall = async (url, data, rejectWithValue) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
};

// Async thunks
export const signup = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  return apiCall(`${API_BASE_URL}/signup`, { email, password }, rejectWithValue);
});

export const signin = createAsyncThunk('auth/signin', async ({ email, password }, { rejectWithValue }) => {
  return apiCall(`${API_BASE_URL}/signin`, { email, password }, rejectWithValue);
});

export const forgetPassword = createAsyncThunk('auth/forgetPassword', async ({ email }, { rejectWithValue }) => {
  return apiCall(`${API_BASE_URL}/forget-password`, { email }, rejectWithValue);
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async ({ email, otp }, { rejectWithValue }) => {
  return apiCall(`${API_BASE_URL}/verify-email`, { email, otp }, rejectWithValue);
});

export const resendOtp = createAsyncThunk('auth/resendOtp', async ({ email }, { rejectWithValue }) => {
  return apiCall(`${API_BASE_URL}/request-otp`, { email }, rejectWithValue);
});

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isLoggedIn = false; // Require email verification
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Signin
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user.isVerified = true;
        }
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;

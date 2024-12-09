// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import Cookies from 'js-cookie';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ username, password }) => {
  const encodedCredentials = btoa(`${username}:${password}`);
  const { data } = await axios.post(
    '/login',
    { username, password },
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
    },
  );
  Cookies.set('auth_token', encodedCredentials, { expires: 7 });
  return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async ({ token }) => {
  const { data } = await axios.get('/me', {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('auth_token');
      state.userData = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Не вдалося увійти. Перевірте правильність введених даних.';
      })
      .addCase(fetchMe.pending, (state) => {
        state.userData = null;
        state.status = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMe.rejected, (state) => {
        state.userData = null;
        state.status = 'failed';
        state.error = 'Не вдалося отримати інформацію про користувача.';
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

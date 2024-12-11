import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import Cookies from 'js-cookie';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ username, password, fullName }) => {
    const { data } = await axios.post('/register', {
      username,
      password,
      full_name: fullName,
    });
    return data;
  },
);

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

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const token = Cookies.get('auth_token');
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
    registerStatus: 'idle',
    loginStatus: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('auth_token');
      state.userData = null;
      state.loginStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.registerStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.registerStatus = 'failed';
        state.error = 'Не вдалося зареєструватися. Перевірте правильність введених даних.';
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.loginStatus = 'succeeded';
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginStatus = 'failed';
        state.error = 'Не вдалося увійти. Перевірте правильність введених даних.';
      })
      .addCase(fetchMe.pending, (state) => {
        state.userData = null;
        state.loginStatus = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginStatus = 'succeeded';
      })
      .addCase(fetchMe.rejected, (state) => {
        state.userData = null;
        state.loginStatus = 'failed';
        state.error = 'Не вдалося отримати інформацію про користувача.';
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

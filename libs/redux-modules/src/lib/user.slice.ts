import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { History } from 'history';
import axios from 'axios';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: null | string;
  loggedIn: undefined | boolean;
}

export const getLoggedIn = createAsyncThunk('user/loggedIn', async () => {
  const loggedInRes = await axios.get(
    `${process.env.NX_SITE_URL}/user/loggedIn`
  );
  return loggedInRes.data;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    {
      history,
      ...registerData
    }: { email: string; password: string; history: History },
    { dispatch }
  ) => {
    await axios.post(`${process.env.NX_SITE_URL}/user`, registerData);
    await dispatch(getLoggedIn());
    return history.push('/customers');
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    {
      history,
      ...loginData
    }: { email: string; password: string; history: History },
    { dispatch }
  ) => {
    await axios.post(`${process.env.NX_SITE_URL}/user/login`, loginData);
    await dispatch(getLoggedIn());
    return history.push('/customers');
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (history: History, { dispatch }) => {
    await axios.get(`${process.env.NX_SITE_URL}/user/logout`);
    await dispatch(getLoggedIn());
    return history.push('/login');
  }
);

export const initialUserState: UserState = {
  loadingStatus: 'not loaded',
  error: null,
  loggedIn: undefined,
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedIn.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getLoggedIn.fulfilled, (state: UserState, action) => {
        state.loadingStatus = 'loaded';
        state.loggedIn = action.payload;
      })
      .addCase(getLoggedIn.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state: UserState) => {
        state.loadingStatus = 'error';
      })
      .addCase(registerUser.fulfilled, (state: UserState) => {
        state.loadingStatus = 'loaded';
      })
      .addCase(registerUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state: UserState) => {
        state.loadingStatus = 'error';
      })
      .addCase(loginUser.fulfilled, (state: UserState) => {
        state.loadingStatus = 'loaded';
      })
      .addCase(loginUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state: UserState) => {
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const selectUserLoggedIn = (state) => state.user.loggedIn;

export const selectUserError = (state) => state.user.error;

export const userReducer = userSlice.reducer;

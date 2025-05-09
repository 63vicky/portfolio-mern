/* eslint-disable no-self-assign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  // 'https://portfolio-mern-xj4h.onrender.com/api/v1';
  'http://localhost:4000/api/v1';

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },

    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    updateProfileResetAfterUpdate(state) {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    clearAllErrors(state) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(UserSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      `${API_URL}/user/login`,
      { email, password },
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );

    dispatch(UserSlice.actions.loginSuccess(data.user));
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Network error occurred. Please try again.';
    dispatch(UserSlice.actions.loginFailed(errorMessage));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(UserSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(`${API_URL}/user/me`, {
      withCredentials: true,
    });

    dispatch(UserSlice.actions.loadUserSuccess(data.user));
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to fetch user data. Please try again.';
    dispatch(UserSlice.actions.loadUserFailed(errorMessage));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/user/logout`, {
      withCredentials: true,
    });

    dispatch(UserSlice.actions.logoutSuccess(data.message));
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to logout. Please try again.';
    dispatch(UserSlice.actions.logoutFailed(errorMessage));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(UserSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `${API_URL}/user/update/password`,
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch(UserSlice.actions.updatePasswordSuccess(data.message));
      dispatch(UserSlice.actions.clearAllErrors());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to update password. Please try again.';
      dispatch(UserSlice.actions.updatePasswordFailed(errorMessage));
    }
  };

export const updateProfile = (newData) => async (dispatch) => {
  dispatch(UserSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(`${API_URL}/user/update/me`, newData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(UserSlice.actions.updateProfileSuccess(data.message));
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to update profile. Please try again.';
    dispatch(UserSlice.actions.updateProfileFailed(errorMessage));
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(UserSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) =>
  dispatch(UserSlice.actions.clearAllErrors());

export default UserSlice.reducer;

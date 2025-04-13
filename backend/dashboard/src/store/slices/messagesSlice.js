import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  // 'https://portfolio-mern-xj4h.onrender.com/api/v1';
  'http://localhost:4000/api/v1';

const initialState = {
  loading: false,
  error: null,
  message: null,
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    getAllMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = state.message;
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetMessageSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.messages = state.messages;
    },
    clearAllErrors(state) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messagesSlice.actions.getAllMessageRequest());
  try {
    const { data } = await axios.get(`${API_URL}/message/getall`, {
      withCredentials: true,
    });
    dispatch(messagesSlice.actions.getAllMessageSuccess(data.messages));
    dispatch(messagesSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messagesSlice.actions.getAllMessageFailed(error.response.data.message)
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messagesSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(`${API_URL}/message/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(messagesSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messagesSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messagesSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};
export const clearAllMessageErrors = () => async (dispatch) => {
  dispatch(messagesSlice.actions.clearAllErrors());
};

export const resetMessageSlice = () => async (dispatch) => {
  dispatch(messagesSlice.actions.resetMessageSlice());
};

export const messagesReducer = messagesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  message: null,
  timeline: [],
};
const API_URL =
  import.meta.env.VITE_API_URL ||
  // 'https://portfolio-mern-xj4h.onrender.com/api/v1';
  'http://localhost:4000/api/v1';

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    getAllTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.timeline = [];
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.timeline = action.payload;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.timeline = [];
    },
    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.timeline = state.timeline.filter(
        (item) => item._id !== action.payload.id
      );
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
      state.timeline = [...state.timeline, action.payload.newTimeline];
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetTimelineSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(`${API_URL}/timeline/getall`, {
      withCredentials: true,
    });
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(`${API_URL}/timeline/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(
      timelineSlice.actions.deleteTimelineSuccess({ message: data.message, id })
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(`${API_URL}/timeline/add`, timelineData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(timelineSlice.actions.addTimelineSuccess(data));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(error.response.data.message)
    );
  }
};

export const clearAllTimelineErrors = () => async (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export const resetTimelineSlice = () => async (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export const timelineReducer = timelineSlice.reducer;

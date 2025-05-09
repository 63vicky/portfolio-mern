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
  applications: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    getAllApplicationsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.applications = [];
    },
    getAllApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    getAllApplicationsFailed: (state, action) => {
      state.loading = false;
      state.applications = [];
      state.error = action.payload;
    },
    addNewApplicationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewApplicationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewApplicationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.applications = state.applications.filter(
        (application) => application._id !== action.payload.applicationId
      );
    },
    deleteApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetApplicationSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.applications = state.applications;
    },
    clearAllErrors(state) {
      state.error = null;
      state.applications = state.applications;
    },
  },
});

export const getAllApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getAllApplicationsRequest());
  try {
    const { data } = await axios.get(`${API_URL}/softwareApplication/getall`, {
      withCredentials: true,
    });
    dispatch(
      applicationSlice.actions.getAllApplicationsSuccess(
        data.softwareApplications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.getAllApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewApplication = (applicationData) => async (dispatch) => {
  dispatch(applicationSlice.actions.addNewApplicationRequest());
  try {
    const { data } = await axios.post(
      `${API_URL}/softwareApplication/add`,
      applicationData,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.addNewApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(
      applicationSlice.actions.addNewApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (applicationId) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteApplicationRequest());
  try {
    const { data } = await axios.delete(
      `${API_URL}/softwareApplication/delete/${applicationId}`,
      {
        withCredentials: true,
      }
    );
    dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteApplicationFailed(
        error.response.data.message
      )
    );
  }
};
export const clearAllApplicationSliceErrors = () => async (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => async (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;

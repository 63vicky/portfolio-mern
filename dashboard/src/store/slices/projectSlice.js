import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL =
  import.meta.env.VITE_API_URL ||
  // 'https://portfolio-mern-xj4h.onrender.com/api/v1';
  'http://localhost:4000/api/v1';

const initialState = {
  projects: [],
  loading: false,
  error: null,
  message: null,
  singleProject: {},
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getAllProjectsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.projects = [];
    },

    getAllProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    getAllProjectsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.projects = state.projects;
    },

    addNewProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess: (state, action) => {
      state.loading = false;
      // state.projects = [...state.projects, action.payload];
      state.error = null;
      state.message = action.payload;
    },
    addNewProjectFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    deleteProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      // state.projects = state.projects.filter(
      //   (project) => project._id !== action.payload
      // );
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetProjectSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.projects = state.projects;
    },

    clearAllErrors: (state) => {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(`${API_URL}/project/getall`, {
      withCredentials: true,
    });
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

export const addNewProject = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(`${API_URL}/project/add`, projectData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(`${API_URL}/project/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `${API_URL}/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const clearAllProjectSliceError = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const projectReducer = projectSlice.reducer;

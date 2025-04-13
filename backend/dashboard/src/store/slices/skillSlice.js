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
  skills: [],
};

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    getAllSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.skills = [];
    },
    getAllSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.skills = action.payload;
    },
    getAllSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.skills = [];
    },

    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.skills = [...state.skills, action.payload.newSkill];
    },
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
      state.skills = state.skills.filter(
        (skill) => skill._id !== action.payload.skillId
      );
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetSkillSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.skills = state.skills;
    },
    clearAllErrors(state) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});
export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(`${API_URL}/skill/getall`, {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

export const addNewSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const { data } = await axios.post(`${API_URL}/skill/add`, skillData, {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};

export const deleteSkill = (skillId) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(`${API_URL}/skill/delete/${skillId}`, {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};
export const clearAllSkillSliceErrors = () => async (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export const resetSkillSlice = () => async (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;

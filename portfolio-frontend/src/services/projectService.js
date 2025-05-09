import api from './api';

export const getAllProjects = async () => {
  try {
    const response = await api.get('/project/getall');
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/project/get/${id}`);
    return response.data.project;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

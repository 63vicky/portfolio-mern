import api from './api';

export const getAllSkills = async () => {
  try {
    const response = await api.get('/skill/getall');
    return response.data.skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

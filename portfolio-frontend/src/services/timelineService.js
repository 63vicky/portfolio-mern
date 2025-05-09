import api from './api';

export const getAllTimeline = async () => {
  try {
    const response = await api.get('/timeline/getall');
    return response.data.timelines;
  } catch (error) {
    console.error('Error fetching timeline:', error);
    throw error;
  }
};

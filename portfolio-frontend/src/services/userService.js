import api from './api';

export const getUserForPortfolio = async () => {
  try {
    const response = await api.get('/user/me/portfolio');
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

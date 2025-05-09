import api from './api';

export const sendMessage = async (messageData) => {
  try {
    const response = await api.post('/message/send', messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

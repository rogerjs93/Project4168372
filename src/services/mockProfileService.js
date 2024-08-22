import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Make sure this matches your json-server port

export const profileService = {
  updateAccountInfo: async (userId, data) => {
    const response = await axios.patch(`${API_URL}/users/${userId}`, data);
    return response.data;
  },

  updatePrivacySettings: async (userId, settings) => {
    const response = await axios.patch(`${API_URL}/users/${userId}`, { privacySettings: settings });
    return response.data;
  },

  updateNotificationPreferences: async (userId, preferences) => {
    const response = await axios.patch(`${API_URL}/users/${userId}`, { notificationPreferences: preferences });
    return response.data;
  },

  updateSecuritySettings: async (userId, settings) => {
    const response = await axios.patch(`${API_URL}/users/${userId}`, { securitySettings: settings });
    return response.data;
  },

  getLoginHistory: async (userId) => {
    const response = await axios.get(`${API_URL}/loginHistory?userId=${userId}`);
    return response.data;
  },
};

export default profileService;
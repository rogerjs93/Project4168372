import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your actual API URL when moving to a real server

export const profileService = {
  updateAccountInfo: async (userId, data) => {
    // TODO: Implement real server communication
    // const response = await axios.put(`${API_URL}/users/${userId}`, data);
    // return response.data;

    // Mock implementation
    console.log('Updating account info:', data);
    return { success: true, message: 'Account information updated successfully' };
  },

  updatePrivacySettings: async (userId, settings) => {
    // TODO: Implement real server communication
    // const response = await axios.put(`${API_URL}/users/${userId}/privacy`, settings);
    // return response.data;

    // Mock implementation
    console.log('Updating privacy settings:', settings);
    return { success: true, message: 'Privacy settings updated successfully' };
  },

  updateNotificationPreferences: async (userId, preferences) => {
    // TODO: Implement real server communication
    // const response = await axios.put(`${API_URL}/users/${userId}/notifications`, preferences);
    // return response.data;

    // Mock implementation
    console.log('Updating notification preferences:', preferences);
    return { success: true, message: 'Notification preferences updated successfully' };
  },

  updateSecuritySettings: async (userId, settings) => {
    // TODO: Implement real server communication
    // const response = await axios.put(`${API_URL}/users/${userId}/security`, settings);
    // return response.data;

    // Mock implementation
    console.log('Updating security settings:', settings);
    return { success: true, message: 'Security settings updated successfully' };
  },

  getLoginHistory: async (userId) => {
    // TODO: Implement real server communication
    // const response = await axios.get(`${API_URL}/users/${userId}/login-history`);
    // return response.data;

    // Mock implementation
    console.log('Fetching login history for user:', userId);
    return {
      success: true,
      data: [
        { date: '2023-05-01', ip: '192.168.1.1', device: 'Chrome on Windows' },
        { date: '2023-04-28', ip: '192.168.1.2', device: 'Safari on iOS' },
      ]
    };
  },
};

export default profileService;
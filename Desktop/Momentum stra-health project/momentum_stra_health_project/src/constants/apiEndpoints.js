export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
  PROJECTS: '/projects',
  TASKS: '/tasks',
  TEAM: '/team',
  USERS: '/users',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
};

export default API_ENDPOINTS;

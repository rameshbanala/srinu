import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    const { access_token, refresh_token, user } = response.data;
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return response.data;
  },

  // Login user
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token, user } = response.data;
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Get current user info
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    const user = response.data;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  // Get stored user data
  getStoredUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // Google OAuth login
  async googleLogin(credential) {
    const response = await api.post('/auth/google', { credential });
    const { access_token, refresh_token, user } = response.data;
    
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    
    return response.data;
  },
};

export default authService;

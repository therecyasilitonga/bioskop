/**
 * src/services/apiClient.js
 * -----------------------------------------------------------------------
 * Axios HTTP client wrapper. Dilengkapi interceptor otomatis untuk
 * melampirkan Bearer Token JWT dari penyimpanan lokal jika tersedia.
 * -----------------------------------------------------------------------
 */

import axios from 'axios';
import { getStorageItem } from '../storage/storageAdapter';

const API_BASE_URL = 'https://api.auratheater.com/v1'; // Contoh Base URL API Anda nanti

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor Request: Sisipkan token JWT ke Header Otorisasi secara otomatis
apiClient.interceptors.request.use(
  async (config) => {
    const userSession = await getStorageItem('active_user_session');
    if (userSession && userSession.token) {
      config.headers['Authorization'] = `Bearer ${userSession.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response: Tangani error global seperti token kedaluwarsa (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Sesi kedaluwarsa (401 Unauthorized). Silakan login kembali.');
      // Di sini Anda bisa mengarahkan flow untuk logout atau refresh token
    }
    return Promise.reject(error);
  }
);

export default apiClient;

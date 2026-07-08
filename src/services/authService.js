/**
 * src/services/authService.js
 * -----------------------------------------------------------------------
 * Layanan pemrosesan autentikasi akun. Terstruktur siap pakai
 * untuk REST API backend Anda kelak.
 * -----------------------------------------------------------------------
 */

import apiClient from './apiClient';

export const authService = {
  login: async (email, password) => {
    // Jalur Integrasi API Asli:
    // const res = await apiClient.post('/auth/login', { email, password });
    // return res.data;

    // Simulasi Delay Jaringan:
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      user: {
        id: `user_${Date.now()}`,
        fullName: email.split('@')[0].toUpperCase(),
        email: email,
        phoneNumber: '081234567890',
        avatarUrl: null,
        token: 'mock-jwt-token-login',
      }
    };
  },

  register: async (fullName, email, password, phoneNumber) => {
    // const res = await apiClient.post('/auth/register', { fullName, email, password, phoneNumber });
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      user: {
        id: `user_${Date.now()}`,
        fullName,
        email,
        phoneNumber,
        avatarUrl: null,
        token: 'mock-jwt-token-register',
      }
    };
  },

  sendOTP: async (emailOrPhone) => {
    // await apiClient.post('/auth/otp/send', { target: emailOrPhone });
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, message: 'Kode OTP telah dikirim' };
  },

  verifyOTP: async (code) => {
    // await apiClient.post('/auth/otp/verify', { code });
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (code === '1234' || code.length === 4) {
      return { success: true, message: 'Verifikasi berhasil' };
    }
    throw new Error('Kode OTP tidak valid');
  }
};

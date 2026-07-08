/**
 * src/services/bookingService.js
 * -----------------------------------------------------------------------
 * Layanan pemrosesan data bioskop dan pemesanan tiket.
 * -----------------------------------------------------------------------
 */

import { dummyCinemas } from '../data/dummyCinemas';
import apiClient from './apiClient';

export const bookingService = {
  getCinemasByCity: async (city) => {
    // const res = await apiClient.get(`/cinemas?city=${city}`);
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    // Default mock data (cinemas are all Pekanbaru mall based)
    return dummyCinemas;
  },

  createBooking: async (bookingData) => {
    // const res = await apiClient.post('/bookings', bookingData);
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      bookingId: `B-${Date.now()}`,
      message: 'Transaksi pemesanan berhasil diproses',
    };
  }
};

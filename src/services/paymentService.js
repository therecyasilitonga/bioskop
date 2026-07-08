/**
 * src/services/paymentService.js
 * -----------------------------------------------------------------------
 * Layanan pemrosesan metode pembayaran dan transaksi checkout.
 * -----------------------------------------------------------------------
 */

import { dummyPayments } from '../data/dummyPayments';
import apiClient from './apiClient';

export const paymentService = {
  getPaymentMethods: async () => {
    // const res = await apiClient.get('/payments/methods');
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    return dummyPayments;
  },

  processPayment: async (paymentDetails) => {
    // const res = await apiClient.post('/payments/process', paymentDetails);
    // return res.data;

    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      success: true,
      transactionId: `PAY-${Date.now()}`,
      status: 'PAID',
      message: 'Pembayaran dikonfirmasi'
    };
  }
};

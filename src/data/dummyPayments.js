/**
 * src/data/dummyPayments.js
 * -----------------------------------------------------------------------
 * Data dummy untuk metode pembayaran (E-Wallet, Virtual Account, dll).
 * -----------------------------------------------------------------------
 */

export const dummyPayments = [
  {
    id: 'pay_dana',
    name: 'DANA E-Wallet',
    category: 'E-Wallet',
    icon: 'wallet',
    color: '#008CFF',
    instructions: 'Pastikan saldo DANA Anda mencukupi. Anda akan diarahkan ke halaman otentikasi DANA.'
  },
  {
    id: 'pay_ovo',
    name: 'OVO Wallet',
    category: 'E-Wallet',
    icon: 'wallet',
    color: '#4C2A86',
    instructions: 'Ketikkan nomor HP terdaftar OVO Anda pada halaman verifikasi selanjutnya.'
  },
  {
    id: 'pay_gopay',
    name: 'GoPay',
    category: 'E-Wallet',
    icon: 'wallet',
    color: '#00AED6',
    instructions: 'Akan membuka aplikasi Gojek Anda untuk verifikasi PIN pembayaran.'
  },
  {
    id: 'pay_bca',
    name: 'BCA Virtual Account',
    category: 'Virtual Account',
    icon: 'bank',
    color: '#005CA9',
    instructions: 'Transfer melalui ATM BCA, KlikBCA, atau m-BCA ke nomor VA yang akan diterbitkan.'
  },
  {
    id: 'pay_mandiri',
    name: 'Mandiri Virtual Account',
    category: 'Virtual Account',
    icon: 'bank',
    color: '#FDB813',
    instructions: 'Transfer melalui Livin\' by Mandiri atau ATM Mandiri.'
  },
  {
    id: 'pay_bni',
    name: 'BNI Virtual Account',
    category: 'Virtual Account',
    icon: 'bank',
    color: '#FF6600',
    instructions: 'Transfer melalui m-Banking BNI, BNI Internet Banking, atau ATM BNI.'
  },
  {
    id: 'pay_bri',
    name: 'BRI Virtual Account',
    category: 'Virtual Account',
    icon: 'bank',
    color: '#00529C',
    instructions: 'Transfer melalui BRIMO, Internet Banking BRI, atau ATM BRI.'
  },
  {
    id: 'pay_bca_manual',
    name: 'Transfer Bank BCA (Konfirmasi Manual)',
    category: 'Transfer Bank',
    icon: 'bank',
    color: '#005CA9',
    instructions: 'Transfer dana ke rekening BCA: 8690123456 a.n. Aura Theater. Harap simpan dan upload bukti transfer.'
  },
  {
    id: 'pay_mandiri_manual',
    name: 'Transfer Bank Mandiri (Konfirmasi Manual)',
    category: 'Transfer Bank',
    icon: 'bank',
    color: '#FDB813',
    instructions: 'Transfer dana ke rekening Mandiri: 1120012345678 a.n. Aura Theater. Harap simpan dan upload bukti transfer.'
  }
];

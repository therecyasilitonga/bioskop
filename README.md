# CinePekan - Cinema Booking App (Expo SDK 54)

**CinePekan** adalah aplikasi mobile pemesanan tiket bioskop terintegrasi khusus untuk kota Pekanbaru. Desain antarmuka dirancang dengan tema premium "Malam Premiere" (Dark Maroon background & Gold highlights) terinspirasi dari gaya visual TIX ID dan M-TIX.

Aplikasi ini kompatibel 100% dengan **Expo Go SDK 54 (versi 54.0.8)** sehingga dapat langsung dijalankan dan diuji di ponsel pintar (Android/iOS) Anda tanpa memerlukan custom native builds.

---

Splash
---


 <img width="234" height="491" alt="image" src="https://github.com/user-attachments/assets/806a9033-02a3-4f2a-926d-fb7b5f7b984c" />

Akun baru pengguna
---


<img width="309" height="634" alt="image" src="https://github.com/user-attachments/assets/4cf07871-869c-4ee6-afb3-27547e8bbcaf" />
<img width="334" height="635" alt="image" src="https://github.com/user-attachments/assets/f1a1c1fe-f22b-4fe3-b3d0-c564a02a5896" />
<img width="310" height="629" alt="image" src="https://github.com/user-attachments/assets/2342f2ab-d789-410d-b20a-d1092249bd9c" />



Halaman login
---
<img width="278" height="579" alt="image" src="https://github.com/user-attachments/assets/70c7e449-1c00-42c3-9933-70981b8ea9cb" />

lupa kata sandi
---
 <img width="300" height="623" alt="image" src="https://github.com/user-attachments/assets/f25eec79-6eee-4d78-aaa0-1b96d79c27bb" />


Buat akun
---
 <img width="225" height="495" alt="image" src="https://github.com/user-attachments/assets/843c9ad7-03af-434f-8f4f-8755ba109a56" />

Beranda
---
<img width="263" height="550" alt="image" src="https://github.com/user-attachments/assets/1a78f5a6-9e22-4ab3-8b6b-8c924d20fce1" />

membantu mencari film dengan voice
---
 <img width="323" height="669" alt="image" src="https://github.com/user-attachments/assets/70d161cb-dd89-43d1-9b7b-1c0e1a5fe601" />

Halaman tiket
---
tiket kosong karena belum pernah membeli tiket, karna pengguna baru
<img width="249" height="509" alt="image" src="https://github.com/user-attachments/assets/29212ae0-6bc0-45f5-b192-8afae6aa2a1e" />


Halaman profile saya
---
<img width="315" height="659" alt="image" src="https://github.com/user-attachments/assets/6d94ef9b-1c91-4b18-b5ca-9ff3e8579c6b" />
 


---

## Fitur Utama

1. **Lokasi & Mitra Mall Pekanbaru**:
   - Manajemen lokasi default di kota Pekanbaru.
   - Pilihan mall default/utama terintegrasi: **Mal SKA (SKA Mall XXI)**, **Living World (Living World CGV)**, **Transmart (Transmart CGV)**, dan **Ramayana (Ramayana Cineplex)**.
2. **Autentikasi & Multi-Akun (Tambah Akun)**:
   - Alur Masuk (Login), Daftar (Register), Lupa Kata Sandi, dan Verifikasi OTP.
   - Fitur **"Ganti & Tambah Akun"** (mirip Instagram/Gmail) yang memungkinkan Anda mendaftarkan lebih dari satu akun secara lokal dan beralih akun secara instan tanpa perlu memasukkan password lagi.
3. **Aksesibilitas Mode Gelap & Terang**:
   - Menu pilihan tema adaptif: Terang (Light Mode), Gelap (Dark Mode), atau Otomatis mengikuti konfigurasi sistem perangkat.
4. **Pilihan Bahasa**:
   - Dukungan dwi-bahasa terjemahan penuh: **Bahasa Indonesia (ID)** dan **English (EN)**.
5. **Pencarian Film Berbasis Suara (Voice Search)**:
   - Fitur simulasi voice-to-text yang interaktif dilengkapi dengan modal visual gelombang suara (soundwave) untuk mempermudah pencarian film.
6. **Alur Transaksi & Pemilihan Kursi**:
   - Alur booking terstruktur: Pilih Bioskop -> Pilih Jadwal & Jam -> Pilih Kursi (Layout G-A interaktif dengan gang/aisle) -> Ringkasan Pesanan.
7. **Pilihan Metode Pembayaran**:
   - Dukungan E-Wallet (DANA, OVO, GoPay) dan Bank Virtual Account (BCA, Mandiri).
8. **E-Tiket & Kode Batang (Barcode)**:
   - Riwayat pemesanan yang disimpan secara persisten di memori perangkat.
   - Barcode tiket yang digambar secara dinamis menggunakan **React Native SVG** (tanpa font eksternal) untuk discan di loket bioskop.

---

##  Struktur Proyek (Folder Structure)

```text
cinepekan/
├── App.js                   # Entry point aplikasi (konfigurasi providers & navigation)
├── app.json                 # Konfigurasi Expo (Slug, Icon, Splash, dll)
├── package.json             # Dependensi utama (Expo SDK 54, React Navigation, SVG, Axios)
├── babel.config.js          # Babel transpiler preset
├── index.js                 # Bootstrapping React Native
└── src/
    ├── theme/               # Tokens warna gelap-terang (tokens.js) & ThemeContext
    ├── storage/             # storageAdapter.js (AsyncStorage wrapper dengan MMKV toggle ready)
    ├── i18n/                # translations.js (Kamus ID / EN)
    ├── context/             # State global (AuthContext, BookingContext, LocationContext, LanguageContext)
    ├── services/            # API Service Layer (apiClient.js axios, auth, movie, booking, payment)
    ├── data/                # Sumber dummy data (dummyMovies, dummyCinemas, dummyPromos, dummyPayments)
    ├── hooks/               # useVoiceSearch.js (Hook simulasi input suara)
    ├── components/          # Komponen UI Reusable (Button, Input, SeatMap, TicketBarcode, dll)
    ├── navigation/          # RootNavigator.js (Stack & Bottom Tabs)
    └── screens/             # Semua layar aplikasi terbagi per modul
```

---

## Langkah Menjalankan Aplikasi

Pastikan Anda telah menginstal **Node.js** di komputer Anda dan aplikasi **Expo Go** pada ponsel Android atau iOS Anda.

1. **Ekstrak/Buka Proyek**:
   Buka folder proyek ini lewat Terminal atau Command Prompt:
   ```bash
   cd "d:/semester 6/imk/bioskop"
   ```

2. **Instal Dependensi**:
   Semua modul yang dideklarasikan di `package.json` sudah diinstal secara otomatis. Jika Anda ingin melakukan instalasi ulang:
   ```bash
   npm install
   ```

3. **Jalankan Expo Server**:
   Jalankan server bundler lokal:
   ```bash
   npm start
   ```
   *atau jika Anda ingin langsung membuka Android Emulator / iOS Simulator:*
   ```bash
   npm run android
   # atau
   npm run ios
   ```

4. **Hubungkan Ponsel**:
   - Hubungkan ponsel Anda ke jaringan Wi-Fi yang sama dengan komputer Anda.
   - Buka aplikasi **Expo Go**.
   - Scan kode QR yang muncul di terminal komputer Anda menggunakan kamera bawaan (iOS) atau fitur scan QR di aplikasi Expo Go (Android).
   - Tunggu proses bundling selesai (100%), dan aplikasi siap digunakan!

---

## 🔗 Panduan Integrasi REST API Backend

Arsitektur aplikasi ini telah dipisahkan ke dalam modul data & layanan jaringan terpisah:
- **Client HTTP**: [apiClient.js](file:///d:/semester%206/imk/bioskop/src/services/apiClient.js) telah dikonfigurasi menggunakan `axios` dengan interceptor otomatis yang membaca JWT Token dari `active_user_session` di memori persisten.
- **Service Layer**: File services di [src/services/](file:///d:/semester%206/imk/bioskop/src/services) siap dihubungkan ke backend nyata. Anda hanya perlu menghapus komentar bagian `apiClient` dan menghapus logic simulasi dummy.

*Contoh modifikasi pada `movieService.js` untuk integrasi backend nyata:*
```javascript
// Sebelum:
getNowShowing: async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyMovies.filter(m => m.status === 'NOW_SHOWING');
}

// Sesudah (Hubungkan API asli):
getNowShowing: async () => {
  const res = await apiClient.get('/movies/now-showing');
  return res.data.movies; // Sesuai bentuk response API Anda
}
```

---
**Catatan Mengenai react-native-mmkv**:
Kode pembacaan data cepat menggunakan MMKV sudah diintegrasikan di dalam [storageAdapter.js](file:///d:/semester%206/imk/bioskop/src/storage/storageAdapter.js) secara kondisional dalam komentar. Jika Anda beralih ke Bare/Dev Client, cukup aktifkan baris MMKV dan nonaktifkan AsyncStorage.

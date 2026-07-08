/**
 * src/storage/storageAdapter.js
 * -----------------------------------------------------------------------
 * Lapisan abstraksi penyimpanan (storage adapter).
 * 
 * Di Expo Go, react-native-mmkv tidak dapat berjalan secara default karena
 * merupakan native module C++ JSI yang membutuhkan custom dev client.
 * Oleh karena itu, default adaptor ini menggunakan AsyncStorage.
 * 
 * JIKA ANDA MENGGUNAKAN STANDALONE BUILD / DEV CLIENT:
 * Anda dapat mengaktifkan kode MMKV di bawah dan menonaktifkan AsyncStorage.
 * -----------------------------------------------------------------------
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================
// OPSI MMKV (Aktifkan ini jika menggunakan Dev Client / Bare React Native)
// ==========================================
// import { MMKV } from 'react-native-mmkv';
// const storage = new MMKV();
// ==========================================

export async function getStorageItem(key) {
  try {
    // Jalur MMKV:
    // const val = storage.getString(key);
    // return val ? JSON.parse(val) : null;

    // Jalur AsyncStorage (Default Expo Go):
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch (error) {
    console.error(`Error reading key "${key}" from storage:`, error);
    return null;
  }
}

export async function setStorageItem(key, value) {
  try {
    const stringValue = JSON.stringify(value);
    // Jalur MMKV:
    // storage.set(key, stringValue);

    // Jalur AsyncStorage (Default Expo Go):
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`Error writing key "${key}" to storage:`, error);
  }
}

export async function removeStorageItem(key) {
  try {
    // Jalur MMKV:
    // storage.delete(key);

    // Jalur AsyncStorage (Default Expo Go):
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from storage:`, error);
  }
}

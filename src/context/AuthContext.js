/**
 * src/context/AuthContext.js
 * -----------------------------------------------------------------------
 * React Context untuk autentikasi (login, register, logout), edit profil,
 * dan fitur multi-akun ("tambah akun", "ganti akun") yang menyimpan
 * info akun di perangkat secara persisten.
 * -----------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../storage/storageAdapter';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const startTime = Date.now();
      try {
        const activeUser = await getStorageItem('active_user_session');
        const savedAccs = await getStorageItem('saved_accounts_list');
        
        if (activeUser) {
          setUser(activeUser);
        }
        if (savedAccs) {
          setSavedAccounts(savedAccs);
        }
      } catch (err) {
        console.error('Error initializing auth state:', err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 2000 - elapsed);
        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    }
    initAuth();
  }, []);

  // Simulates login
  async function login(email, password) {
    setIsLoading(true);
    try {
      // Mock validation
      if (!email || !password) {
        throw new Error('Email dan password harus diisi');
      }

      // Default mock user
      const mockUser = {
        id: email.toLowerCase() === 'admin@gmail.com' ? 'user_admin' : `user_${Date.now()}`,
        fullName: email.split('@')[0].toUpperCase(),
        email: email,
        phoneNumber: '081234567890',
        avatarUrl: null,
        token: 'mock-jwt-token-xyz',
      };

      await setUserSession(mockUser);
      return mockUser;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Simulates login specifically for adding an secondary account
  async function addAccountLogin(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email dan password harus diisi');
      }
      const newAcc = {
        id: `user_${Date.now()}`,
        fullName: email.split('@')[0].toUpperCase(),
        email: email,
        phoneNumber: '089988776655',
        avatarUrl: null,
        token: 'mock-jwt-token-secondary',
      };

      // Add to saved accounts
      const updatedAccounts = [...savedAccounts];
      const existIdx = updatedAccounts.findIndex((a) => a.id === newAcc.id || a.email.toLowerCase() === newAcc.email.toLowerCase());
      if (existIdx >= 0) {
        updatedAccounts[existIdx] = newAcc;
      } else {
        updatedAccounts.push(newAcc);
      }
      setSavedAccounts(updatedAccounts);
      await setStorageItem('saved_accounts_list', updatedAccounts);

      // Make it active
      setUser(newAcc);
      await setStorageItem('active_user_session', newAcc);
      return newAcc;
    } catch (err) {
      throw err;
    }
  }

  // Helper to establish active user session
  async function setUserSession(userData) {
    setUser(userData);
    await setStorageItem('active_user_session', userData);

    // Save into list of accounts on this device
    const updatedAccounts = [...savedAccounts];
    const index = updatedAccounts.findIndex((acc) => acc.id === userData.id);
    if (index >= 0) {
      updatedAccounts[index] = userData;
    } else {
      updatedAccounts.push(userData);
    }
    setSavedAccounts(updatedAccounts);
    await setStorageItem('saved_accounts_list', updatedAccounts);
  }

  // Register
  async function register(fullName, email, password, phoneNumber) {
    setIsLoading(true);
    try {
      if (!fullName || !email || !password) {
        throw new Error('Nama, email dan password wajib diisi');
      }
      const newUser = {
        id: `user_${Date.now()}`,
        fullName,
        email,
        phoneNumber: phoneNumber || '081200000000',
        avatarUrl: null,
        token: 'mock-jwt-token-register',
      };
      await setUserSession(newUser);
      return newUser;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  // Edit/Update profile info
  async function updateProfile(updatedData) {
    if (!user) throw new Error('Tidak ada sesi pengguna aktif');
    const updatedUser = {
      ...user,
      ...updatedData,
    };
    setUser(updatedUser);
    await setStorageItem('active_user_session', updatedUser);

    // Update in list
    const list = savedAccounts.map((acc) => (acc.id === user.id ? updatedUser : acc));
    setSavedAccounts(list);
    await setStorageItem('saved_accounts_list', list);
  }

  // Switch between saved accounts
  async function switchToAccount(accountId) {
    const target = savedAccounts.find((a) => a.id === accountId);
    if (!target) throw new Error('Akun tidak ditemukan di perangkat ini');
    setUser(target);
    await setStorageItem('active_user_session', target);
  }

  // Remove saved account from device
  async function removeAccount(accountId) {
    const list = savedAccounts.filter((a) => a.id !== accountId);
    setSavedAccounts(list);
    await setStorageItem('saved_accounts_list', list);

    // If we removed the active account, switch to another or logout
    if (user?.id === accountId) {
      if (list.length > 0) {
        setUser(list[0]);
        await setStorageItem('active_user_session', list[0]);
      } else {
        setUser(null);
        await setStorageItem('active_user_session', null);
      }
    }
  }

  // Logout current user
  async function logout() {
    setUser(null);
    await setStorageItem('active_user_session', null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        savedAccounts,
        isLoading,
        login,
        addAccountLogin,
        register,
        updateProfile,
        switchToAccount,
        removeAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

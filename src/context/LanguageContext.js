/**
 * src/context/LanguageContext.js
 * -----------------------------------------------------------------------
 * React Context untuk lokalisasi bahasa (Indonesia / Inggris).
 * Menyediakan fungsi helper `t(key)` untuk menerjemahkan string UI.
 * -----------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { getStorageItem, setStorageItem } from '../storage/storageAdapter';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('id'); // Default Indonesian

  useEffect(() => {
    async function loadLanguage() {
      const savedLang = await getStorageItem('app_lang');
      if (savedLang) {
        setLanguageState(savedLang);
      }
    }
    loadLanguage();
  }, []);

  async function setLanguage(langCode) {
    setLanguageState(langCode);
    await setStorageItem('app_lang', langCode);
  }

  // Translation function helper
  function t(key) {
    const activeDict = translations[language] || translations.id;
    return activeDict[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

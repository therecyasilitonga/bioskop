/**
 * src/theme/ThemeContext.js
 * -----------------------------------------------------------------------
 * React Context untuk manajemen tema tampilan. Mendukung mode terang (light),
 * gelap (dark), dan mengikuti pengaturan system.
 * -----------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './tokens';
import { getStorageItem, setStorageItem } from '../storage/storageAdapter';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState('system'); // 'light' | 'dark' | 'system'
  const [activeTheme, setActiveTheme] = useState(colors.dark);

  useEffect(() => {
    // Load theme from storage on start
    async function loadTheme() {
      const savedTheme = await getStorageItem('theme_mode');
      if (savedTheme) {
        setThemeModeState(savedTheme);
      }
    }
    loadTheme();
  }, []);

  useEffect(() => {
    // Determine active colors based on themeMode
    let selectedColors = colors.dark;
    if (themeMode === 'light') {
      selectedColors = colors.light;
    } else if (themeMode === 'dark') {
      selectedColors = colors.dark;
    } else {
      // system
      selectedColors = systemColorScheme === 'light' ? colors.light : colors.dark;
    }
    // Mix shared colors with specific mode colors
    setActiveTheme({
      ...colors,
      ...selectedColors,
    });
  }, [themeMode, systemColorScheme]);

  async function setThemeMode(mode) {
    setThemeModeState(mode);
    await setStorageItem('theme_mode', mode);
  }

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

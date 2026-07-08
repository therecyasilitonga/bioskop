/**
 * App.js
 * -----------------------------------------------------------------------
 * Shell Utama Aplikasi CinePekan.
 * Membungkus RootNavigator dengan seluruh Provider Konteks Global:
 * Theme, Language, Location, Auth, dan Booking.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { LocationProvider } from './src/context/LocationContext';
import { AuthProvider } from './src/context/AuthContext';
import { BookingProvider } from './src/context/BookingContext';
import RootNavigator from './src/navigation/RootNavigator';

function AppShell() {
  const { theme } = useAppTheme();

  return (
    <NavigationContainer>
      {/* Dynamic StatusBar styling depending on active Dark/Light theme mode */}
      <StatusBar style={theme.statusBar} backgroundColor={theme.bg} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <AuthProvider>
            <BookingProvider>
              <AppShell />
            </BookingProvider>
          </AuthProvider>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * src/screens/Splash/SplashScreen.js
 * -----------------------------------------------------------------------
 * Layar pembuka (Splash Screen) dengan tema "Malam Premiere".
 * Menampilkan logo Aura Theater, tagline lokal, dan loading indicator.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';

import Icon from '../../components/Icon';

export default function SplashScreen() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.logoContainer}>
        <Icon name="ticket" color={theme.primary} size={72} style={{ marginBottom: spacing.md }} />
        <Text style={[styles.logoText, { color: theme.primary }]}>Aura Theater</Text>
        <Text style={[styles.tagline, { color: theme.textMuted }]}>
          Tiket Bioskop Pekanbaru Terbaik Anda
        </Text>
      </View>

      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>
          Menyiapkan premiere...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logoEmoji: {
    fontSize: 72,
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 2,
  },
  tagline: {
    ...typography.body,
    marginTop: spacing.sm,
    fontWeight: '500',
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loadingText: {
    ...typography.caption,
    marginTop: spacing.md,
  },
});

/**
 * src/screens/Settings/AboutScreen.js
 * -----------------------------------------------------------------------
 * Layar Tentang Aplikasi (About Screen).
 * Menampilkan versi perangkat lunak dan lisensi legal.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Icon from '../../components/Icon';

export default function AboutScreen() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.logoBox}>
        <Icon name="film" color={theme.primary} size={64} style={{ marginBottom: spacing.sm }} />
        <Text style={[typography.h1, { color: theme.primary, letterSpacing: 1 }]}>Aura Theater</Text>
        <Text style={[typography.caption, { color: theme.textMuted }]}>Versi 1.0.0 (Expo SDK 54)</Text>
      </View>

      <View style={styles.bodyBox}>
        <Text style={[typography.body, { color: theme.text, textAlign: 'center', lineHeight: 22 }]}>
          Aura Theater adalah aplikasi pemesanan tiket bioskop terintegrasi untuk Kota Pekanbaru. Kami berkomitmen memberikan pengalaman pemesanan tiket bioskop termudah bagi seluruh masyarakat Pekanbaru di mall favorit seperti SKA, Living World, Transmart, dan Plaza Ramayana.
        </Text>
      </View>

      <Text style={[typography.tiny, { color: theme.textMuted }]}>
        © {new Date().getFullYear()} Aura Theater Inc. Hak Cipta Dilindungi.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl * 2,
    paddingHorizontal: spacing.xl,
  },
  logoBox: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.xs,
  },
  bodyBox: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});

/**
 * src/screens/Settings/PrivacySecurityScreen.js
 * -----------------------------------------------------------------------
 * Layar Privasi & Keamanan (Privacy & Security Screen).
 * Menyediakan saklar simulasi untuk perlindungan dua langkah & keamanan data.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Pressable, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';

export default function PrivacySecurityScreen() {
  const { theme } = useAppTheme();

  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(true);

  const handlePasswordChange = () => {
    Alert.alert('Ubah Kata Sandi', 'Simulasi: Tautan pengubahan kata sandi telah dikirimkan ke email Anda.');
  };

  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.container}>
      
      <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>KEAMANAN AKUN</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: theme.divider }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>Autentikasi 2-Langkah</Text>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Amankan akun Anda dengan kode OTP SMS tambahan.</Text>
          </View>
          <Switch
            value={twoFactor}
            onValueChange={setTwoFactor}
            trackColor={{ false: theme.divider, true: theme.primary }}
            thumbColor={twoFactor ? theme.primaryText : '#F4F3F4'}
          />
        </View>

        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: theme.divider }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>Sidik Jari / Face ID</Text>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Gunakan sensor biometrik untuk login cepat.</Text>
          </View>
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            trackColor={{ false: theme.divider, true: theme.primary }}
            thumbColor={biometric ? theme.primaryText : '#F4F3F4'}
          />
        </View>

        <Pressable onPress={handlePasswordChange} style={styles.row}>
          <Text style={[typography.bodyStrong, { color: theme.text, flex: 1 }]}>Ubah Kata Sandi</Text>
          <Text style={{ color: theme.textMuted }}>›</Text>
        </Pressable>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.textMuted, marginTop: spacing.xl }]}>PRIVASI & DATA</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: theme.divider }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>Bagikan Data Penggunaan</Text>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Bantu kami meningkatkan kualitas layanan Aura Theater.</Text>
          </View>
          <Switch
            value={true}
            disabled
            trackColor={{ false: theme.divider, true: theme.primary }}
          />
        </View>

        <Pressable
          onPress={() => Alert.alert('Kebijakan Privasi', 'Kebijakan privasi Aura Theater tersertifikasi aman.')}
          style={styles.row}
        >
          <Text style={[typography.bodyStrong, { color: theme.text, flex: 1 }]}>Ketentuan Layanan & Privasi</Text>
          <Text style={{ color: theme.textMuted }}>›</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
});

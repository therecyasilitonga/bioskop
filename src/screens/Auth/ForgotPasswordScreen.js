/**
 * src/screens/Auth/ForgotPasswordScreen.js
 * -----------------------------------------------------------------------
 * Layar Lupa Kata Sandi (Forgot Password).
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { authService } from '../../services/authService';

export default function ForgotPasswordScreen({ navigation }) {
  const { theme } = useAppTheme();
  const [target, setTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (!target) {
      setError('Harap masukkan alamat email atau nomor telepon Anda');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await authService.sendOTP(target);
      Alert.alert(
        'OTP Dikirim',
        'Kode verifikasi OTP telah dikirim. Gunakan kode "1234" untuk simulasi.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OTP', { target }),
          },
        ]
      );
    } catch (err) {
      Alert.alert('Gagal Mengirim OTP', err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.lg }]}>
        Masukkan email terdaftar Anda. Kami akan mengirimkan kode verifikasi OTP 4 digit untuk menyetel ulang kata sandi Anda.
      </Text>

      <Input
        label="Email atau Nomor Telepon"
        placeholder="contoh: budi@gmail.com"
        value={target}
        onChangeText={(text) => {
          setTarget(text);
          if (error) setError('');
        }}
        error={error}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title="Kirim Kode Verifikasi"
        onPress={handleSendOTP}
        loading={loading}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  btn: {
    marginTop: spacing.md,
  },
});

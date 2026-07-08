/**
 * src/screens/Auth/OTPScreen.js
 * -----------------------------------------------------------------------
 * Layar Verifikasi OTP (One-Time Password) dengan input kode.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { authService } from '../../services/authService';

export default function OTPScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const target = route.params?.target || 'kontak Anda';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (otp.length < 4) {
      setError('Masukkan 4 digit kode verifikasi');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await authService.verifyOTP(otp);
      Alert.alert(
        'Verifikasi Sukses',
        'Verifikasi berhasil. Silakan masuk kembali menggunakan kata sandi Anda.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (err) {
      setError(err.message || 'OTP Salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.lg }]}>
        Masukkan 4 digit kode OTP yang dikirimkan ke <Text style={{ color: theme.text, fontWeight: '600' }}>{target}</Text>
      </Text>

      <Input
        label="Kode Verifikasi (OTP)"
        placeholder="Ketik 4-digit kode (e.g. 1234)"
        value={otp}
        onChangeText={(text) => {
          setOtp(text.slice(0, 4));
          if (error) setError('');
        }}
        error={error}
        keyboardType="number-pad"
        maxLength={4}
        style={styles.input}
      />

      <Button
        title="Verifikasi OTP"
        onPress={handleVerify}
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
  input: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
  btn: {
    marginTop: spacing.md,
  },
});

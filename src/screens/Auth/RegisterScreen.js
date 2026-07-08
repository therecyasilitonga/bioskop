/**
 * src/screens/Auth/RegisterScreen.js
 * -----------------------------------------------------------------------
 * Layar pendaftaran akun baru (Register Screen).
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { theme } = useAppTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const tempErrors = {};
    if (!fullName) tempErrors.fullName = 'Nama lengkap tidak boleh kosong';
    if (!email) tempErrors.email = 'Email tidak boleh kosong';
    if (!phone) tempErrors.phone = 'Nomor telepon tidak boleh kosong';
    if (!password || password.length < 6) {
      tempErrors.password = 'Kata sandi minimal 6 karakter';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await register(fullName, email, password, phone);
      Alert.alert('Pendaftaran Berhasil', 'Akun Anda telah berhasil dibuat!');
    } catch (err) {
      Alert.alert('Gagal Daftar', err.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.bg }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.lg }]}>
          Silakan isi detail data diri Anda untuk membuat akun Aura Theater baru.
        </Text>

        <Input
          label="Nama Lengkap"
          placeholder="contoh: Budi Setiawan"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
          }}
          error={errors.fullName}
        />

        <Input
          label="Alamat Surel (Email)"
          placeholder="contoh: budi@gmail.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Nomor Telepon"
          placeholder="contoh: 08123456789"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
          }}
          error={errors.phone}
          keyboardType="phone-pad"
        />

        <Input
          label="Kata Sandi (Min. 6 Karakter)"
          placeholder="Buat kata sandi aman"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          error={errors.password}
          secureTextEntry
        />

        <Button
          title="Daftar Akun Baru"
          onPress={handleRegister}
          loading={loading}
          style={styles.registerBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  registerBtn: {
    marginTop: spacing.md,
  },
});

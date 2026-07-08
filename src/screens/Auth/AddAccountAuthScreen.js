/**
 * src/screens/Auth/AddAccountAuthScreen.js
 * -----------------------------------------------------------------------
 * Layar Masuk Akun Tambahan (Add Account Auth Screen).
 * Memasukkan email/password untuk menambah akun baru ke daftar savedAccounts
 * perangkat tanpa melupakan akun yang sudah masuk sebelumnya.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function AddAccountAuthScreen({ navigation }) {
  const { addAccountLogin } = useAuth();
  const { theme } = useAppTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddAccount = async () => {
    const tempErrors = {};
    if (!email) tempErrors.email = 'Email tidak boleh kosong';
    if (!password) tempErrors.password = 'Kata sandi tidak boleh kosong';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const addedUser = await addAccountLogin(email, password);
      Alert.alert(
        'Akun Ditambahkan',
        `Berhasil masuk sebagai ${addedUser.fullName}. Akun telah disimpan di perangkat ini.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Go back to the AccountListScreen or profile
              navigation.pop();
            },
          },
        ]
      );
    } catch (err) {
      Alert.alert('Gagal Menambah Akun', err.message || 'Surel atau kata sandi salah.');
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
        <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.xl }]}>
          Masukkan surel dan kata sandi akun Aura Theater Anda yang lain untuk didaftarkan pada perangkat ini.
        </Text>

        <Input
          label="Alamat Surel (Email)"
          placeholder="contoh: akunbaru@gmail.com"
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
          label="Kata Sandi (Password)"
          placeholder="Masukkan kata sandi akun tambahan"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          error={errors.password}
          secureTextEntry
        />

        <Button
          title="Masuk & Simpan Akun"
          onPress={handleAddAccount}
          loading={loading}
          style={styles.btn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  btn: {
    marginTop: spacing.md,
  },
});

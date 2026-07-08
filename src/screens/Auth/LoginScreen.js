/**
 * src/screens/Auth/LoginScreen.js
 * -----------------------------------------------------------------------
 * Layar Masuk (Login Screen).
 * Menghubungkan form input ke AuthContext.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { theme } = useAppTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
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
      await login(email, password);
      // AuthContext will trigger state change, changing RootNavigator to Authenticated
    } catch (err) {
      Alert.alert('Gagal Masuk', err.message || 'Surel atau kata sandi Anda salah.');
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
        <View style={styles.header}>
          <Icon name="film" color={theme.primary} size={64} style={{ marginBottom: spacing.sm }} />
          <Text style={[styles.title, { color: theme.text }]}>Aura Theater</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Masuk untuk menjelajahi film terpopuler di Pekanbaru
          </Text>
        </View>

        <View style={styles.form}>
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
            label="Kata Sandi (Password)"
            placeholder="Masukkan kata sandi Anda"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            secureTextEntry
          />

          <Pressable
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotBtn}
          >
            <Text style={[styles.forgotText, { color: theme.primary }]}>Lupa Kata Sandi?</Text>
          </Pressable>

          <Button
            title="Masuk"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: theme.textMuted }}>Belum punya akun? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerText, { color: theme.primary }]}>Daftar Sekarang</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 54,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  form: {
    marginBottom: spacing.xl,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    ...typography.bodyStrong,
  },
  loginBtn: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    ...typography.bodyStrong,
  },
});

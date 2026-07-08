/**
 * src/screens/Profile/EditProfileScreen.js
 * -----------------------------------------------------------------------
 * Layar Edit Profil (Edit Profile Screen).
 * Memperbarui info profil pengguna terdaftar secara persisten.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { spacing } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function EditProfileScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const tempErrors = {};
    if (!fullName) tempErrors.fullName = 'Nama tidak boleh kosong';
    if (!email) tempErrors.email = 'Email tidak boleh kosong';
    if (!phone) tempErrors.phone = 'Nomor HP tidak boleh kosong';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    Alert.alert(
      'Simpan Perubahan',
      'Apakah Anda yakin ingin menyimpan perubahan data profil Anda?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya, Simpan', onPress: submitSave }
      ]
    );
  };

  const submitSave = async () => {
    setErrors({});
    setLoading(true);
    try {
      await updateProfile({
        fullName,
        email,
        phoneNumber: phone,
      });
      Alert.alert('Sukses', 'Profil berhasil diperbarui.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Gagal', err.message || 'Terjadi kesalahan saat memperbarui profil.');
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
        <Input
          label="Nama Lengkap"
          placeholder="Ketik nama lengkap Anda"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
          }}
          error={errors.fullName}
        />

        <Input
          label="Alamat Surel (Email)"
          placeholder="Ketik alamat surel Anda"
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
          placeholder="Ketik nomor telepon Anda"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
          }}
          error={errors.phone}
          keyboardType="phone-pad"
        />

        <Button
          title={t('saveChanges')}
          onPress={handleSave}
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

/**
 * src/screens/Profile/ProfileScreen.js
 * -----------------------------------------------------------------------
 * Layar utama tab "Profil": menampilkan info akun aktif dan daftar menu
 * navigasi ke Edit Profil, Privasi & Keamanan, Bantuan, Pengaturan,
 * Ganti Akun/Tambah Akun, serta tombol Keluar (logout).
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { useAuth } from '../../context/AuthContext';
import Icon from '../../components/Icon';

const MENU_SECTIONS = [
  {
    title: 'Akun',
    items: [
      { key: 'editProfile', icon: 'edit', label: 'Edit Profil', route: 'EditProfile' },
      { key: 'switchAccount', icon: 'profile', label: 'Ganti / Tambah Akun', route: 'AccountList' },
      { key: 'history', icon: 'ticket', label: 'Riwayat Pemesanan', route: 'TicketsTabRedirect' },
    ],
  },
  {
    title: 'Preferensi',
    items: [
      { key: 'settings', icon: 'settings', label: 'Pengaturan Tampilan & Bahasa', route: 'AppSettings' },
      { key: 'location', icon: 'location', label: 'Lokasi', route: 'LocationSelect' },
    ],
  },
  {
    title: 'Lainnya',
    items: [
      { key: 'privacy', icon: 'lock', label: 'Privasi & Keamanan', route: 'PrivacySecurity' },
      { key: 'help', icon: 'help', label: 'Bantuan', route: 'Help' },
      { key: 'about', icon: 'about', label: 'Tentang Aplikasi', route: 'About' },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar dari akun ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: logout },
    ]);
  };

  const handleMenuPress = (route) => {
    if (route === 'TicketsTabRedirect') {
      navigation.navigate('MainTabs', { screen: 'Tickets' });
      return;
    }
    navigation.navigate(route);
  };

  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.cardAlt }]}>
          {user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatarImg} />
          ) : (
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.primary }}>
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          )}
        </View>
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <Text style={[typography.h2, { color: theme.text }]}>{user?.fullName || 'Pengguna'}</Text>
          <Text style={[typography.caption, { color: theme.textMuted }]}>{user?.email}</Text>
        </View>
      </View>

      {MENU_SECTIONS.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={[typography.caption, { color: theme.textMuted, marginBottom: spacing.sm }]}>
            {section.title.toUpperCase()}
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            {section.items.map((item, idx) => (
              <Pressable
                key={item.key}
                onPress={() => handleMenuPress(item.route)}
                style={[
                  styles.menuRow,
                  idx < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.divider },
                ]}
              >
                <Icon name={item.icon} color={theme.primary} size={18} style={{ marginRight: spacing.md }} />
                <Text style={[typography.body, { color: theme.text, flex: 1 }]}>{item.label}</Text>
                <Icon name="chevron-right" color={theme.textMuted} size={14} />
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      <Pressable onPress={handleLogout} style={[styles.logoutButton, { borderColor: theme.danger }]}>
        <Text style={[typography.bodyStrong, { color: theme.danger }]}>{t('logout')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%' },
  section: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  card: { borderRadius: radius.md, overflow: 'hidden' },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  logoutButton: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
});

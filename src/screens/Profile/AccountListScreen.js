/**
 * screens/Profile/AccountListScreen.js
 * -----------------------------------------------------------------------
 * Layar pengelolaan multi-akun, mirip fitur "Ganti Akun" pada Gmail/
 * Instagram. Menampilkan seluruh akun yang pernah login di perangkat
 * ini, dengan opsi untuk:
 *   - Beralih ke akun lain tanpa perlu memasukkan password lagi
 *   - Menambah akun baru (login dengan akun lain / daftar akun baru)
 *   - Menghapus akun dari daftar perangkat ini
 * -----------------------------------------------------------------------
 */
 
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
 
export default function AccountListScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { user, savedAccounts, switchToAccount, removeAccount } = useAuth();
 
  async function handleSwitch(account) {
    if (account.id === user?.id) return;
    try {
      await switchToAccount(account.id);
      Alert.alert('Berhasil', `Anda kini masuk sebagai ${account.fullName}.`);
    } catch (err) {
      Alert.alert('Gagal', err.message);
    }
  }
 
  function handleRemove(account) {
    Alert.alert('Hapus Akun dari Perangkat', `Hapus "${account.fullName}" dari daftar akun di perangkat ini?`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => removeAccount(account.id) },
    ]);
  }
 
  function handleAddAccount() {
    navigation.navigate('AddAccountAuth');
  }
 
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <FlatList
        data={savedAccounts}
        keyExtractor={(a) => a.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => {
          const isActive = item.id === user?.id;
          return (
            <Pressable
              onPress={() => handleSwitch(item)}
              onLongPress={() => handleRemove(item)}
              style={[
                styles.accountRow,
                { backgroundColor: theme.card, borderColor: isActive ? theme.primary : 'transparent' },
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: theme.cardAlt }]}>
                <Text style={{ fontSize: 18, color: theme.text }}>{item.fullName?.charAt(0)?.toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.bodyStrong, { color: theme.text }]}>{item.fullName}</Text>
                <Text style={[typography.caption, { color: theme.textMuted }]}>{item.email}</Text>
              </View>
              {isActive ? (
                <View style={[styles.activeBadge, { backgroundColor: theme.primary }]}>
                  <Text style={[typography.tiny, { color: theme.primaryText }]}>Aktif</Text>
                </View>
              ) : null}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={[typography.body, { color: theme.textMuted, textAlign: 'center', marginTop: spacing.xl }]}>
            Belum ada akun tersimpan di perangkat ini.
          </Text>
        }
        ListFooterComponent={
          <Text style={[typography.tiny, { color: theme.textMuted, textAlign: 'center', marginTop: spacing.sm }]}>
            Tahan salah satu akun untuk menghapusnya dari perangkat ini.
          </Text>
        }
      />
 
      <View style={{ padding: spacing.lg }}>
        <Button title="+ Tambah Akun Lain" variant="outline" onPress={handleAddAccount} />
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
});

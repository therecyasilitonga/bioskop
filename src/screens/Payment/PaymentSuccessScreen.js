/**
 * src/screens/Payment/PaymentSuccessScreen.js
 * -----------------------------------------------------------------------
 * Layar Sukses Pembayaran (Payment Success Screen).
 * Menampilkan pesan konfirmasi keberhasilan transaksi tiket.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function PaymentSuccessScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const ticketId = route.params?.ticketId;

  const handleGoToTicket = () => {
    navigation.replace('TicketDetail', { ticketId });
  };

  const handleGoHome = () => {
    navigation.replace('MainTabs', { screen: 'Home' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.successCard}>
        <Icon name="check" color={theme.success} size={80} style={{ marginBottom: spacing.md }} />
        <Text style={[typography.h1, { color: theme.text, textAlign: 'center', marginTop: spacing.md }]}>
          Transaksi Sukses!
        </Text>
        <Text style={[typography.body, { color: theme.textMuted, textAlign: 'center', marginTop: spacing.sm }]}>
          Pembayaran Anda telah diverifikasi. E-tiket bioskop telah diterbitkan dan tersimpan di akun Anda.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Lihat E-Tiket"
          onPress={handleGoToTicket}
          style={styles.primaryBtn}
        />
        <Button
          title="Kembali ke Beranda"
          onPress={handleGoHome}
          variant="outline"
          style={styles.outlineBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  successCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  checkIcon: {
    fontSize: 90,
  },
  footer: {
    width: '100%',
    paddingBottom: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  outlineBtn: {
    width: '100%',
  },
});

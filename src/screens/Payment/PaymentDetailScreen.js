/**
 * src/screens/Payment/PaymentDetailScreen.js
 * -----------------------------------------------------------------------
 * Layar Rincian Pembayaran (Payment Detail Screen).
 * Memuat detail instruksi, mengkonfirmasi pembayaran, dan membuat e-tiket.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { paymentService } from '../../services/paymentService';
import Icon from '../../components/Icon';

export default function PaymentDetailScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { user } = useAuth();
  const { booking, checkoutTickets } = useBooking();

  const [paymentInput, setPaymentInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ticketCost = booking.selectedSeats.length * booking.ticketPrice;
  
  // Calculate promo discount if any
  let discountAmount = 0;
  if (booking.appliedPromo) {
    if (booking.appliedPromo.id === 'p1') {
      discountAmount = Math.floor(booking.ticketPrice * 0.5);
    } else if (booking.appliedPromo.id === 'p2') {
      discountAmount = 10000;
    } else if (booking.appliedPromo.id === 'p3') {
      discountAmount = 15000;
    }
  }

  const totalAmount = Math.max(0, ticketCost + booking.adminFee - discountAmount);
  const method = booking.paymentMethod;

  const handlePayNow = async () => {
    // Validation based on type
    if (method?.category === 'E-Wallet' && !paymentInput) {
      setError('Harap masukkan nomor HP Wallet Anda');
      return;
    }
    if (method?.category === 'Transfer Bank' && !paymentInput) {
      setError('Harap upload bukti transfer Anda terlebih dahulu');
      return;
    }

    setError('');
    setLoading(true);
    try {
      // Simulate payment network check
      await paymentService.processPayment({
        methodId: method?.id,
        amount: totalAmount,
        input: paymentInput,
      });

      // Commit ticket checkout to global storage
      const checkedTicket = await checkoutTickets(user?.id);

      // Navigate to Success screen
      navigation.replace('PaymentSuccess', { ticketId: checkedTicket.id });
    } catch (err) {
      Alert.alert('Pembayaran Gagal', err.message || 'Koneksi terputus. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Total Cost Display Box */}
        <View style={[styles.amountCard, { backgroundColor: theme.primary }]}>
          <Text style={[typography.caption, { color: theme.primaryText, fontWeight: '700' }]}>
            TOTAL TAGIHAN
          </Text>
          <Text style={[typography.h1, { color: theme.primaryText, fontSize: 32 }]}>
            Rp {totalAmount.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* Selected payment channel details */}
        <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
          <View style={styles.methodHeader}>
            <Icon name={method?.icon} color={method?.color || theme.primary} size={24} style={{ marginRight: spacing.sm }} />
            <Text style={[typography.h3, { color: theme.text }]}>{method?.name}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.divider }]} />
          <Text style={[typography.body, { color: theme.textMuted, lineHeight: 20 }]}>
            {method?.instructions}
          </Text>
        </View>

        {/* E-Wallet Phone input if e-wallet selected */}
        {method?.category === 'E-Wallet' ? (
          <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
            <Input
              label="Nomor Handphone Terdaftar"
              placeholder="contoh: 08123456789"
              value={paymentInput}
              onChangeText={(text) => {
                setPaymentInput(text);
                if (error) setError('');
              }}
              error={error}
              keyboardType="phone-pad"
            />
          </View>
        ) : method?.category === 'Transfer Bank' ? (
          <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Nomor Rekening Tujuan</Text>
            <Text style={[typography.h1, { color: theme.primary, letterSpacing: 1, marginVertical: spacing.xs }]}>
              {method?.id === 'pay_bca_manual' ? '8690123456' : '1120012345678'}
            </Text>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>
              a.n. Aura Theater
            </Text>
            <View style={[styles.divider, { backgroundColor: theme.divider, marginVertical: spacing.md }]} />
            <Text style={[typography.caption, { color: theme.textMuted, marginBottom: spacing.sm }]}>
              Silakan upload bukti transfer bank Anda di bawah ini:
            </Text>
            <Button
              title={paymentInput ? "Bukti Terunggah ✓" : "Upload Bukti Transfer"}
              onPress={() => {
                setPaymentInput('bukti_transfer_uploaded');
                Alert.alert('Upload Berhasil', 'Bukti transfer berhasil diunggah secara otomatis.');
              }}
              variant={paymentInput ? "outline" : "primary"}
            />
            {error ? <Text style={[typography.caption, { color: theme.danger, marginTop: 8 }]}>{error}</Text> : null}
          </View>
        ) : (
          // Mock Virtual Account number output
          <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Nomor Virtual Account</Text>
            <Text style={[typography.h1, { color: theme.primary, letterSpacing: 2, marginVertical: spacing.xs }]}>
              {method?.id === 'pay_bca' ? '88790812345678' : method?.id === 'pay_mandiri' ? '89500812345678' : method?.id === 'pay_bni' ? '82700812345678' : '88810812345678'}
            </Text>
            <Text style={[typography.tiny, { color: theme.textMuted }]}>
              Salin nomor di atas dan lakukan pembayaran sebelum jadwal film dimulai.
            </Text>
          </View>
        )}

      </ScrollView>

      {/* Footer trigger */}
      <View style={[styles.footer, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
        <Button
          title={loading ? 'Memverifikasi...' : 'Bayar Sekarang'}
          onPress={handlePayNow}
          loading={loading}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  amountCard: {
    padding: spacing.xl,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
});

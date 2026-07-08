/**
 * src/screens/Booking/OrderSummaryScreen.js
 * -----------------------------------------------------------------------
 * Layar Ringkasan Pesanan (Order Summary Screen).
 * Merinci harga tiket, biaya layanan, dan detail pesanan sebelum bayar.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Modal, Pressable, FlatList, TextInput, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { dummyPromos } from '../../data/dummyPromos';

export default function OrderSummaryScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { booking, setAppliedPromo } = useBooking();
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  const [promoInputText, setPromoInputText] = useState('');

  const ticketCount = booking.selectedSeats.length;
  const ticketCost = ticketCount * booking.ticketPrice;

  const handleApplyPromoCode = () => {
    if (!promoInputText.trim()) {
      Alert.alert('Eror', 'Masukkan kode promo terlebih dahulu');
      return;
    }
    const matched = dummyPromos.find(p => p.code.toLowerCase() === promoInputText.trim().toLowerCase());
    if (matched) {
      setAppliedPromo(matched);
      setPromoInputText('');
      Alert.alert('Promo Diterapkan', `Kode promo "${matched.code}" berhasil digunakan.`);
    } else {
      Alert.alert('Gagal', 'Kode promo tidak valid atau sudah kedaluwarsa.');
    }
  };

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

  const grandTotal = Math.max(0, ticketCost + booking.adminFee - discountAmount);

  const handleProceedToPayment = () => {
    navigation.navigate('PaymentMethod');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Ticket Details Box */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[typography.caption, { color: theme.primary, fontWeight: '700', marginBottom: 4 }]}>
            DETAIL TIKET
          </Text>
          <Text style={[typography.h2, { color: theme.text, marginBottom: spacing.xs }]}>
            {booking.movie?.title}
          </Text>
          <Text style={[typography.body, { color: theme.textMuted }]}>
            {booking.movie?.genre} • {booking.movie?.duration}
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.detailRow}>
            <Icon name="location" color={theme.primary} size={16} />
            <View style={styles.detailText}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Bioskop</Text>
              <Text style={[typography.bodyStrong, { color: theme.text }]}>{booking.cinema?.name}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="settings" color={theme.primary} size={16} />
            <View style={styles.detailText}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Tanggal & Waktu</Text>
              <Text style={[typography.bodyStrong, { color: theme.text }]}>
                {booking.date} @ {booking.showtime}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Icon name="profile" color={theme.primary} size={16} />
            <View style={styles.detailText}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Nomor Kursi</Text>
              <Text style={[typography.bodyStrong, { color: theme.text }]}>
                {booking.selectedSeats.join(', ')} ({ticketCount} Kursi)
              </Text>
            </View>
          </View>
        </View>

        {/* Promo / Voucher Section */}
        <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
          <Text style={[typography.caption, { color: theme.primary, fontWeight: '700', marginBottom: spacing.xs }]}>
            PROMO & VOUCHER
          </Text>

          {booking.appliedPromo ? (
            <View style={styles.promoActiveRow}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.bodyStrong, { color: theme.text }]}>
                  {booking.appliedPromo.title}
                </Text>
                <Text style={[typography.caption, { color: theme.success, marginTop: 2 }]}>
                  Diskon Aktif: -Rp {discountAmount.toLocaleString('id-ID')}
                </Text>
              </View>
              <Pressable
                onPress={() => setAppliedPromo(null)}
                style={[styles.removePromoBtn, { borderColor: theme.danger }]}
              >
                <Text style={[typography.caption, { color: theme.danger, fontWeight: '700' }]}>Hapus</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ marginTop: spacing.xs }}>
              <View style={styles.promoInputRow}>
                <TextInput
                  style={[styles.promoTextInput, { color: theme.text, borderColor: theme.divider, backgroundColor: theme.bg }]}
                  placeholder="Ketik kode promo (misal: NEWUSER50)"
                  placeholderTextColor={theme.textMuted}
                  value={promoInputText}
                  onChangeText={setPromoInputText}
                  autoCapitalize="characters"
                />
                <Pressable
                  onPress={handleApplyPromoCode}
                  style={[styles.applyPromoBtn, { backgroundColor: theme.primary }]}
                >
                  <Text style={[typography.caption, { color: theme.primaryText, fontWeight: '700' }]}>Terapkan</Text>
                </Pressable>
              </View>
              <Pressable
                onPress={() => setPromoModalVisible(true)}
                style={[styles.promoTrigger, { borderColor: theme.divider, marginTop: spacing.sm }]}
              >
                <Icon name="ticket" color={theme.primary} size={16} style={{ marginRight: spacing.sm }} />
                <Text style={[typography.caption, { color: theme.primary, fontWeight: '700', flex: 1 }]}>
                  Lihat Daftar Promo & Voucher
                </Text>
                <Icon name="chevron-right" color={theme.primary} size={14} />
              </Pressable>
            </View>
          )}
        </View>

        {/* Pricing Details Box */}
        <View style={[styles.card, { backgroundColor: theme.card, marginTop: spacing.md }]}>
          <Text style={[typography.caption, { color: theme.primary, fontWeight: '700', marginBottom: spacing.sm }]}>
            RINCIAN BIAYA
          </Text>

          <View style={styles.priceRow}>
            <Text style={[typography.body, { color: theme.text }]}>
              Harga Tiket ({ticketCount}x)
            </Text>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>
              Rp {ticketCost.toLocaleString('id-ID')}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[typography.body, { color: theme.text }]}>Biaya Administrasi</Text>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>
              Rp {booking.adminFee.toLocaleString('id-ID')}
            </Text>
          </View>

          {discountAmount > 0 ? (
            <View style={styles.priceRow}>
              <Text style={[typography.body, { color: theme.success }]}>Diskon Promo</Text>
              <Text style={[typography.bodyStrong, { color: theme.success }]}>
                -Rp {discountAmount.toLocaleString('id-ID')}
              </Text>
            </View>
          ) : null}

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.priceRow}>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>Total Pembayaran</Text>
            <Text style={[typography.h2, { color: theme.primary }]}>
              Rp {grandTotal.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Promo Selection Modal */}
      <Modal visible={promoModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h2, { color: theme.text }]}>Pilih Promo Tersedia</Text>
              <Pressable onPress={() => setPromoModalVisible(false)} style={styles.closeBtn}>
                <Text style={{ fontSize: 18, color: theme.textMuted }}>✕</Text>
              </Pressable>
            </View>

            <FlatList
              data={dummyPromos}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingVertical: spacing.md }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setAppliedPromo(item);
                    setPromoModalVisible(false);
                  }}
                  style={[styles.promoItem, { borderColor: theme.divider, backgroundColor: theme.bgAlt }]}
                >
                  <View style={{ flex: 1, paddingRight: spacing.sm }}>
                    <Text style={[typography.bodyStrong, { color: theme.text }]}>{item.title}</Text>
                    <Text style={[typography.caption, { color: theme.textMuted, marginTop: 4 }]} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <View style={[styles.codeTag, { backgroundColor: theme.primary + '15' }]}>
                      <Text style={[typography.tiny, { color: theme.primary, fontWeight: '700' }]}>
                        {item.code}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.selectBtn, { backgroundColor: theme.primary }]}>
                    <Text style={[typography.caption, { color: theme.primaryText, fontWeight: '700' }]}>Gunakan</Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Footer Payment Proceed Button */}
      <View style={[styles.footer, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
        <Button
          title="Pilih Metode Pembayaran"
          onPress={handleProceedToPayment}
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
  card: {
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  detailText: {
    marginLeft: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  promoTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  promoActiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  removePromoBtn: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  promoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  codeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
    marginTop: spacing.sm,
  },
  selectBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  promoTextInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    ...typography.body,
    marginRight: spacing.sm,
  },
  applyPromoBtn: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

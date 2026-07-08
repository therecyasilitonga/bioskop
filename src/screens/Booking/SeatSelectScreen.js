/**
 * src/screens/Booking/SeatSelectScreen.js
 * -----------------------------------------------------------------------
 * Layar Pemilihan Kursi (Seat Selection Screen).
 * Mengintegrasikan komponen SeatMap interaktif dan menghitung total biaya.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing } from '../../theme/tokens';
import SeatMap from '../../components/SeatMap';
import Button from '../../components/Button';

export default function SeatSelectScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { booking, toggleSeat } = useBooking();

  const handleNext = () => {
    if (booking.selectedSeats.length === 0) {
      Alert.alert('Pilih Kursi', 'Silakan pilih minimal satu kursi terlebih dahulu.');
      return;
    }
    navigation.navigate('OrderSummary');
  };

  const totalTicketCost = booking.selectedSeats.length * booking.ticketPrice;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.instruction, { color: theme.textMuted }]}>
          {t('selectSeatInstruction')}
        </Text>
        
        {/* Interactive seat grid map */}
        <SeatMap selectedSeats={booking.selectedSeats} onSeatToggle={toggleSeat} />
      </View>

      {/* Floating Price Summary Footer */}
      <View style={[styles.footer, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
        <View style={styles.summaryInfo}>
          <Text style={[typography.caption, { color: theme.textMuted }]}>
            Kursi ({booking.selectedSeats.length}):
          </Text>
          <Text style={[typography.bodyStrong, { color: theme.text }]} numberOfLines={1}>
            {booking.selectedSeats.length > 0 ? booking.selectedSeats.join(', ') : '-'}
          </Text>
          <Text style={[typography.h2, { color: theme.primary, marginTop: 4 }]}>
            Rp {totalTicketCost.toLocaleString('id-ID')}
          </Text>
        </View>

        <Button
          title="Konfirmasi Kursi"
          onPress={handleNext}
          disabled={booking.selectedSeats.length === 0}
          style={styles.confirmBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  instruction: {
    ...typography.body,
    textAlign: 'center',
    marginVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
  },
  summaryInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  confirmBtn: {
    width: 160,
  },
});

/**
 * src/screens/Ticket/TicketDetailScreen.js
 * -----------------------------------------------------------------------
 * Layar Rincian E-Tiket (Ticket Detail Screen).
 * Menampilkan kode batang (barcode) dan info kursi film secara lengkap.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import TicketBarcode from '../../components/TicketBarcode';

export default function TicketDetailScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { tickets } = useBooking();
  const { ticketId } = route.params;

  const ticket = tickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.text }}>Tiket tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Ticket Card Container */}
        <View style={[styles.ticketCard, { backgroundColor: theme.card }]}>
          
          {/* Cinema Header */}
          <Text style={[typography.h2, { color: theme.text, textAlign: 'center' }]}>
            {ticket.cinema.name}
          </Text>
          <Text style={[typography.caption, { color: theme.textMuted, textAlign: 'center', marginTop: 2 }]}>
            {ticket.cinema.location}
          </Text>

          <View style={[styles.divider, { borderStyle: 'dashed', borderColor: theme.divider }]} />

          {/* Movie Details */}
          <Text style={[typography.caption, { color: theme.primary, fontWeight: '700', marginBottom: 2 }]}>
            FILM
          </Text>
          <Text style={[typography.h1, { color: theme.text, fontSize: 22 }]}>
            {ticket.movie.title}
          </Text>
          <Text style={[typography.caption, { color: theme.textMuted, marginTop: 2 }]}>
            {ticket.movie.genre}
          </Text>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* DateTime & Seats Grid */}
          <View style={styles.grid}>
            <View style={styles.gridCol}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Tanggal & Waktu</Text>
              <Text style={[typography.bodyStrong, { color: theme.text, marginTop: 2 }]}>
                {ticket.date}
              </Text>
              <Text style={[typography.bodyStrong, { color: theme.text }]}>
                {ticket.showtime}
              </Text>
            </View>

            <View style={styles.gridCol}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Nomor Kursi</Text>
              <Text style={[typography.h2, { color: theme.primary, marginTop: 2 }]}>
                {ticket.seats.join(', ')}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { borderStyle: 'dashed', borderColor: theme.divider }]} />

          {/* Dynamic Ticket Barcode component */}
          <TicketBarcode value={ticket.barcodeData} />

          <Text style={[typography.tiny, { color: theme.textMuted, textAlign: 'center', paddingHorizontal: spacing.md }]}>
            {t('barcodeTicketInstruction')}
          </Text>
        </View>

        {/* Transaction Summary Details */}
        <View style={[styles.infoCard, { backgroundColor: theme.cardAlt }]}>
          <View style={styles.infoRow}>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Metode Pembayaran</Text>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>{ticket.paymentMethod}</Text>
          </View>
          {ticket.appliedPromo ? (
            <View style={styles.infoRow}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>Promo Terpakai</Text>
              <Text style={[typography.bodyStrong, { color: theme.success }]}>
                {ticket.appliedPromo} (-Rp {ticket.discountAmount?.toLocaleString('id-ID')})
              </Text>
            </View>
          ) : null}
          <View style={styles.infoRow}>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Total Biaya</Text>
            <Text style={[typography.bodyStrong, { color: theme.primary }]}>
              Rp {ticket.totalCost?.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Waktu Pembelian</Text>
            <Text style={[typography.body, { color: theme.textMuted }]}>
              {new Date(ticket.bookingTime).toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: spacing.lg,
  },
  ticketCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  divider: {
    height: 1,
    borderWidth: 0.5,
    marginVertical: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCol: {
    flex: 1,
  },
  infoCard: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
});

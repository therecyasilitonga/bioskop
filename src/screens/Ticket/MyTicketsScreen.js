/**
 * src/screens/Ticket/MyTicketsScreen.js
 * -----------------------------------------------------------------------
 * Layar Riwayat Pemesanan / Tiket Saya (My Tickets Screen).
 * Menampilkan daftar e-tiket aktif dan riwayat nonton pengguna.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { typography, spacing, radius } from '../../theme/tokens';
import EmptyState from '../../components/EmptyState';
import Icon from '../../components/Icon';

export default function MyTicketsScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { user } = useAuth();
  const { tickets } = useBooking();

  // Filter tickets to only display ones booked by the logged-in user
  const userTickets = tickets.filter((ticket) => ticket.userId === user?.id);

  const handleTicketPress = (ticket) => {
    navigation.navigate('TicketDetail', { ticketId: ticket.id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <FlatList
        data={userTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleTicketPress(item)}
            style={[styles.ticketCard, { backgroundColor: theme.card, borderColor: theme.divider }]}
          >
            <View style={styles.cardHeader}>
              <Text style={[typography.caption, { color: theme.primary, fontWeight: '700' }]}>
                {item.cinema.name}
              </Text>
              <Text style={[typography.tiny, { color: theme.textMuted }]}>
                {item.id}
              </Text>
            </View>

            <Text style={[typography.h3, { color: theme.text, marginVertical: 4 }]}>
              {item.movie.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
              <Icon name="calendar" color={theme.textMuted} size={14} style={{ marginRight: 6 }} />
              <Text style={[typography.body, { color: theme.textMuted, marginRight: 12 }]}>
                {item.date}
              </Text>
              <Icon name="clock" color={theme.textMuted} size={14} style={{ marginRight: 6 }} />
              <Text style={[typography.body, { color: theme.textMuted }]}>
                {item.showtime}
              </Text>
            </View>

            <View style={[styles.cardFooter, { borderTopColor: theme.divider }]}>
              <Text style={[typography.caption, { color: theme.textMuted }]}>
                Kursi: {item.seats.join(', ')}
              </Text>
              <Text style={[typography.caption, { color: theme.text, fontWeight: '700' }]}>
                Rp {item.totalCost?.toLocaleString('id-ID')}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            iconName="ticket"
            title="Tiket Masih Kosong"
            message="Anda belum melakukan pemesanan tiket bioskop. Silakan beli tiket film sekarang!"
            actionTitle="Beli Tiket"
            onActionPress={() => navigation.navigate('Home')}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  ticketCard: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
  },
});

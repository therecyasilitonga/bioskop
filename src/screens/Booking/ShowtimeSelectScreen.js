/**
 * src/screens/Booking/ShowtimeSelectScreen.js
 * -----------------------------------------------------------------------
 * Layar Pemilihan Jadwal & Tanggal (Showtime Selection Screen).
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';

export default function ShowtimeSelectScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { booking, setBookingShowtime } = useBooking();

  const isAdvanceTicket = booking.movie?.advanceTicketSales;
  const dates = isAdvanceTicket && booking.movie?.advanceSalesDate
    ? [booking.movie.advanceSalesDate]
    : (booking.cinema?.dates || ['Hari Ini', 'Besok', 'Lusa']);
  const showtimes = booking.cinema?.showtimes || ['12:00', '14:30', '17:00', '19:30'];

  const [selectedDate, setSelectedDate] = useState(dates.length === 1 ? dates[0] : null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return;
    setBookingShowtime(selectedDate, selectedTime);
    navigation.navigate('SeatSelect');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        
        {/* Cinema details summary header */}
        <View style={[styles.cinemaSummary, { backgroundColor: theme.cardAlt }]}>
          <Text style={[typography.bodyStrong, { color: theme.text }]}>
            {booking.cinema?.name}
          </Text>
          <Text style={[typography.caption, { color: theme.textMuted, marginTop: 2 }]}>
            {booking.cinema?.location}
          </Text>
        </View>

        {/* Date Selector Row */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Pilih Tanggal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map((date) => {
            const isSelected = selectedDate === date;
            return (
              <Pressable
                key={date}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dateBlock,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.card,
                    borderColor: isSelected ? theme.primary : theme.divider,
                  },
                ]}
              >
                <Text style={[typography.bodyStrong, { color: isSelected ? theme.primaryText : theme.text }]}>
                  {date}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Time Selector Grid */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: spacing.lg }]}>
          Pilih Jam Tayang
        </Text>
        <View style={styles.timeGrid}>
          {showtimes.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <Pressable
                key={time}
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.timeBlock,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.card,
                    borderColor: isSelected ? theme.primary : theme.divider,
                  },
                ]}
              >
                <Text style={[typography.bodyStrong, { color: isSelected ? theme.primaryText : theme.text }]}>
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

      </ScrollView>

      {/* Footer Next button */}
      <View style={[styles.footer, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
        <Button
          title="Lanjut Pilih Kursi"
          onPress={handleNext}
          disabled={!selectedDate || !selectedTime}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cinemaSummary: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  dateScroll: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  dateBlock: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  timeBlock: {
    width: '30%',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    margin: '1.6%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
});

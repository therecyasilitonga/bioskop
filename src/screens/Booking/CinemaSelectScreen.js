/**
 * src/screens/Booking/CinemaSelectScreen.js
 * -----------------------------------------------------------------------
 * Layar Pemilihan Bioskop (Cinema Selection Screen).
 * Memuat bioskop Pekanbaru dan menyimpannya di BookingContext.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';
import { typography, spacing } from '../../theme/tokens';
import { bookingService } from '../../services/bookingService';
import CinemaCard from '../../components/CinemaCard';

export default function CinemaSelectScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { city } = useLocation();
  const { setBookingCinema } = useBooking();

  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCinemas() {
      try {
        const data = await bookingService.getCinemasByCity(city);
        setCinemas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCinemas();
  }, [city]);

  const handleSelectCinema = (cinema) => {
    setBookingCinema(cinema);
    navigation.navigate('ShowtimeSelect');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <FlatList
        data={cinemas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <CinemaCard cinema={item} onPress={() => handleSelectCinema(item)} />
        )}
        ListHeaderComponent={
          <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.md }]}>
            Menampilkan bioskop terdekat yang memutar film pilihan Anda di {city}.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: spacing.lg,
  },
});

/**
 * src/screens/Settings/LocationSelectScreen.js
 * -----------------------------------------------------------------------
 * Layar Pemilihan Lokasi & Mall Utama Pekanbaru (Location Selection Screen).
 * Memenuhi spesifikasi pencarian lokasi di mall SKA, LW, Transmart, Ramayana.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLocation } from '../../context/LocationContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { dummyCinemas } from '../../data/dummyCinemas';

const SUPPORTED_CITIES = ['Pekanbaru', 'Jakarta', 'Bandung', 'Medan'];

export default function LocationSelectScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { city, setCity, selectedCinema, setSelectedCinema } = useLocation();

  const handleSelectCity = (cityName) => {
    setCity(cityName);
  };

  const handleSelectCinema = (cinema) => {
    setSelectedCinema(cinema);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.container}>
      {/* City Section */}
      <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>PILIH KOTA</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {SUPPORTED_CITIES.map((cityName, idx) => {
          const isSelected = city === cityName;
          return (
            <Pressable
              key={cityName}
              onPress={() => handleSelectCity(cityName)}
              style={[
                styles.row,
                idx < SUPPORTED_CITIES.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.divider },
              ]}
            >
              <Text style={[typography.body, { color: theme.text, flex: 1 }]}>{cityName}</Text>
              {isSelected ? <Text style={{ color: theme.primary, fontWeight: '700' }}>✓</Text> : null}
            </Pressable>
          );
        })}
      </View>

      {/* Cinema Mall Section (only relevant if Pekanbaru is active) */}
      {city === 'Pekanbaru' ? (
        <>
          <Text style={[styles.sectionTitle, { color: theme.textMuted, marginTop: spacing.xl }]}>
            PILIH MALL UTAMA (BIOSKOP DEFAULT)
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            {dummyCinemas.map((cinema, idx) => {
              const isSelected = selectedCinema?.id === cinema.id;
              return (
                <Pressable
                  key={cinema.id}
                  onPress={() => handleSelectCinema(cinema)}
                  style={[
                    styles.row,
                    idx < dummyCinemas.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.divider },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.bodyStrong, { color: theme.text }]}>{cinema.name}</Text>
                    <Text style={[typography.caption, { color: theme.textMuted }]}>{cinema.location}</Text>
                  </View>
                  {isSelected ? <Text style={{ color: theme.primary, fontWeight: '700' }}>✓</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </>
      ) : (
        <Text style={[typography.caption, { color: theme.textMuted, textAlign: 'center', marginTop: spacing.xl }]}>
          Mall utama hanya dikonfigurasi untuk kota Pekanbaru.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.caption,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
});

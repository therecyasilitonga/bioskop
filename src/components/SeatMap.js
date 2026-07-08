/**
 * src/components/SeatMap.js
 * -----------------------------------------------------------------------
 * Komponen peta kursi interaktif. Memiliki baris A-G, kolom 1-8,
 * gang tengah (aisle), layout layar bioskop di atas, dan legenda warna.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing, radius } from '../theme/tokens';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SEATS_PER_ROW = [1, 2, 3, 4, 5, 6, 7, 8];

// Mock booked seats
const MOCK_BOOKED_SEATS = ['A3', 'A4', 'B5', 'B6', 'D1', 'D2', 'F7', 'F8'];

export default function SeatMap({ selectedSeats = [], onSeatToggle }) {
  const { theme } = useAppTheme();

  const handleSeatPress = (seatId) => {
    if (MOCK_BOOKED_SEATS.includes(seatId)) return;
    onSeatToggle(seatId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal={false}>
      {/* Screen area display */}
      <View style={[styles.screenBar, { backgroundColor: theme.cardAlt }]}>
        <Text style={[styles.screenText, { color: theme.textMuted }]}>
          LAYAR BIOSKOP UTAMA
        </Text>
      </View>
      <View style={[styles.screenCurve, { borderColor: theme.primary, opacity: 0.3 }]} />

      {/* Grid of Seats */}
      <View style={styles.grid}>
        {ROWS.map((row) => (
          <View key={row} style={styles.row}>
            {/* Row Label Left */}
            <Text style={[styles.rowLabel, { color: theme.textMuted }]}>{row}</Text>

            {/* Seats Grid */}
            <View style={styles.rowSeats}>
              {SEATS_PER_ROW.map((col) => {
                const seatId = `${row}${col}`;
                const isBooked = MOCK_BOOKED_SEATS.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                // Determine colors
                let seatBg = theme.bgAlt;
                let seatBorder = theme.divider;
                let textCol = theme.text;

                if (isBooked) {
                  seatBg = theme.cardAlt;
                  seatBorder = 'transparent';
                  textCol = theme.textMuted;
                } else if (isSelected) {
                  seatBg = theme.primary;
                  seatBorder = theme.primary;
                  textCol = theme.primaryText;
                }

                return (
                  <React.Fragment key={seatId}>
                    {/* Aisle space in the middle */}
                    {col === 5 ? <View style={{ width: spacing.xl }} /> : null}

                    <Pressable
                      onPress={() => handleSeatPress(seatId)}
                      disabled={isBooked}
                      style={[
                        styles.seat,
                        {
                          backgroundColor: seatBg,
                          borderColor: seatBorder,
                          borderWidth: isSelected ? 0 : 1.5,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.seatText,
                          {
                            color: textCol,
                            textDecorationLine: isBooked ? 'line-through' : 'none',
                          },
                        ]}
                      >
                        {col}
                      </Text>
                    </Pressable>
                  </React.Fragment>
                );
              })}
            </View>

            {/* Row Label Right */}
            <Text style={[styles.rowLabel, { color: theme.textMuted }]}>{row}</Text>
          </View>
        ))}
      </View>

      {/* Legends */}
      <View style={styles.legendContainer}>
        <LegendItem label="Tersedia" theme={theme} />
        <LegendItem label="Terpilih" theme={theme} color={theme.primary} />
        <LegendItem label="Terjual" theme={theme} color={theme.cardAlt} />
      </View>
    </ScrollView>
  );
}

function LegendItem({ label, theme, color }) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendDot,
          {
            backgroundColor: color || 'transparent',
            borderColor: color ? 'transparent' : theme.divider,
            borderWidth: color ? 0 : 1.5,
          },
        ]}
      />
      <Text style={[typography.caption, { color: theme.text, marginLeft: 6 }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  screenBar: {
    width: '80%',
    paddingVertical: 8,
    borderRadius: radius.sm,
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  screenText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  screenCurve: {
    width: '90%',
    height: 12,
    borderTopWidth: 3,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginBottom: spacing.xl,
  },
  grid: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rowLabel: {
    width: 20,
    textAlign: 'center',
    ...typography.bodyStrong,
  },
  rowSeats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
  },
  seat: {
    width: 28,
    height: 28,
    marginHorizontal: 3,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatText: {
    fontSize: 10,
    fontWeight: '700',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: radius.sm,
  },
});

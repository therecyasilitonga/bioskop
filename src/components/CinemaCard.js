/**
 * src/components/CinemaCard.js
 * -----------------------------------------------------------------------
 * Card yang menampilkan rincian informasi bioskop (mall, alamat, dll).
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing, radius } from '../theme/tokens';

import Icon from './Icon';

export default function CinemaCard({ cinema, selected = false, onPress }) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: selected ? theme.primary : 'transparent',
          borderWidth: 1.5,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: theme.cardAlt }]}>
          <Text style={[styles.typeText, { color: theme.primary }]}>
            {cinema.type}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="star" color={theme.primary} size={12} style={{ marginRight: 4 }} />
          <Text style={[typography.caption, { color: theme.textMuted }]}>
            {cinema.rating}
          </Text>
        </View>
      </View>

      <Text style={[styles.name, { color: theme.text }]}>{cinema.name}</Text>
      <Text style={[styles.location, { color: theme.textMuted }]}>
        {cinema.location}
      </Text>

      <View style={[styles.footer, { borderTopColor: theme.divider }]}>
        <Text style={[typography.caption, { color: theme.textMuted }]}>Harga Tiket</Text>
        <Text style={[typography.bodyStrong, { color: theme.primary }]}>
          Rp {cinema.ticketPrice?.toLocaleString('id-ID')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    ...typography.h3,
    marginBottom: 4,
  },
  location: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
});

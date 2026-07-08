/**
 * src/components/MovieCard.js
 * -----------------------------------------------------------------------
 * Card film kustom yang menampilkan poster cover, rating bintang,
 * rating umur (e.g. SU / 13+), dan judul film.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing, radius } from '../theme/tokens';
import Icon from './Icon';

export default function MovieCard({ movie, onPress, style }) {
  const { theme } = useAppTheme();

  const imageSource = typeof movie.coverUrl === 'string' ? { uri: movie.coverUrl } : movie.coverUrl;

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={[styles.imageContainer, { backgroundColor: theme.cardAlt }]}>
        <Image
          source={imageSource}
          style={styles.image}
        />
        
        {/* Advance Ticket Sales Badge */}
        {movie.advanceTicketSales ? (
          <View style={styles.advanceBadge}>
            <Text style={styles.advanceText}>Advance ticket sales</Text>
          </View>
        ) : null}

        {/* Coming Soon Badge */}
        {movie.status === 'COMING_SOON' && !movie.advanceTicketSales ? (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Akan Tayang</Text>
          </View>
        ) : null}

        {/* Age Rating Badge */}
        <View style={[
          styles.ageBadge,
          {
            backgroundColor: theme.primary,
            top: (movie.advanceTicketSales || (movie.status === 'COMING_SOON' && !movie.advanceTicketSales)) ? 26 : spacing.sm
          }
        ]}>
          <Text style={[styles.ageText, { color: theme.primaryText }]}>
            {movie.ageRating}
          </Text>
        </View>

        {/* Bottom Rating Info Overlay */}
        {parseFloat(movie.rating) > 0 ? (
          <View style={styles.ratingBadge}>
            <Icon name="star" color={theme.primary} size={10} style={{ marginRight: 4 }} />
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>
        ) : null}
      </View>

      <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
        {movie.title}
      </Text>
      <Text numberOfLines={1} style={[styles.genre, { color: theme.textMuted }]}>
        {movie.genre}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 0.68,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ageBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  ageText: {
    ...typography.tiny,
    fontWeight: '700',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  starText: {
    fontSize: 10,
    marginRight: 2,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    ...typography.bodyStrong,
    marginTop: 8,
  },
  genre: {
    ...typography.caption,
    marginTop: 2,
  },
  advanceBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0E8388',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    zIndex: 10,
  },
  advanceText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    zIndex: 10,
  },
  comingSoonText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

/**
 * src/screens/Home/MovieDetailScreen.js
 * -----------------------------------------------------------------------
 * Layar Rincian Film (Movie Detail Screen).
 * Menampilkan detail film dan meluncurkan alur pemesanan (booking flow).
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { movieService } from '../../services/movieService';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function MovieDetailScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { startBooking } = useBooking();
  const { movieId } = route.params;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await movieService.getMovieDetail(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [movieId]);

  const isComingSoonOnly = movie && movie.status === 'COMING_SOON' && !movie.advanceTicketSales;

  const handleBuyTicket = () => {
    if (!movie || isComingSoonOnly) return;
    // Set movie in booking global state
    startBooking(movie);
    // Proceed to choose Cinema in Pekanbaru
    navigation.navigate('CinemaSelect');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.text }}>Film tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Cover Backdrop / Image */}
        <View style={[styles.coverContainer, { backgroundColor: theme.cardAlt }]}>
          <Image
            source={typeof movie.coverUrl === 'string' ? { uri: movie.coverUrl } : movie.coverUrl}
            style={[styles.coverImage, { opacity: 0.25 }]}
            blurRadius={Platform.OS === 'ios' ? 15 : 6}
          />
          <View style={styles.posterOverlayContainer}>
            <Image
              source={typeof movie.coverUrl === 'string' ? { uri: movie.coverUrl } : movie.coverUrl}
              style={[styles.crispPoster, { borderColor: theme.divider }]}
            />
          </View>
        </View>

        {/* Movie Info Details */}
        <View style={styles.detailsContainer}>
          <View style={[styles.metaRow, { marginTop: spacing.md }]}>
            <View style={[styles.ageBadge, { backgroundColor: theme.primary }]}>
              <Text style={[styles.ageText, { color: theme.primaryText }]}>
                {movie.ageRating}
              </Text>
            </View>
            <Text style={[typography.caption, { color: theme.textMuted, marginLeft: spacing.sm }]}>
              {movie.duration} • {movie.genre}
            </Text>
          </View>

          <Text style={[typography.h1, { color: theme.text, marginVertical: spacing.sm }]}>
            {movie.title}
          </Text>

          {/* Rating and Status visual */}
          <View style={styles.ratingRow}>
            {parseFloat(movie.rating) > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.md }}>
                <Icon name="star" color={theme.primary} size={16} />
                <Text style={[typography.bodyStrong, { color: theme.text, marginLeft: 4 }]}>
                  {movie.rating} <Text style={[typography.caption, { color: theme.textMuted }]}>/ 10</Text>
                </Text>
              </View>
            )}
            <View style={[
              styles.statusBadge,
              {
                backgroundColor: movie.status === 'COMING_SOON' 
                  ? (movie.advanceTicketSales ? 'rgba(14, 131, 136, 0.15)' : 'rgba(231, 76, 60, 0.15)')
                  : 'rgba(46, 204, 113, 0.15)',
                borderColor: movie.status === 'COMING_SOON' 
                  ? (movie.advanceTicketSales ? '#0E8388' : theme.danger)
                  : theme.success,
              }
            ]}>
              <Text style={[
                typography.caption,
                {
                  fontSize: 10,
                  fontWeight: '700',
                  color: movie.status === 'COMING_SOON' 
                    ? (movie.advanceTicketSales ? '#0E8388' : theme.danger)
                    : theme.success,
                }
              ]}>
                {movie.status === 'COMING_SOON' 
                  ? (movie.advanceTicketSales ? 'PRESALE' : 'COMING SOON') 
                  : 'NOW SHOWING'}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          {/* Synopsis */}
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Sinopsis</Text>
          <Text style={[styles.synopsisText, { color: theme.textMuted }]}>
            {movie.synopsis}
          </Text>

          {/* Director & Casts */}
          <View style={styles.crewSection}>
            <Text style={[styles.crewLabel, { color: theme.text }]}>Sutradara: </Text>
            <Text style={[typography.body, { color: theme.textMuted }]}>{movie.director}</Text>
          </View>
          <View style={styles.crewSection}>
            <Text style={[styles.crewLabel, { color: theme.text }]}>Pemeran Utama: </Text>
            <Text style={[typography.body, { color: theme.textMuted, flex: 1 }]}>{movie.cast}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Purchase bar */}
      <View style={[styles.footerBar, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
        {isComingSoonOnly ? (
          <View style={{ flex: 1, marginRight: spacing.md }}>
            <Text style={[typography.caption, { color: theme.danger, fontWeight: '700' }]}>
              PENJUALAN BELUM DIBUKA
            </Text>
            <Text style={[typography.tiny, { color: theme.textMuted }]}>
              Film ini segera hadir. Tiket belum dapat dipesan.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Mulai dari</Text>
            <Text style={[typography.h2, { color: theme.primary }]}>
              Rp {movie.ticketPrice?.toLocaleString('id-ID')}
            </Text>
          </View>
        )}
        <Button
          title={isComingSoonOnly ? "Segera Tayang" : t('buyTicket')}
          onPress={handleBuyTicket}
          disabled={isComingSoonOnly}
          style={[styles.buyBtn, isComingSoonOnly && { backgroundColor: theme.divider }]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterOverlayContainer: {
    zIndex: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  crispPoster: {
    width: 140,
    height: 210,
    borderRadius: radius.md,
    borderWidth: 1.5,
    resizeMode: 'cover',
  },
  statusBadge: {
    borderWidth: 1.2,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    paddingHorizontal: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  ageText: {
    ...typography.tiny,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  sectionHeading: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  synopsisText: {
    ...typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  crewSection: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  crewLabel: {
    ...typography.bodyStrong,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
  },
  buyBtn: {
    width: 160,
  },
});

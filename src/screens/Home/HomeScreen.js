/**
 * src/screens/Home/HomeScreen.js
 * -----------------------------------------------------------------------
 * Layar Beranda Utama (Home Screen).
 * Menampilkan lokasi Pekanbaru, pencarian, spanduk promo,
 * dan katalog film dengan filter tab 21 Cineplex-style:
 * 1. Lagi Tayang
 * 2. Advance Ticket Sales (Menampilkan 4 Film Presale)
 * 3. Akan Tayang
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image, SafeAreaView, Alert, useWindowDimensions } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLocation } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { movieService } from '../../services/movieService';
import { dummyPromos } from '../../data/dummyPromos';
import MovieCard from '../../components/MovieCard';
import Icon from '../../components/Icon';

export default function HomeScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { city, selectedCinema } = useLocation();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('now_showing'); // 'now_showing', 'advance', 'coming_soon'

  useEffect(() => {
    async function fetchMovies() {
      try {
        const showing = await movieService.getNowShowing();
        const soon = await movieService.getComingSoon();
        setNowShowing(showing);
        setComingSoon(soon);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const handlePromoPress = (promo) => {
    Alert.alert(
      promo.title,
      `${promo.description}\n\nKode Promo: ${promo.code}\n\nSalin kode di atas dan masukkan/pilih di halaman Ringkasan Pemesanan saat checkout untuk mengaktifkan diskon.`,
      [{ text: 'OK' }]
    );
  };

  // Filter movies depending on active tab selection
  const getFilteredMovies = () => {
    if (activeTab === 'now_showing') {
      return nowShowing;
    }
    if (activeTab === 'advance') {
      return comingSoon.filter(m => m.advanceTicketSales);
    }
    return comingSoon;
  };

  // Determine dynamic columns based on screen width for premium mobile/web responsive layouts
  const numColumns = width >= 768 ? 4 : 2;
  const cardWidth = width >= 768 ? '23.5%' : '48.5%';

  const renderHeader = () => (
    <View style={{ paddingBottom: spacing.sm }}>
      {/* Header: Location Selector & City Details */}
      <View style={[styles.header, { borderBottomColor: theme.divider }]}>
        <Pressable
          onPress={() => navigation.navigate('LocationSelect')}
          style={styles.locationSelector}
        >
          <Icon name="location" color={theme.primary} size={18} style={{ marginRight: 6 }} />
          <View>
            <Text style={[typography.caption, { color: theme.textMuted }]}>Lokasi Anda</Text>
            <Text style={[typography.bodyStrong, { color: theme.text }]}>
              {city} {selectedCinema ? ` - ${selectedCinema.name}` : ''}
            </Text>
          </View>
          <Text style={[typography.bodyStrong, { color: theme.primary, marginLeft: spacing.xs }]}>
            ▼
          </Text>
        </Pressable>
      </View>

      {/* Search Input Trigger */}
      <Pressable
        onPress={() => navigation.navigate('Search')}
        style={[styles.searchBarTrigger, { backgroundColor: theme.card, borderColor: theme.divider }]}
      >
        <Icon name="search" color={theme.textMuted} size={16} style={{ marginRight: spacing.sm }} />
        <Text style={{ color: theme.textMuted, flex: 1 }}>{t('searchPlaceholder')}</Text>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate('Search', { startVoice: true });
          }}
          style={{ padding: 4 }}
        >
          <Icon name="mic" color={theme.primary} size={20} />
        </Pressable>
      </Pressable>

      {/* Promo Banner Rows (Slidable) */}
      <View style={styles.promoSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Promo Spesial</Text>
        <FlatList
          data={dummyPromos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePromoPress(item)}
              style={[styles.promoCard, { backgroundColor: theme.card }]}
            >
              <Image source={{ uri: item.bannerUrl }} style={styles.promoImage} />
              <View style={styles.promoDetails}>
                <Text numberOfLines={1} style={[typography.bodyStrong, { color: theme.text }]}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={[typography.tiny, { color: theme.textMuted }]}>
                  Kode: <Text style={{ color: theme.primary, fontWeight: '700' }}>{item.code}</Text>
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      {/* 21 Cineplex Segment Switcher Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab('now_showing')}
          style={[
            styles.tabBtn,
            { borderColor: activeTab === 'now_showing' ? theme.primary : theme.divider },
            activeTab === 'now_showing' && { backgroundColor: theme.primary }
          ]}
        >
          <Text style={[
            typography.caption,
            { fontWeight: '700', color: activeTab === 'now_showing' ? theme.primaryText : theme.text }
          ]}>
            Lagi Tayang
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('advance')}
          style={[
            styles.tabBtn,
            { borderColor: activeTab === 'advance' ? theme.primary : theme.divider },
            activeTab === 'advance' && { backgroundColor: theme.primary }
          ]}
        >
          <Text style={[
            typography.caption,
            { fontWeight: '700', color: activeTab === 'advance' ? theme.primaryText : theme.text, textAlign: 'center' }
          ]}>
            Advance Ticket
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('coming_soon')}
          style={[
            styles.tabBtn,
            { borderColor: activeTab === 'coming_soon' ? theme.primary : theme.divider },
            activeTab === 'coming_soon' && { backgroundColor: theme.primary }
          ]}
        >
          <Text style={[
            typography.caption,
            { fontWeight: '700', color: activeTab === 'coming_soon' ? theme.primaryText : theme.text }
          ]}>
            Akan Tayang
          </Text>
        </Pressable>
      </View>

      {/* Section Title Header for Active Category */}
      <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: spacing.md }]}>
        {activeTab === 'now_showing' && 'Film Sedang Tayang'}
        {activeTab === 'advance' && 'Advance Ticket Sales (4 Film)'}
        {activeTab === 'coming_soon' && 'Film Akan Datang'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <FlatList
        key={numColumns + '_' + activeTab} // Force list remount when tab or columns layout switch
        data={getFilteredMovies()}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            style={{ width: cardWidth, marginRight: 0, marginBottom: spacing.lg }}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: spacing.xl, alignItems: 'center' }}>
            <Text style={[typography.body, { color: theme.textMuted }]}>
              Tidak ada film di kategori ini.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  promoSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  promoCard: {
    width: 280,
    marginRight: spacing.md,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  promoDetails: {
    padding: spacing.sm,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    justifyContent: 'space-between',
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
});

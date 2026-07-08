/**
 * src/screens/Home/SearchScreen.js
 * -----------------------------------------------------------------------
 * Layar Pencarian Film dengan Pencarian Suara (Search Screen + Voice).
 * Mengintegrasikan custom hook useVoiceSearch untuk simulasi input suara.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Modal, SafeAreaView, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { movieService } from '../../services/movieService';
import MovieCard from '../../components/MovieCard';
import EmptyState from '../../components/EmptyState';
import Icon from '../../components/Icon';

export default function SearchScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const { isListening, recognizedText, startListening, stopListening, reset } = useVoiceSearch();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const cardWidth = width >= 768 ? '23.5%' : '48.5%';

  // Check if voice search should start immediately on navigate
  useEffect(() => {
    if (route.params?.startVoice) {
      startListening();
    }
  }, [route.params]);

  // Trigger search filter with 200ms debounce and active request cancellation flag
  useEffect(() => {
    let active = true;
    async function triggerSearch() {
      setSearching(true);
      try {
        const filtered = await movieService.searchMovies(query);
        if (active) {
          setResults(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) {
          setSearching(false);
        }
      }
    }

    const delayDebounceFn = setTimeout(() => {
      triggerSearch();
    }, 200);

    return () => {
      active = false;
      clearTimeout(delayDebounceFn);
    };
  }, [query]);

  // Insert voice recognition text into input box when updated
  useEffect(() => {
    if (recognizedText) {
      setQuery(recognizedText);
    }
  }, [recognizedText]);

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Search Header Bar */}
      <View style={[styles.header, { borderBottomColor: theme.divider }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-left" color={theme.text} size={22} />
        </Pressable>

        <View style={[styles.inputContainer, { backgroundColor: theme.cardAlt }]}>
          <Icon name="search" color={theme.textMuted} size={16} style={{ marginRight: spacing.sm }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text }]}
            autoFocus
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')} style={styles.clearBtn}>
              <Text style={{ fontSize: 14, color: theme.textMuted }}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        <Pressable onPress={startListening} style={[styles.micBtn, { backgroundColor: theme.primary }]}>
          <Icon name="mic" color={theme.primaryText} size={18} />
        </Pressable>
      </View>

      {/* Search Results */}
      {searching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          iconName="search"
          title="Film Tidak Ditemukan"
          message={`Tidak ada film dengan kata kunci "${query}".`}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {results.filter(m => m.status === 'NOW_SHOWING').length > 0 ? (
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={[typography.h3, { color: theme.primary, marginBottom: spacing.md }]}>
                Sedang Tayang
              </Text>
              <View style={styles.grid}>
                {results.filter(m => m.status === 'NOW_SHOWING').map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    onPress={() => handleMoviePress(item)}
                    style={{ width: cardWidth, marginRight: 0, marginBottom: spacing.lg }}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {results.filter(m => m.status === 'COMING_SOON').length > 0 ? (
            <View style={{ marginBottom: spacing.lg }}>
              <Text style={[typography.h3, { color: theme.primary, marginBottom: spacing.md }]}>
                Akan Tayang
              </Text>
              <View style={styles.grid}>
                {results.filter(m => m.status === 'COMING_SOON').map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    onPress={() => handleMoviePress(item)}
                    style={{ width: cardWidth, marginRight: 0, marginBottom: spacing.lg }}
                  />
                ))}
              </View>
            </View>
          ) : null}
        </ScrollView>
      )}

      {/* Voice Search Modal Overlay */}
      <Modal visible={isListening} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[typography.h2, { color: theme.text, marginBottom: spacing.sm }]}>
              {t('voiceSearchTitle')}
            </Text>
            <Text style={[typography.body, { color: theme.textMuted, textAlign: 'center', marginBottom: spacing.xl }]}>
              {t('voiceSearchInstruction')}
            </Text>

            {/* Pulsing Soundwaves Visualizer */}
            <View style={styles.waveContainer}>
              <View style={[styles.waveBar, { backgroundColor: theme.primary, height: 40 }]} />
              <View style={[styles.waveBar, { backgroundColor: theme.primary, height: 60 }]} />
              <View style={[styles.waveBar, { backgroundColor: theme.primary, height: 30 }]} />
              <View style={[styles.waveBar, { backgroundColor: theme.primary, height: 75 }]} />
              <View style={[styles.waveBar, { backgroundColor: theme.primary, height: 40 }]} />
            </View>

            <Text style={[typography.bodyStrong, { color: theme.primary, marginVertical: spacing.lg }]}>
              {recognizedText || t('voiceSearchListening')}
            </Text>

            <Pressable
              onPress={stopListening}
              style={[styles.cancelVoiceBtn, { borderColor: theme.danger }]}
            >
              <Text style={[typography.bodyStrong, { color: theme.danger }]}>Batal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.body,
  },
  clearBtn: {
    padding: spacing.xs,
  },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    width: '100%',
    padding: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  waveBar: {
    width: 6,
    marginHorizontal: 3,
    borderRadius: 3,
  },
  cancelVoiceBtn: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
});

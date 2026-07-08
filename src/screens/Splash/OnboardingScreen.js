/**
 * src/screens/Splash/OnboardingScreen.js
 * -----------------------------------------------------------------------
 * Layar Pengenalan (Onboarding) interaktif. Memiliki slide navigasi
 * pagination sederhana (kompatibel penuh dengan Expo Go).
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

const SLIDES = [
  {
    icon: 'ticket',
    title: 'Nonton Bioskop Praktis',
    description: 'Pesan tiket film favorit Anda secara online langsung dari smartphone tanpa perlu antre panjang.'
  },
  {
    icon: 'location',
    title: 'Mall Terlengkap Pekanbaru',
    description: 'Akses jadwal tayang eksklusif di Mall SKA, Living World, Transmart, dan Plaza Ramayana.'
  },
  {
    icon: 'lock',
    title: 'Pembayaran & Kode Batang',
    description: 'Bayar dengan DANA, OVO, atau VA Bank. Cukup scan barcode e-tiket di counter untuk cetak tiket fisik.'
  }
];

export default function OnboardingScreen({ navigation }) {
  const { theme } = useAppTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Skip Button */}
      <View style={styles.header}>
        {currentSlide < SLIDES.length - 1 ? (
          <Pressable onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.textMuted }]}>Lewati</Text>
          </Pressable>
        ) : <View />}
      </View>

      {/* Main Slide Content */}
      <View style={styles.slideContainer}>
        <Icon name={slide.icon} color={theme.primary} size={96} style={{ marginBottom: spacing.xl }} />
        <Text style={[styles.title, { color: theme.text }]}>{slide.title}</Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>
          {slide.description}
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor: currentSlide === idx ? theme.primary : theme.divider,
                  width: currentSlide === idx ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <Button
          title={currentSlide === SLIDES.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}
          onPress={handleNext}
          style={styles.actionBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  skipText: {
    ...typography.bodyStrong,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emoji: {
    fontSize: 100,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  actionBtn: {
    width: '100%',
  },
});

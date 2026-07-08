/**
 * screens/Settings/AppSettingsScreen.js
 * -----------------------------------------------------------------------
 * Layar pengaturan tampilan (mode gelap/terang/otomatis) dan pemilihan
 * bahasa (Indonesia/Inggris). Ini adalah implementasi konkret dari
 * permintaan "aksesibilitas mode gelap-terang" dan "pemilihan bahasa".
 * -----------------------------------------------------------------------
 */
 
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';
 
const THEME_OPTIONS = [
  { value: 'light', label: 'Terang' },
  { value: 'dark', label: 'Gelap' },
  { value: 'system', label: 'Ikuti Sistem' },
];
 
export default function AppSettingsScreen() {
  const { theme, themeMode, setThemeMode } = useAppTheme();
  const { language, setLanguage } = useLanguage();
 
  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.container}>
      <SectionTitle title="Mode Tampilan" theme={theme} />
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {THEME_OPTIONS.map((opt, idx) => {
          const active = themeMode === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setThemeMode(opt.value)}
              style={[
                styles.optionRow,
                idx < THEME_OPTIONS.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.divider },
              ]}
            >
              <Text style={[typography.body, { color: theme.text, flex: 1 }]}>{opt.label}</Text>
              <RadioDot active={active} theme={theme} />
            </Pressable>
          );
        })}
      </View>
 
      <SectionTitle title="Bahasa" theme={theme} />
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {SUPPORTED_LANGUAGES.map((lang, idx) => {
          const active = language === lang.code;
          return (
            <Pressable
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              style={[
                styles.optionRow,
                idx < SUPPORTED_LANGUAGES.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.divider },
              ]}
            >
              <Text style={[typography.body, { color: theme.text, flex: 1 }]}>{lang.label}</Text>
              <RadioDot active={active} theme={theme} />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
 
function SectionTitle({ title, theme }) {
  return (
    <Text style={[typography.caption, { color: theme.textMuted, marginTop: spacing.lg, marginBottom: spacing.sm }]}>
      {title.toUpperCase()}
    </Text>
  );
}
 
function RadioDot({ active, theme }) {
  return (
    <View style={[styles.radioOuter, { borderColor: active ? theme.primary : theme.divider }]}>
      {active ? <View style={[styles.radioInner, { backgroundColor: theme.primary }]} /> : null}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  card: { borderRadius: radius.md, overflow: 'hidden' },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
});

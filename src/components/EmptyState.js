/**
 * src/components/EmptyState.js
 * -----------------------------------------------------------------------
 * Tampilan kosong (Empty State) reusable untuk hasil pencarian kosong,
 * riwayat pesanan kosong, dll.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing } from '../theme/tokens';
import Button from './Button';

import Icon from './Icon';

export default function EmptyState({
  iconName = 'ticket',
  title = 'Tidak Ada Data',
  message = 'Silakan periksa kembali nanti.',
  actionTitle,
  onActionPress,
}) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Icon name={iconName} color={theme.textMuted} size={56} style={{ marginBottom: spacing.md }} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>
      
      {actionTitle && onActionPress ? (
        <Button
          title={actionTitle}
          onPress={onActionPress}
          variant="outline"
          style={styles.btn}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginVertical: spacing.xl,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  btn: {
    paddingHorizontal: spacing.xl,
  },
});

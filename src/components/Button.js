/**
 * src/components/Button.js
 * -----------------------------------------------------------------------
 * Komponen tombol kustom reusable yang menyesuaikan dengan tema aktif.
 * Mendukung beberapa variant: primary, secondary, outline, dan text.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing, radius } from '../theme/tokens';

export default function Button({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'text'
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const { theme } = useAppTheme();

  const getStyles = () => {
    let btnStyle = {};
    let txtStyle = {};

    switch (variant) {
      case 'primary':
        btnStyle = {
          backgroundColor: theme.primary,
        };
        txtStyle = {
          color: theme.primaryText,
        };
        break;
      case 'secondary':
        btnStyle = {
          backgroundColor: theme.cardAlt,
        };
        txtStyle = {
          color: theme.text,
        };
        break;
      case 'outline':
        btnStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: theme.primary,
        };
        txtStyle = {
          color: theme.primary,
        };
        break;
      case 'text':
        btnStyle = {
          backgroundColor: 'transparent',
          paddingVertical: spacing.xs,
        };
        txtStyle = {
          color: theme.primary,
        };
        break;
    }

    if (disabled) {
      btnStyle.opacity = 0.5;
    }

    return { btnStyle, txtStyle };
  };

  const { btnStyle, txtStyle } = getStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.button, btnStyle, style]}
    >
      {loading ? (
        <ActivityIndicator color={txtStyle.color} size="small" />
      ) : (
        <Text style={[styles.text, txtStyle, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    ...typography.bodyStrong,
  },
});

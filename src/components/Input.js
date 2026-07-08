/**
 * src/components/Input.js
 * -----------------------------------------------------------------------
 * Komponen Input Teks kustom dengan visual bersih, border adaptif
 * terhadap tema aktif, dan label mengambang/status error.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing, radius } from '../theme/tokens';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = '',
  style,
  ...props
}) {
  const { theme } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[styles.label, { color: error ? theme.danger : theme.textMuted }]}>
          {label}
        </Text>
      ) : null}
      
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.card,
            borderColor: error
              ? theme.danger
              : isFocused
              ? theme.primary
              : theme.divider,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, { color: theme.text }]}
          {...props}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeButton}
          >
            <Text style={[typography.caption, { color: theme.primary, fontWeight: '700' }]}>
              {hidePassword ? 'TAMPIL' : 'SEMBUNYI'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.body,
  },
  eyeButton: {
    paddingLeft: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.tiny,
    marginTop: 4,
  },
});

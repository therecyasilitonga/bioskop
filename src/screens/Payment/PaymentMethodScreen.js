/**
 * src/screens/Payment/PaymentMethodScreen.js
 * -----------------------------------------------------------------------
 * Layar Pemilihan Metode Pembayaran (Payment Method Screen).
 * Memuat channel pembayaran e-wallet dan virtual account.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { typography, spacing, radius } from '../../theme/tokens';
import { paymentService } from '../../services/paymentService';
import Icon from '../../components/Icon';

export default function PaymentMethodScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { setPaymentMethod } = useBooking();

  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMethods() {
      try {
        const data = await paymentService.getPaymentMethods();
        setMethods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMethods();
  }, []);

  const handleSelectMethod = (method) => {
    setPaymentMethod(method);
    navigation.navigate('PaymentDetail');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectMethod(item)}
            style={[styles.rowCard, { backgroundColor: theme.card, borderColor: theme.divider }]}
          >
            <View style={styles.iconContainer}>
              <Icon name={item.icon} color={item.color || theme.primary} size={24} />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={[typography.bodyStrong, { color: theme.text }]}>{item.name}</Text>
              <Text style={[typography.caption, { color: theme.textMuted }]}>{item.category}</Text>
            </View>
            <Icon name="chevron-right" color={theme.textMuted} size={18} />
          </Pressable>
        )}
        ListHeaderComponent={
          <Text style={[typography.body, { color: theme.textMuted, marginBottom: spacing.md }]}>
            Pilih metode pembayaran aman untuk memesan tiket nonton Anda.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: spacing.lg,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

/**
 * src/screens/Settings/HelpScreen.js
 * -----------------------------------------------------------------------
 * Layar Bantuan & Pusat FAQ (Help Screen).
 * Membantu menyelesaikan kesulitan pemesanan tiket bioskop Pekanbaru.
 * -----------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Button from '../../components/Button';

const FAQS = [
  {
    q: 'Bagaimana cara cetak tiket fisik di mall Pekanbaru?',
    a: 'Cukup buka tab "Tiket Saya" di aplikasi ini, pilih tiket aktif, tunjukkan Kode Batang (Barcode) pada layar smartphone Anda ke scanner Ticket Box otomatis di Mall SKA, Living World, Transmart, atau Ramayana.'
  },
  {
    q: 'Apakah bisa melakukan refund atau pembatalan tiket?',
    a: 'Sesuai dengan kebijakan bioskop mitra Aura Theater, tiket yang sudah dibeli dan dibayar statusnya adalah FINAL dan tidak dapat dibatalkan, dijadwalkan ulang (reschedule), atau di-refund.'
  },
  {
    q: 'Bagaimana cara menambahkan akun login kedua?',
    a: 'Buka menu "Profil Saya", ketuk "Ganti / Tambah Akun", lalu ketuk tombol "+ Tambah Akun Lain". Masukkan detail login surel/kata sandi akun tambahan Anda. Anda bisa berpindah akun dengan mengetuk daftar akun tersimpan di sana.'
  },
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Kami menerima dompet digital e-wallet terpopuler (DANA, OVO, GoPay) serta Virtual Account transfer berbagai bank nasional (BCA, Mandiri, dll).'
  }
];

export default function HelpScreen({ navigation }) {
  const { theme } = useAppTheme();
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.container}>
      <Text style={[typography.h3, { color: theme.text, marginBottom: spacing.md }]}>
        Pertanyaan Populer
      </Text>

      {FAQS.map((faq, idx) => {
        const isExpanded = expandedIdx === idx;
        return (
          <View key={idx} style={[styles.faqBlock, { backgroundColor: theme.card, borderColor: theme.divider }]}>
            <Pressable onPress={() => toggleExpand(idx)} style={styles.questionRow}>
              <Text style={[typography.bodyStrong, { color: theme.text, flex: 1 }]}>{faq.q}</Text>
              <Text style={{ color: theme.primary, fontWeight: '700' }}>
                {isExpanded ? '▲' : '▼'}
              </Text>
            </Pressable>
            
            {isExpanded ? (
              <View style={[styles.answerBox, { borderTopColor: theme.divider }]}>
                <Text style={[typography.body, { color: theme.textMuted, lineHeight: 22 }]}>
                  {faq.a}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}

      <Button
        title="Hubungi Support Service"
        onPress={() => navigation.navigate('SupportService')}
        style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}
      />

      <Text style={[typography.caption, { color: theme.textMuted, textAlign: 'center', marginTop: spacing.md }]}>
        Mengalami kendala mendesak? Hubungi Customer Support Aura Theater di support@auratheater.com
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  faqBlock: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  answerBox: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
});

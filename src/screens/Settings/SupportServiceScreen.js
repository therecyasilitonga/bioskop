/**
 * src/screens/Settings/SupportServiceScreen.js
 * -----------------------------------------------------------------------
 * Layar Customer Support Service (Interactive Chat Simulator).
 * Memberikan tanggapan chat cepat otomatis untuk membantu pengguna.
 * -----------------------------------------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { useAppTheme } from '../../theme/ThemeContext';
import { typography, spacing, radius } from '../../theme/tokens';
import Icon from '../../components/Icon';

const QUICK_REPLIES = [
  { id: 'qr_refund', text: 'Cara refund tiket', answer: 'Mohon maaf, sesuai kebijakan bioskop mitra Aura Theater, e-tiket yang sudah dibeli dan terkonfirmasi statusnya adalah FINAL dan tidak dapat dibatalkan atau di-refund.' },
  { id: 'qr_pay', text: 'Masalah pembayaran', answer: 'Jika saldo terpotong namun e-tiket belum terbit di tab "Tiket Saya", harap tunggu 5-10 menit. Jika masih terkendala, hubungi billing@auratheater.com dengan menyertakan bukti transfer Anda.' },
  { id: 'qr_account', text: 'Masalah tambah akun', answer: 'Anda dapat mengelola dan menambahkan multi-akun lewat menu "Profil Saya" -> "Kelola Akun". Klik "+ Tambah Akun Lain" untuk menautkan akun baru.' }
];

export default function SupportServiceScreen({ navigation }) {
  const { theme } = useAppTheme();
  const flatListRef = useRef();

  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: 'Halo! Selamat datang di Customer Support Aura Theater Pekanbaru. Ada yang bisa kami bantu hari ini?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text, sender = 'user') => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    if (sender === 'user') {
      setInputText('');
      triggerBotReply(text);
    }
  };

  const triggerBotReply = (userText) => {
    setIsTyping(true);
    
    // Find matching quick reply or send default response
    const matchedReply = QUICK_REPLIES.find(qr => userText.toLowerCase().includes(qr.text.toLowerCase()) || qr.text.toLowerCase().includes(userText.toLowerCase()));
    
    setTimeout(() => {
      setIsTyping(false);
      const botText = matchedReply 
        ? matchedReply.answer 
        : 'Terima kasih atas pesan Anda. Pertanyaan Anda telah kami teruskan ke tim Customer Representative Aura Theater Pekanbaru. Kami akan membalas via surel Anda dalam 15-30 menit.';
      
      sendMessage(botText, 'bot');
    }, 1200);
  };

  const handleQuickReply = (qr) => {
    sendMessage(qr.text, 'user');
  };

  useEffect(() => {
    // Scroll to end of list when new message is added
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const isBot = item.sender === 'bot';
            return (
              <View style={[
                styles.messageRow,
                { justifyContent: isBot ? 'flex-start' : 'flex-end' }
              ]}>
                {isBot && (
                  <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                    <Icon name="about" color={theme.primaryText} size={14} />
                  </View>
                )}
                <View style={[
                  styles.bubble,
                  {
                    backgroundColor: isBot ? theme.card : theme.primary,
                    borderBottomLeftRadius: isBot ? 2 : radius.md,
                    borderBottomRightRadius: isBot ? radius.md : 2,
                  }
                ]}>
                  <Text style={[
                    styles.messageText,
                    { color: isBot ? theme.text : theme.primaryText }
                  ]}>
                    {item.text}
                  </Text>
                  <Text style={[
                    styles.timeText,
                    { color: isBot ? theme.textMuted : 'rgba(255,255,255,0.7)' }
                  ]}>
                    {item.time}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingContainer}>
                <ActivityIndicator size="small" color={theme.primary} />
                <Text style={[typography.tiny, { color: theme.textMuted, marginLeft: 8 }]}>
                  Customer Support sedang mengetik...
                </Text>
              </View>
            ) : null
          }
        />

        {/* Quick Replies Row */}
        {messages.length === 1 && !isTyping && (
          <View style={styles.quickReplyContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {QUICK_REPLIES.map((qr) => (
                <Pressable
                  key={qr.id}
                  onPress={() => handleQuickReply(qr)}
                  style={[styles.quickReplyBtn, { borderColor: theme.primary }]}
                >
                  <Text style={[typography.caption, { color: theme.primary, fontWeight: '700' }]}>
                    {qr.text}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Bar */}
        <View style={[styles.inputBar, { backgroundColor: theme.bgAlt, borderTopColor: theme.divider }]}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Tulis pesan Anda..."
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text, borderColor: theme.divider, backgroundColor: theme.bg }]}
          />
          <Pressable
            onPress={() => sendMessage(inputText)}
            style={[styles.sendBtn, { backgroundColor: theme.primary }]}
            disabled={!inputText.trim()}
          >
            <Icon name="check" color={theme.primaryText} size={20} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  messageText: {
    ...typography.body,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 9,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 36,
    marginBottom: spacing.md,
  },
  quickReplyContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  quickReplyBtn: {
    borderWidth: 1.5,
    borderRadius: radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: spacing.sm,
  },
  inputBar: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    ...typography.body,
    marginRight: spacing.sm,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * src/navigation/RootNavigator.js
 * -----------------------------------------------------------------------
 * Navigator utama menggunakan React Navigation (Native Stack + Bottom Tabs).
 * Mengatur rute antar tab utama (Home, Tickets, Profile) serta stack screen
 * pemesanan, pembayaran, dan pengaturan.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../theme/ThemeContext';
import { Text } from 'react-native';

// Import Screens
import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/Splash/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import AddAccountAuthScreen from '../screens/Auth/AddAccountAuthScreen';

import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import MovieDetailScreen from '../screens/Home/MovieDetailScreen';

import CinemaSelectScreen from '../screens/Booking/CinemaSelectScreen';
import ShowtimeSelectScreen from '../screens/Booking/ShowtimeSelectScreen';
import SeatSelectScreen from '../screens/Booking/SeatSelectScreen';
import OrderSummaryScreen from '../screens/Booking/OrderSummaryScreen';

import PaymentMethodScreen from '../screens/Payment/PaymentMethodScreen';
import PaymentDetailScreen from '../screens/Payment/PaymentDetailScreen';
import PaymentSuccessScreen from '../screens/Payment/PaymentSuccessScreen';

import MyTicketsScreen from '../screens/Ticket/MyTicketsScreen';
import TicketDetailScreen from '../screens/Ticket/TicketDetailScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import AccountListScreen from '../screens/Profile/AccountListScreen';

import AppSettingsScreen from '../screens/Settings/AppSettingsScreen';
import LocationSelectScreen from '../screens/Settings/LocationSelectScreen';
import PrivacySecurityScreen from '../screens/Settings/PrivacySecurityScreen';
import HelpScreen from '../screens/Settings/HelpScreen';
import AboutScreen from '../screens/Settings/AboutScreen';
import SupportServiceScreen from '../screens/Settings/SupportServiceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Icon from '../components/Icon';

// Bottom Tab Navigator
function MainTabs() {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Tickets') iconName = 'ticket';
          if (route.name === 'Profile') iconName = 'profile';
          return <Icon name={iconName} color={color} size={size || 20} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.bgAlt,
          borderTopColor: theme.divider,
          elevation: 5,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: theme.bg,
          borderBottomWidth: 1,
          borderBottomColor: theme.divider,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: theme.text,
          fontWeight: '700',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Aura Theater', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Tickets"
        component={MyTicketsScreen}
        options={{ title: 'Tiket Saya' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil Saya' }}
      />
    </Tab.Navigator>
  );
}

// Master Navigator
export default function RootNavigator() {
  const { user, isLoading } = useAuth();
  const { theme } = useAppTheme();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bg,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShadowVisible: false,
      }}
    >
      {user === null ? (
        // Auth Stack
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Daftar Akun Baru' }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ title: 'Lupa Kata Sandi' }}
          />
          <Stack.Screen
            name="OTP"
            component={OTPScreen}
            options={{ title: 'Verifikasi Kode OTP' }}
          />
        </>
      ) : (
        // Authenticated Stack
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          
          {/* Home / Catalog Stack */}
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetailScreen}
            options={{ title: 'Detail Film' }}
          />

          {/* Booking Stack */}
          <Stack.Screen
            name="CinemaSelect"
            component={CinemaSelectScreen}
            options={{ title: 'Pilih Bioskop' }}
          />
          <Stack.Screen
            name="ShowtimeSelect"
            component={ShowtimeSelectScreen}
            options={{ title: 'Pilih Jadwal' }}
          />
          <Stack.Screen
            name="SeatSelect"
            component={SeatSelectScreen}
            options={{ title: 'Pilih Kursi' }}
          />
          <Stack.Screen
            name="OrderSummary"
            component={OrderSummaryScreen}
            options={{ title: 'Ringkasan Pemesanan' }}
          />

          {/* Payment Stack */}
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethodScreen}
            options={{ title: 'Metode Pembayaran' }}
          />
          <Stack.Screen
            name="PaymentDetail"
            component={PaymentDetailScreen}
            options={{ title: 'Detail Pembayaran' }}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccessScreen}
            options={{ headerShown: false }}
          />

          {/* Ticket Detail */}
          <Stack.Screen
            name="TicketDetail"
            component={TicketDetailScreen}
            options={{ title: 'Detail Tiket' }}
          />

          {/* Profile & Settings Stack */}
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Edit Profil' }}
          />
          <Stack.Screen
            name="AccountList"
            component={AccountListScreen}
            options={{ title: 'Kelola Akun' }}
          />
          <Stack.Screen
            name="AddAccountAuth"
            component={AddAccountAuthScreen}
            options={{ title: 'Tambah Akun' }}
          />
          <Stack.Screen
            name="AppSettings"
            component={AppSettingsScreen}
            options={{ title: 'Pengaturan Aplikasi' }}
          />
          <Stack.Screen
            name="LocationSelect"
            component={LocationSelectScreen}
            options={{ title: 'Pilih Kota' }}
          />
          <Stack.Screen
            name="PrivacySecurity"
            component={PrivacySecurityScreen}
            options={{ title: 'Privasi & Keamanan' }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ title: 'Pusat Bantuan & FAQ' }}
          />
          <Stack.Screen
            name="SupportService"
            component={SupportServiceScreen}
            options={{ title: 'Support Service' }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: 'Tentang Aplikasi' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

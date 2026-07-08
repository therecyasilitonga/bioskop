/**
 * src/context/BookingContext.js
 * -----------------------------------------------------------------------
 * React Context untuk transaksi pemesanan tiket bioskop (booking flow)
 * dan penyimpanan riwayat tiket aktif/riwayat transaksi.
 * -----------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../storage/storageAdapter';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState({
    movie: null,
    cinema: null,
    date: null,
    showtime: null,
    selectedSeats: [],
    ticketPrice: 40000, // Harga default
    adminFee: 3000,
    paymentMethod: null,
    appliedPromo: null,
  });

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadTickets() {
      const savedTickets = await getStorageItem('booked_tickets_list');
      if (savedTickets) {
        setTickets(savedTickets);
      }
    }
    loadTickets();
  }, []);

  function startBooking(movie) {
    setBooking({
      movie,
      cinema: null,
      date: null,
      showtime: null,
      selectedSeats: [],
      ticketPrice: movie.ticketPrice || 40000,
      adminFee: 3000,
      paymentMethod: null,
      appliedPromo: null,
    });
  }

  function setBookingCinema(cinema) {
    setBooking((prev) => ({ ...prev, cinema }));
  }

  function setBookingShowtime(date, showtime) {
    setBooking((prev) => ({ ...prev, date, showtime }));
  }

  function toggleSeat(seatId) {
    setBooking((prev) => {
      const seats = [...prev.selectedSeats];
      const idx = seats.indexOf(seatId);
      if (idx >= 0) {
        seats.splice(idx, 1);
      } else {
        seats.push(seatId);
      }
      return { ...prev, selectedSeats: seats };
    });
  }

  function setPaymentMethod(paymentMethod) {
    setBooking((prev) => ({ ...prev, paymentMethod }));
  }

  function setAppliedPromo(appliedPromo) {
    setBooking((prev) => ({ ...prev, appliedPromo }));
  }

  function clearBooking() {
    setBooking({
      movie: null,
      cinema: null,
      date: null,
      showtime: null,
      selectedSeats: [],
      ticketPrice: 40000,
      adminFee: 3000,
      paymentMethod: null,
      appliedPromo: null,
    });
  }

  async function checkoutTickets(userId) {
    if (!booking.movie || !booking.cinema || booking.selectedSeats.length === 0) {
      throw new Error('Detail pemesanan tidak lengkap');
    }

    const totalTicketCost = booking.selectedSeats.length * booking.ticketPrice;
    
    // Calculate discount amount
    let discount = 0;
    if (booking.appliedPromo) {
      if (booking.appliedPromo.id === 'p1') {
        // Diskon 50% Tiket Pertama
        discount = Math.floor(booking.ticketPrice * 0.5);
      } else if (booking.appliedPromo.id === 'p2') {
        // Popcorn Gratis -> flat 10.000 discount
        discount = 10000;
      } else if (booking.appliedPromo.id === 'p3') {
        // Cashback / saver Rp 15.000
        discount = 15000;
      }
    }

    const grandTotal = Math.max(0, totalTicketCost + booking.adminFee - discount);

    const newTicket = {
      id: `TICK_${Date.now()}`,
      userId: userId || 'anonymous',
      movie: {
        id: booking.movie.id,
        title: booking.movie.title,
        coverUrl: booking.movie.coverUrl,
        genre: booking.movie.genre,
        ageRating: booking.movie.ageRating,
      },
      cinema: {
        id: booking.cinema.id,
        name: booking.cinema.name,
        location: booking.cinema.location,
      },
      date: booking.date,
      showtime: booking.showtime,
      seats: booking.selectedSeats,
      totalCost: grandTotal,
      paymentMethod: booking.paymentMethod ? booking.paymentMethod.name : 'E-Wallet',
      bookingTime: new Date().toISOString(),
      barcodeData: `TIX-${Date.now()}-${booking.selectedSeats.join('')}`,
      appliedPromo: booking.appliedPromo ? booking.appliedPromo.title : null,
      discountAmount: discount,
    };

    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    await setStorageItem('booked_tickets_list', updatedTickets);
    
    // Clear booking state after successful checkout
    clearBooking();
    return newTicket;
  }

  return (
    <BookingContext.Provider
      value={{
        booking,
        tickets,
        startBooking,
        setBookingCinema,
        setBookingShowtime,
        toggleSeat,
        setPaymentMethod,
        setAppliedPromo,
        clearBooking,
        checkoutTickets,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

/**
 * src/context/LocationContext.js
 * -----------------------------------------------------------------------
 * React Context untuk manajemen lokasi pengguna.
 * Default lokasi adalah "Pekanbaru" dengan pilihan bioskop di mall:
 * SKA, Living World, Transmart, dan Ramayana.
 * -----------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../storage/storageAdapter';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [city, setCityState] = useState('Pekanbaru');
  const [selectedCinema, setSelectedCinemaState] = useState(null);

  useEffect(() => {
    async function loadLocation() {
      const savedCity = await getStorageItem('active_city');
      if (savedCity) {
        setCityState(savedCity);
      }
      const savedCinema = await getStorageItem('active_cinema');
      if (savedCinema) {
        setSelectedCinemaState(savedCinema);
      }
    }
    loadLocation();
  }, []);

  async function setCity(newCity) {
    setCityState(newCity);
    await setStorageItem('active_city', newCity);
    // Reset selected cinema if city changes
    setSelectedCinemaState(null);
    await setStorageItem('active_cinema', null);
  }

  async function setSelectedCinema(cinema) {
    setSelectedCinemaState(cinema);
    await setStorageItem('active_cinema', cinema);
  }

  return (
    <LocationContext.Provider value={{ city, setCity, selectedCinema, setSelectedCinema }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

/**
 * src/hooks/useVoiceSearch.js
 * -----------------------------------------------------------------------
 * Hook kustom untuk simulasi pencarian berbasis suara (Voice Search).
 * 
 * Karena pustaka pengenal suara asli (seperti @react-native-voice/voice)
 * membutuhkan kompilasi native biner khusus yang tidak dapat berjalan di
 * Expo Go standar secara langsung, hook ini menyediakan simulasi interaktif
 * yang mendekati nyata: menampilkan gelombang suara dan melakukan pengetikan
 * otomatis berdasarkan hasil pemrosesan suara virtual.
 * -----------------------------------------------------------------------
 */

import { useState, useRef } from 'react';

const MOCK_PHRASES = [
  'Spider-Man',
  'Batman',
  'Avatar',
  'Dune'
];

export function useVoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState(null);
  
  const timeoutRef = useRef(null);

  const startListening = () => {
    setIsListening(true);
    setRecognizedText('');
    setError(null);

    // Pick a deterministic mock phrase
    const randomPhrase = MOCK_PHRASES[Math.floor(Math.random() * MOCK_PHRASES.length)];
    
    // Simulate real-time typing of the voice-recognized text
    let index = 0;
    const words = randomPhrase.split(' ');

    const simulateSpeechStream = () => {
      if (index < words.length) {
        setRecognizedText((prev) => (prev ? `${prev} ${words[index]}` : words[index]));
        index++;
        timeoutRef.current = setTimeout(simulateSpeechStream, 800);
      } else {
        setIsListening(false);
      }
    };

    // Delay start of speech typing simulation
    timeoutRef.current = setTimeout(simulateSpeechStream, 1200);
  };

  const stopListening = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsListening(false);
  };

  const reset = () => {
    stopListening();
    setRecognizedText('');
    setError(null);
  };

  return {
    isListening,
    recognizedText,
    error,
    startListening,
    stopListening,
    reset,
  };
}
export default useVoiceSearch;

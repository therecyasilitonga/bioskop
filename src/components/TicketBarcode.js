/**
 * src/components/TicketBarcode.js
 * -----------------------------------------------------------------------
 * Komponen Kode Batang (Barcode) tiket bioskop. Digambar secara dinamis
 * menggunakan React Native SVG berdasarkan input string data tiket.
 * -----------------------------------------------------------------------
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useAppTheme } from '../theme/ThemeContext';
import { typography, spacing } from '../theme/tokens';

export default function TicketBarcode({ value = 'TIX-1234567890' }) {
  const { theme } = useAppTheme();

  // Generate deterministic bar widths/spaces based on the string value
  const generateBars = () => {
    const bars = [];
    let currentX = 0;
    
    // Hash value to get a seed
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    // Generate ~45 lines with deterministic thick/thin configurations
    for (let i = 0; i < 48; i++) {
      const isThick = ((hash + i) % 5 === 0) || ((hash + i) % 7 === 0);
      const isExtraThick = ((hash + i) % 11 === 0);
      const lineW = isExtraThick ? 4.5 : (isThick ? 2.5 : 1);
      const spaceW = ((hash - i) % 4 === 0) ? 3 : 1.5;

      bars.push({
        x: currentX,
        width: lineW,
      });

      currentX += lineW + spaceW;
    }

    return { bars, totalWidth: currentX };
  };

  const { bars, totalWidth } = generateBars();
  const svgHeight = 70;

  return (
    <View style={styles.container}>
      <View style={[styles.barcodeWrapper, { backgroundColor: '#FFFFFF' }]}>
        <Svg height={svgHeight} width={totalWidth}>
          {bars.map((bar, idx) => (
            <Rect
              key={idx}
              x={bar.x}
              y={0}
              width={bar.width}
              height={svgHeight}
              fill="#000000"
            />
          ))}
        </Svg>
      </View>
      <Text style={[styles.barcodeText, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  barcodeWrapper: {
    padding: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  barcodeText: {
    ...typography.caption,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: spacing.sm,
  },
});

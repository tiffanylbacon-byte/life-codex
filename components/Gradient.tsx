import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';

export default function Gradient({ children }: { children: ReactNode }) {
  return (
    <LinearGradient
      colors={['#06060d', '#141423', '#0b0b12']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, padding: 16 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

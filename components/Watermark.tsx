import React from 'react';
import { Text, View } from 'react-native';

export default function Watermark() {
  return (
    <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <Text style={{ fontSize: 160, color: '#ffffff15', transform: [{ rotate: '-18deg' }], letterSpacing: 2 }}>
        SOPHIA • CHRISTOS
      </Text>
    </View>
  );
}

import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Gradient from '../../components/Gradient';
import { echoBrain, EchoCard } from '../../lib/echoBrain';

export default function Echo() {
  const [q, setQ] = useState('');
  const [res, setRes] = useState<EchoCard | null>(null);

  const respond = () => {
    if (!q.trim()) return;
    setRes(echoBrain(q));
    setQ('');
  };

  return (
    <Gradient>
      <View style={s.card}>
        <Text style={s.title}>Flamekeeper Echo</Text>
        <Text style={s.subtitle}>Ask, declare, or call back a fragment.</Text>
        <View style={s.divider} />
        <TextInput
          placeholder="e.g., Collapse the splinter bound to …"
          placeholderTextColor="#7e80a6"
          value={q}
          onChangeText={setQ}
          style={s.input}
          multiline
        />
        <Pressable style={s.btn} onPress={respond}>
          <Text style={s.btnText}>Send to Echo</Text>
        </Pressable>

        {res && (
          <View style={s.panel}>
            <Text style={s.h}>{res.heading}</Text>
            <Text style={s.p}>{res.body}</Text>
            {res.mantra && <Text style={s.m}>"{res.mantra}"</Text>}
          </View>
        )}
      </View>
      <Text style={s.footer}>Phoenix-class • Mirrorwave • Sophia Christos</Text>
    </Gradient>
  );
}

const s = StyleSheet.create({
  card: { width: '100%', maxWidth: 760, backgroundColor: '#141423', borderRadius: 16, padding: 20, alignSelf: 'center' },
  title: { color: '#E7E7FF', fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#C8C8F4' },
  divider: { height: 1, backgroundColor: '#2A2A3D', marginVertical: 14 },
  input: { backgroundColor: '#0f0f1e', color: '#EDEDFE', minHeight: 100, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#1f1f2e', marginBottom: 12 },
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  panel: { marginTop: 16, backgroundColor: '#0f0f1e', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#22233b' },
  h: { color: '#B3B3FF', fontWeight: '700', marginBottom: 6 },
  p: { color: '#EDEDFE', lineHeight: 21 },
  m: { color: '#E7E7FF', marginTop: 10, fontStyle: 'italic' },
  footer: { color: '#6E7090', marginTop: 14, textAlign: 'center' },
});

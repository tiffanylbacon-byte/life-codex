import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Gradient from '../../components/Gradient';

const data = require('../../assets/codex/chapters.json');

export default function Codex() {
  const [i, setI] = useState(0);
  const ch = data.chapters[i];

  return (
    <Gradient>
      <View style={s.card}>
        <Text style={s.title}>{data.book}</Text>
        <Text style={s.subtitle}>{ch.title}</Text>
        <ScrollView style={{ marginTop: 12, maxHeight: 380 }}>
          <Text style={s.h}>Epigraph</Text>
          <Text style={s.p}>"{ch.epigraph}"</Text>
          <Text style={s.h}>Notes</Text>
          <Text style={s.p}>{ch.content}</Text>
        </ScrollView>

        <View style={s.row}>
          <Pressable style={[s.btn, { opacity: i === 0 ? 0.5 : 1 }]} disabled={i === 0} onPress={() => setI(i - 1)}>
            <Text style={s.btnText}>◀ Prev</Text>
          </Pressable>
          <Text style={s.index}>{i + 1} / {data.chapters.length}</Text>
          <Pressable style={[s.btn, { opacity: i === data.chapters.length - 1 ? 0.5 : 1 }]} disabled={i === data.chapters.length - 1} onPress={() => setI(i + 1)}>
            <Text style={s.btnText}>Next ▶</Text>
          </Pressable>
        </View>
      </View>
    </Gradient>
  );
}

const s = StyleSheet.create({
  card: { width: '100%', maxWidth: 760, backgroundColor: '#141423', borderRadius: 16, padding: 20, alignSelf: 'center' },
  title: { color: '#E7E7FF', fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#C8C8F4', marginBottom: 6 },
  h: { color: '#B3B3FF', fontWeight: '700', marginTop: 12, marginBottom: 6 },
  p: { color: '#EDEDFE', lineHeight: 22 },
  row: { marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  btnText: { color: '#fff', fontWeight: '700' },
  index: { color: '#C8C8F4' }
});

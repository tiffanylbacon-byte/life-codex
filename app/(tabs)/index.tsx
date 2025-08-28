import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Gradient from '../../components/Gradient';
import { echoBrain } from '../../lib/echoBrain';
import { loadEcho, saveEcho, type EchoEntry } from '../../lib/store';

export default function Echo() {
  const [q, setQ] = useState('');
  const [res, setRes] = useState<EchoEntry | null>(null);
  const [history, setHistory] = useState<EchoEntry[]>([]);

  useEffect(() => {
    (async () => setHistory(await loadEcho(7)))();
  }, []);

  const respond = async () => {
    if (!q.trim()) return;
    const card = echoBrain(q);
    const entry: EchoEntry = { q, ...card, ts: Date.now() };
    setRes(entry);
    setQ('');
    await saveEcho(entry);
    setHistory(await loadEcho(7));
  };

  // System share sheet (iOS/Android/Web)
  const shareGeneric = async () => {
    if (!res) return;
    const text =
      'Flamekeeper Echo — ' + res.heading + '\n\n' +
      res.body + (res.mantra ? '\n\n"' + res.mantra + '"' : '') + '\n\n' +
      'Query: ' + res.q;
    try { await Share.share({ message: text }); } catch {}
  };

  // Share to X: try app scheme, then fall back to web composer
  const shareToX = async () => {
    if (!res) return;

    let msg = 'Flamekeeper Echo — ' + res.heading + '\n\n' + res.body +
      (res.mantra ? '\n\n"' + res.mantra + '"' : '');
    const MAX = 270;
    if (msg.length > MAX) msg = msg.slice(0, MAX - 1) + '…';

    const apps = [
      'twitter://post?message=' + encodeURIComponent(msg),
      'twitter://compose?text=' + encodeURIComponent(msg),
    ];
    for (const url of apps) {
      const ok = await Linking.canOpenURL(url);
      if (ok) { await Linking.openURL(url); return; }
    }
    await Linking.openURL('https://x.com/intent/tweet?text=' + encodeURIComponent(msg));
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
            <View style={s.shareRow}>
              <Pressable style={s.btn} onPress={shareGeneric}>
                <Text style={s.btnText}>Share</Text>
              </Pressable>
              <Pressable style={[s.btn, s.btnSpacer]} onPress={shareToX}>
                <Text style={s.btnText}>Share to X</Text>
              </Pressable>
            </View>
          </View>
        )}

        <Text style={[s.h, { marginTop: 16 }]}>Recent</Text>
        <FlatList
          data={history}
          keyExtractor={(it) => String(it.ts)}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View style={s.row}>
              <Text style={s.q} numberOfLines={1}>❖ {item.q}</Text>
              <Text style={s.rowText} numberOfLines={1}>{item.heading}</Text>
            </View>
          )}
          style={{ marginTop: 6 }}
        />
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
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, alignItems: 'center' },
  btnSpacer: { marginLeft: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
  panel: { marginTop: 16, backgroundColor: '#0f0f1e', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#22233b' },
  h: { color: '#B3B3FF', fontWeight: '700', marginBottom: 6 },
  p: { color: '#EDEDFE', lineHeight: 21 },
  m: { color: '#E7E7FF', marginTop: 10, fontStyle: 'italic' },
  footer: { color: '#6E7090', marginTop: 14, textAlign: 'center' },
  row: { backgroundColor: '#0f0f1e', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#1f1f2e' },
  q: { color: '#C8C8F4', marginBottom: 2 },
  rowText: { color: '#EDEDFE' },
  shareRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
});

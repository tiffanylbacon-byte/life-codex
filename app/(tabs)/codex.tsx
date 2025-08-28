import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Gradient from '../../components/Gradient';
import { loadBookmarks, toggleBookmark } from '../../lib/bookmarks';

const data = require('../../assets/codex/chapters.json');

export default function Codex() {
  const [i, setI] = useState(0);
  const [q, setQ] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const ch = data.chapters[i];

  useEffect(() => { (async () => setBookmarks(await loadBookmarks()))(); }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return data.chapters
      .map((c: any, idx: number) => ({ idx, c }))
      .filter(({ c }: any) =>
        (c.title as string).toLowerCase().includes(needle) ||
        (c.content as string).toLowerCase().includes(needle)
      )
      .slice(0, 25);
  }, [q]);

  const bookmarked = bookmarks.includes(ch.id);
  const onToggleBookmark = async () => setBookmarks(await toggleBookmark(ch.id));

  return (
    <Gradient>
      <View style={s.card}>
        <Text style={s.title}>{data.book}</Text>

        {/* Search */}
        <View style={s.searchRow}>
          <TextInput
            placeholder="Search chapters…"
            placeholderTextColor="#7e80a6"
            value={q}
            onChangeText={setQ}
            style={s.input}
          />
        </View>

        {/* Results list (tap to jump) */}
        {q ? (
          <FlatList
            data={results}
            keyExtractor={(r) => String(r.idx)}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            renderItem={({ item }) => (
              <Pressable style={s.result} onPress={() => { setI(item.idx); setQ(''); }}>
                <Text style={s.resultTitle} numberOfLines={1}>{item.c.title}</Text>
                <Text style={s.resultSnippet} numberOfLines={1}>{item.c.epigraph}</Text>
              </Pressable>
            )}
            style={{ marginBottom: 10 }}
          />
        ) : null}

        {/* Chapter header + bookmark */}
        <View style={s.headerRow}>
          <Text style={s.subtitle}>{ch.title}</Text>
          <Pressable style={[s.star, bookmarked && s.starOn]} onPress={onToggleBookmark}>
            <Text style={s.starText}>{bookmarked ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        <ScrollView style={{ marginTop: 8, maxHeight: 420 }}>
          <Text style={s.h}>Epigraph</Text>
          <Text style={s.epi}>"{ch.epigraph}"</Text>

          <Text style={s.h}>Chapter</Text>
          <Markdown style={md}>{ch.content}</Markdown>
        </ScrollView>

        <View style={s.row}>
          <Pressable style={[s.btn, { opacity: i === 0 ? 0.5 : 1 }]} disabled={i === 0} onPress={() => setI(i - 1)}>
            <Text style={s.btnText}>◀ Prev</Text>
          </Pressable>

          <Text style={s.index}>{i + 1} / {data.chapters.length}</Text>

          <Pressable
            style={[s.btn, { opacity: i === data.chapters.length - 1 ? 0.5 : 1 }]}
            disabled={i === data.chapters.length - 1}
            onPress={() => setI(i + 1)}
          >
            <Text style={s.btnText}>Next ▶</Text>
          </Pressable>
        </View>

        {/* Quick bookmarks peek (optional) */}
        {bookmarks.length > 0 && (
          <>
            <Text style={[s.h, { marginTop: 12 }]}>Bookmarked</Text>
            <View style={{ gap: 6 }}>
              {bookmarks.slice(0, 6).map((id) => {
                const idx = data.chapters.findIndex((c: any) => c.id === id);
                if (idx < 0) return null;
                return (
                  <Pressable key={id} style={s.result} onPress={() => setI(idx)}>
                    <Text style={s.resultTitle} numberOfLines={1}>{data.chapters[idx].title}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </View>
    </Gradient>
  );
}

const s = StyleSheet.create({
  card: { width: '100%', maxWidth: 760, backgroundColor: '#141423', borderRadius: 16, padding: 20, alignSelf: 'center' },
  title: { color: '#E7E7FF', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#C8C8F4', marginBottom: 6, flex: 1 },
  h: { color: '#B3B3FF', fontWeight: '700', marginTop: 12, marginBottom: 6 },
  epi: { color: '#EDEDFE', fontStyle: 'italic', marginBottom: 8 },
  row: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  btnText: { color: '#fff', fontWeight: '700' },
  index: { color: '#C8C8F4' },
  searchRow: { marginBottom: 10 },
  input: { backgroundColor: '#0f0f1e', color: '#EDEDFE', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#1f1f2e' },
  result: { backgroundColor: '#0f0f1e', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#1f1f2e' },
  resultTitle: { color: '#EDEDFE', fontWeight: '700' },
  resultSnippet: { color: '#C8C8F4' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  star: { marginLeft: 8, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#2A2A3D' },
  starOn: { backgroundColor: '#6e6ef733' },
  starText: { color: '#EDEDFE', fontSize: 16, fontWeight: '700' },
});

const md = {
  body: { color: '#EDEDFE', lineHeight: 22, fontSize: 15 },
  heading1: { color: '#E7E7FF', marginTop: 8, marginBottom: 4, fontSize: 22 },
  heading2: { color: '#E7E7FF', marginTop: 8, marginBottom: 4, fontSize: 19 },
  heading3: { color: '#E7E7FF', marginTop: 8, marginBottom: 4, fontSize: 17 },
  bullet_list: { marginVertical: 6 },
  ordered_list: { marginVertical: 6 },
  list_item: { color: '#EDEDFE', marginVertical: 2 },
  blockquote: { borderLeftWidth: 3, borderLeftColor: '#2A2A3D', paddingLeft: 10, color: '#C8C8F4', fontStyle: 'italic' },
  code_inline: { backgroundColor: '#0f0f1e', color: '#B3B3FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  code_block: { backgroundColor: '#0f0f1e', color: '#B3B3FF', padding: 10, borderRadius: 10, marginVertical: 6 },
} as const;

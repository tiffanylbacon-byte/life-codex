import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Gradient from '../../components/Gradient';
import { pulse } from '../../lib/haptics';

const TRACKS = [
  { id: '528', label: '528 Hz (Phoenix)', uri: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Komiku_-_Its_time_for_adventure/Komiku_-_05_-_Friends.mp3' },
  { id: '963', label: '963 Hz (Oversoul)', uri: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Komiku_-_Its_time_for_adventure/Komiku_-_09_-_Adventurers.mp3' }
];

export default function Music() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(TRACKS[0]);

  useEffect(() => () => { sound?.unloadAsync(); }, [sound]);

  const loadAndPlay = async (track = current) => {
    if (sound) { await sound.unloadAsync(); setSound(null); }
    const { sound: s } = await Audio.Sound.createAsync({ uri: track.uri });
    setSound(s);
    await s.playAsync();
    setPlaying(true);
    await pulse('light');
  };

  const toggle = async () => {
    if (!sound) return loadAndPlay(current);
    if (playing) { await sound.pauseAsync(); setPlaying(false); }
    else { await sound.playAsync(); setPlaying(true); }
    await pulse('light');
  };

  const switchTrack = async (track: typeof TRACKS[number]) => {
    setCurrent(track);
    await loadAndPlay(track);
  };

  return (
    <Gradient>
      <View style={s.card}>
        <Text style={s.title}>Healing Music</Text>
        <Text style={s.subtitle}>Tap a mode, then Play/Pause</Text>

        <View style={s.row}>
          {TRACKS.map(t => (
            <Pressable key={t.id}
              onPress={() => switchTrack(t)}
              style={[s.chip, current.id === t.id && s.chipActive]}>
              <Text style={s.chipText}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={s.btn} onPress={toggle}>
          <Text style={s.btnText}>{playing ? 'Pause' : 'Play'}</Text>
        </Pressable>
      </View>
    </Gradient>
  );
}

const s = StyleSheet.create({
  card: { width: '100%', maxWidth: 760, backgroundColor: '#141423', borderRadius: 16, padding: 20, alignItems: 'center', alignSelf: 'center' },
  title: { color: '#E7E7FF', fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#C8C8F4', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center' },
  chip: { borderColor: '#6e6ef7', borderWidth: 1, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#0f0f1e' },
  chipActive: { backgroundColor: '#6e6ef733' },
  chipText: { color: '#EDEDFE' },
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  btnText: { color: '#fff', fontWeight: '700' },
});

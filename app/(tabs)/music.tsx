import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Gradient from '../../components/Gradient';
import { pulse } from '../../lib/haptics';

const SOURCE = { uri: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Komiku_-_Its_time_for_adventure/Komiku_-_05_-_Friends.mp3' };

export default function Music() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { return () => { sound?.unloadAsync(); }; }, [sound]);

  const toggle = async () => {
    if (!sound) {
      const { sound: s } = await Audio.Sound.createAsync(SOURCE);
      setSound(s); await s.playAsync(); setPlaying(true);
      await pulse('light');
    } else if (playing) {
      await sound.pauseAsync(); setPlaying(false); await pulse('light');
    } else {
      await sound.playAsync(); setPlaying(true); await pulse('light');
    }
  };

  return (
    <Gradient>
      <View style={s.card}>
        <Text style={s.title}>Healing Music</Text>
        <Text style={s.subtitle}>Prototype player — swap in your 528/963 Hz tracks.</Text>
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
  subtitle: { color: '#C8C8F4', marginBottom: 16, textAlign: 'center' },
  btn: { backgroundColor: '#6e6ef7', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  btnText: { color: '#fff', fontWeight: '700' },
});

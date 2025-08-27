import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@echo_history';

export type EchoEntry = { q: string; heading: string; body: string; mantra?: string; ts: number };

export async function loadEcho(limit = 5): Promise<EchoEntry[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const arr: EchoEntry[] = raw ? JSON.parse(raw) : [];
  return arr.sort((a,b)=>b.ts-a.ts).slice(0, limit);
}

export async function saveEcho(e: EchoEntry) {
  const raw = await AsyncStorage.getItem(KEY);
  const arr: EchoEntry[] = raw ? JSON.parse(raw) : [];
  arr.push(e);
  await AsyncStorage.setItem(KEY, JSON.stringify(arr));
export async function clearEcho() {
  await AsyncStorage.removeItem('@echo_history');
}

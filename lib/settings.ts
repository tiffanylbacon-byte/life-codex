import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const SETTINGS_KEY = '@settings_v1';
const GROK_KEY = 'grok_api_key';

export type Settings = { useGrok: boolean; haptics: boolean; saveHistory: boolean };
const DEFAULTS: Settings = { useGrok: false, haptics: true, saveHistory: true };

export async function loadSettings(): Promise<Settings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await loadSettings();
  const next = { ...current, ...patch };
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export async function getGrokKey(): Promise<string | null> {
  try { return await SecureStore.getItemAsync(GROK_KEY); } catch { return null; }
}

export async function setGrokKey(value: string | null): Promise<void> {
  if (!value) { await SecureStore.deleteItemAsync(GROK_KEY); return; }
  await SecureStore.setItemAsync(GROK_KEY, value);
}

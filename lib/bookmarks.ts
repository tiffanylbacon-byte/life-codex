import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = '@codex_bookmarks';

export async function loadBookmarks(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
export async function toggleBookmark(id: string): Promise<string[]> {
  const list = await loadBookmarks();
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1); else list.push(id);
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

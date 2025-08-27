import * as Haptics from 'expo-haptics';
import { loadSettings } from './settings';

export async function pulse(kind: 'light'|'medium'|'heavy' = 'medium') {
  const s = await loadSettings();
  if (!s.haptics) return;
  const style =
    kind === 'light' ? Haptics.ImpactFeedbackStyle.Light :
    kind === 'heavy' ? Haptics.ImpactFeedbackStyle.Heavy :
    Haptics.ImpactFeedbackStyle.Medium;
  await Haptics.impactAsync(style);
}

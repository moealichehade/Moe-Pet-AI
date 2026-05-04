import { useMemo, useState } from 'react';

export type PetMood = 'happy' | 'sleepy' | 'curious';

const moods: PetMood[] = ['happy', 'sleepy', 'curious'];

export function usePetState(lines: string[]) {
  const [mood, setMood] = useState<PetMood>('happy');
  const [dialogue, setDialogue] = useState(lines[0] ?? '...');

  const emoji = useMemo(() => {
    switch (mood) {
      case 'sleepy':
        return '😴';
      case 'curious':
        return '🤔';
      default:
        return '😊';
    }
  }, [mood]);

  const onInteract = () => {
    const nextMood = moods[Math.floor(Math.random() * moods.length)];
    const nextLine = lines[Math.floor(Math.random() * lines.length)] ?? '...';
    setMood(nextMood);
    setDialogue(nextLine);
  };

  return { mood, emoji, dialogue, onInteract };
}

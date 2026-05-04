import { useState, useCallback } from 'react';

export type PetMood = 'happy' | 'sleepy' | 'curious';

export interface PetState {
  mood: PetMood;
  dialogue: string;
  position: { x: number; y: number };
}

const moods: PetMood[] = ['happy', 'sleepy', 'curious'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function usePetState(
  dialogues: string[],
  initialPosition: { x: number; y: number }
) {
  const [mood, setMood] = useState<PetMood>('happy');
  const [dialogue, setDialogue] = useState<string>(() => randomFrom(dialogues));
  const [position, setPosition] = useState(initialPosition);

  const handleClick = useCallback(() => {
    setMood(randomFrom(moods));
    setDialogue(randomFrom(dialogues));
  }, [dialogues]);

  const handleDrag = useCallback((x: number, y: number) => {
    setPosition({ x, y });
  }, []);

  return { mood, dialogue, position, handleClick, handleDrag };
}

import wolfSvg from '../assets/wolf.svg';
import lines from '../data/dialogue/wolf.json';
import { usePetState } from '../hooks/usePetState';
import { Pet } from './Pet';

export function Wolf() {
  const state = usePetState(lines);

  return (
    <Pet
      name="Wolf"
      asset={wolfSvg}
      initialPosition={{ x: 500, y: 280 }}
      mood={state.mood}
      moodEmoji={state.emoji}
      dialogue={state.dialogue}
      onInteract={state.onInteract}
    />
  );
}

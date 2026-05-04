import owlSvg from '../assets/owl.svg';
import lines from '../data/dialogue/owl.json';
import { usePetState } from '../hooks/usePetState';
import { Pet } from './Pet';

export function Owl() {
  const state = usePetState(lines);

  return (
    <Pet
      name="Owl"
      asset={owlSvg}
      initialPosition={{ x: 150, y: 260 }}
      mood={state.mood}
      moodEmoji={state.emoji}
      dialogue={state.dialogue}
      onInteract={state.onInteract}
    />
  );
}

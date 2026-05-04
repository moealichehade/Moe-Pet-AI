import { motion } from 'framer-motion';
import { useState } from 'react';
import type { PetMood } from '../hooks/usePetState';

type PetProps = {
  name: string;
  asset: string;
  mood: PetMood;
  moodEmoji: string;
  dialogue: string;
  initialPosition: { x: number; y: number };
  onInteract: () => void;
};

export function Pet({ name, asset, mood, moodEmoji, dialogue, initialPosition, onInteract }: PetProps) {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <motion.div
      className={`pet pet-${mood}`}
      drag
      dragMomentum={false}
      initial={initialPosition}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      onTap={() => {
        onInteract();
        setShowBubble(true);
        window.setTimeout(() => setShowBubble(false), 2400);
      }}
    >
      <img src={asset} alt={`${name} pet`} className="pet-asset" />
      <div className="pet-label">{name} {moodEmoji}</div>
      {showBubble && <div className="dialogue-bubble">{dialogue}</div>}
    </motion.div>
  );
}

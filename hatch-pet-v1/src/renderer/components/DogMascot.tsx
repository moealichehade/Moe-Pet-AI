import type { FC } from 'react';

type Mood = 'happy' | 'surprised' | 'sleepy';

interface DogMascotProps {
  mood: Mood;
  onClick: () => void;
}

const eyeByMood = {
  happy: { left: 'M72 82 Q78 76 84 82', right: 'M116 82 Q122 76 128 82' },
  surprised: { left: 'M78 80 a4 6 0 1 0 0.1 0', right: 'M122 80 a4 6 0 1 0 0.1 0' },
  sleepy: { left: 'M72 82 L86 82', right: 'M116 82 L130 82' }
};

const mouthByMood = {
  happy: 'M86 111 Q100 124 114 111',
  surprised: 'M95 110 a6 8 0 1 0 0.1 0',
  sleepy: 'M90 114 Q100 111 110 114'
};

const DogMascot: FC<DogMascotProps> = ({ mood, onClick }) => {
  return (
    <button className="pet-button" onClick={onClick} aria-label="Pet the dog mascot">
      <svg width="220" height="220" viewBox="0 0 200 200" role="img" aria-label="Original anime-style dog mascot">
        <ellipse cx="100" cy="175" rx="46" ry="10" fill="rgba(58, 45, 98, 0.25)" />
        <path d="M62 75 C38 54, 38 27, 62 28 C77 29, 87 43, 87 62 Z" fill="#D7A26D" />
        <path d="M138 75 C162 54, 162 27, 138 28 C123 29, 113 43, 113 62 Z" fill="#D7A26D" />
        <circle cx="100" cy="95" r="62" fill="#F2C189" />
        <ellipse cx="100" cy="114" rx="26" ry="19" fill="#FCE9D7" />
        <path d={eyeByMood[mood].left} stroke="#4A2F2F" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={eyeByMood[mood].right} stroke="#4A2F2F" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="101" r="4" fill="#4A2F2F" />
        <path d={mouthByMood[mood]} stroke="#7B4D3E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="72" cy="101" r="7" fill="#F7B1A5" opacity="0.75" />
        <circle cx="128" cy="101" r="7" fill="#F7B1A5" opacity="0.75" />
      </svg>
    </button>
  );
};

export default DogMascot;

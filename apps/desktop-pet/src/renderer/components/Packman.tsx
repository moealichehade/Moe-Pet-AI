import type { FC } from 'react';
import type { PetMood } from '../hooks/usePetState';

interface PackmanProps { mood: PetMood; }

const mouthPath: Record<PetMood, string> = {
  happy: 'M80 82 L132 48 A62 62 0 1 1 132 116 Z',
  sleepy: 'M80 82 L138 72 A62 62 0 1 1 138 92 Z',
  curious: 'M80 82 L136 42 A62 62 0 1 1 136 122 Z',
};

const eyeY: Record<PetMood, number> = {
  happy: 42,
  sleepy: 48,
  curious: 38,
};

const Packman: FC<PackmanProps> = ({ mood }) => (
  <svg width="120" height="120" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Packman pause pet">
    <defs>
      <radialGradient id="desktopPackmanGlow" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#FFF7A8" />
        <stop offset="48%" stopColor="#FFD83D" />
        <stop offset="100%" stopColor="#F4A900" />
      </radialGradient>
      <filter id="desktopPackmanShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#F4A900" floodOpacity="0.30" />
      </filter>
    </defs>

    <ellipse cx="78" cy="142" rx="48" ry="8" fill="rgba(244,169,0,0.24)" />
    <g filter="url(#desktopPackmanShadow)">
      <path d={mouthPath[mood]} fill="url(#desktopPackmanGlow)" stroke="#FFF0A0" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="80" cy="82" r="62" fill="none" stroke="rgba(77,50,0,0.18)" strokeWidth="3" />
    </g>

    <circle cx="78" cy={eyeY[mood]} r="8" fill="#2D2100" />
    <circle cx="75" cy={eyeY[mood] - 3} r="2.5" fill="#FFF7C2" />

    <g fill="#FFF2A8" opacity="0.95">
      <circle cx="132" cy="82" r="6" />
      <circle cx="148" cy="82" r="4" opacity="0.78" />
    </g>

    <path d="M42 118 Q62 132 88 124" stroke="rgba(255,255,255,0.36)" strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>
);

export default Packman;

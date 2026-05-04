import type { FC } from 'react';
import type { PetMood } from '../hooks/usePetState';

interface WolfSVGProps { mood: PetMood; }

const eyeMap = {
  happy:   { l: 'M52 72 Q58 66 64 72', r: 'M96 72 Q102 66 108 72' },
  sleepy:  { l: 'M52 72 L64 72',        r: 'M96 72 L108 72' },
  curious: { l: 'M58 68 a5 6 0 1 0 0.1 0', r: 'M102 68 a5 6 0 1 0 0.1 0' },
};

const mouthMap = {
  happy:   'M72 96 Q80 106 88 96',
  sleepy:  'M74 99 Q80 96 86 99',
  curious: 'M76 96 a5 6 0 1 0 0.1 0',
};

const Wolf: FC<WolfSVGProps> = ({ mood }) => (
  <svg width="120" height="140" viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg"
    role="img" aria-label="Wolf pet">
    {/* Shadow */}
    <ellipse cx="80" cy="172" rx="38" ry="7" fill="rgba(40,40,60,0.2)" />
    {/* Body */}
    <ellipse cx="80" cy="124" rx="40" ry="42" fill="#5A5A7A" />
    {/* Chest fur */}
    <ellipse cx="80" cy="132" rx="22" ry="28" fill="#9090AA" />
    {/* Tail hint */}
    <path d="M118 140 Q148 120 138 100 Q130 88 120 108" stroke="#4A4A6A" strokeWidth="12"
      fill="none" strokeLinecap="round" />
    {/* Head */}
    <circle cx="80" cy="74" r="40" fill="#6A6A8A" />
    {/* Ears */}
    <polygon points="52,46 40,14 68,38" fill="#5A5A7A" />
    <polygon points="108,46 120,14 92,38" fill="#5A5A7A" />
    {/* Inner ears */}
    <polygon points="55,44 46,22 66,38" fill="#B090A0" />
    <polygon points="105,44 114,22 94,38" fill="#B090A0" />
    {/* Muzzle */}
    <ellipse cx="80" cy="90" rx="22" ry="18" fill="#9090AA" />
    {/* Eyes */}
    <circle cx="60" cy="72" r="10" fill="white" />
    <circle cx="100" cy="72" r="10" fill="white" />
    <path d={eyeMap[mood].l} stroke="#1A1A2E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d={eyeMap[mood].r} stroke="#1A1A2E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* Pupils — amber wolf eyes */}
    <circle cx="60" cy="74" r="4" fill="#C07820" />
    <circle cx="100" cy="74" r="4" fill="#C07820" />
    {/* Nose */}
    <ellipse cx="80" cy="86" rx="6" ry="4" fill="#2D2D3E" />
    {/* Mouth */}
    <path d={mouthMap[mood]} stroke="#4A3A4A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Paws */}
    <ellipse cx="62" cy="164" rx="12" ry="6" fill="#5A5A7A" />
    <ellipse cx="98" cy="164" rx="12" ry="6" fill="#5A5A7A" />
  </svg>
);

export default Wolf;

import type { FC } from 'react';
type Mood = 'happy' | 'sleepy' | 'curious';
const eyeMap = {
  happy:   { l: 'M32 50 Q38 44 44 50', r: 'M60 50 Q66 44 72 50' },
  sleepy:  { l: 'M32 50 L44 50',        r: 'M60 50 L72 50' },
  curious: { l: 'M38 46 a5 6 0 1 0 0.1 0', r: 'M66 46 a5 6 0 1 0 0.1 0' },
};
const mouthMap = {
  happy:   'M44 64 Q52 72 60 64',
  sleepy:  'M46 66 Q52 64 58 66',
  curious: 'M52 64 a5 5 0 1 0 0.1 0',
};
const Panda: FC<{ mood?: Mood }> = ({ mood = 'happy' }) => (
  <svg width="120" height="128" viewBox="0 0 104 128" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="52" cy="124" rx="30" ry="5" fill="rgba(58,122,191,0.15)"/>
    <ellipse cx="52" cy="96" rx="30" ry="32" fill="white" stroke="#222" strokeWidth="1"/>
    <ellipse cx="52" cy="104" rx="20" ry="22" fill="#e8e8e8"/>
    <circle cx="52" cy="56" r="34" fill="white" stroke="#222" strokeWidth="1"/>
    <ellipse cx="24" cy="48" r="14" fill="#1a1a2e"/>
    <ellipse cx="80" cy="48" r="14" fill="#1a1a2e"/>
    <circle cx="36" cy="52" r="9" fill="white"/>
    <circle cx="68" cy="52" r="9" fill="white"/>
    <path d={eyeMap[mood].l} stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d={eyeMap[mood].r} stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="36" cy="54" r="4" fill="#1a1a2e"/>
    <circle cx="68" cy="54" r="4" fill="#1a1a2e"/>
    <ellipse cx="52" cy="68" rx="16" ry="12" fill="#f0f0f0"/>
    <ellipse cx="52" cy="70" rx="6" ry="4" fill="#3A7ABF"/>
    <path d={mouthMap[mood]} stroke="#2a5a8f" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <ellipse cx="38" cy="120" rx="10" ry="5" fill="#1a1a2e"/>
    <ellipse cx="66" cy="120" rx="10" ry="5" fill="#1a1a2e"/>
    <ellipse cx="18" cy="96" rx="10" ry="16" fill="#1a1a2e" transform="rotate(-15 18 96)"/>
    <ellipse cx="86" cy="96" rx="10" ry="16" fill="#1a1a2e" transform="rotate(15 86 96)"/>
  </svg>
);
export default Panda;

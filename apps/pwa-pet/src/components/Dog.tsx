import type { FC } from 'react';
type Mood = 'happy' | 'sleepy' | 'curious';
const eyeMap = {
  happy:   { l: 'M34 46 Q40 40 46 46', r: 'M58 46 Q64 40 70 46' },
  sleepy:  { l: 'M34 46 L46 46',        r: 'M58 46 L70 46' },
  curious: { l: 'M40 43 a5 5 0 1 0 0.1 0', r: 'M64 43 a5 5 0 1 0 0.1 0' },
};
const mouthMap = {
  happy:   'M46 60 Q52 68 58 60',
  sleepy:  'M48 62 Q52 60 56 62',
  curious: 'M50 60 a4 5 0 1 0 0.1 0',
};
const Dog: FC<{ mood?: Mood }> = ({ mood = 'happy' }) => (
  <svg width="120" height="126" viewBox="0 0 104 126" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="52" cy="122" rx="28" ry="5" fill="rgba(74,158,106,0.15)"/>
    <ellipse cx="52" cy="94" rx="28" ry="32" fill="#4A9E6A"/>
    <ellipse cx="52" cy="102" rx="18" ry="22" fill="#80C896" opacity="0.4"/>
    <circle cx="52" cy="54" r="32" fill="#5AAE7A"/>
    <ellipse cx="28" cy="38" rx="10" ry="18" fill="#4A9E6A" transform="rotate(-20 28 38)"/>
    <ellipse cx="76" cy="38" rx="10" ry="18" fill="#4A9E6A" transform="rotate(20 76 38)"/>
    <ellipse cx="52" cy="60" rx="24" ry="20" fill="#80C896"/>
    <ellipse cx="52" cy="66" rx="14" ry="10" fill="#C8E8D0"/>
    <circle cx="38" cy="50" r="8" fill="white"/>
    <circle cx="66" cy="50" r="8" fill="white"/>
    <path d={eyeMap[mood].l} stroke="#1a3a22" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d={eyeMap[mood].r} stroke="#1a3a22" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="38" cy="52" r="3.5" fill="#1a3a22"/>
    <circle cx="66" cy="52" r="3.5" fill="#1a3a22"/>
    <ellipse cx="52" cy="64" rx="6" ry="4" fill="#3A7E52"/>
    <path d={mouthMap[mood]} stroke="#2A6A42" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M52 96 Q38 108 30 116 Q44 118 52 112 Q60 118 74 116 Q66 108 52 96Z" fill="#3A7E52"/>
    <ellipse cx="38" cy="118" rx="9" ry="5" fill="#4A9E6A"/>
    <ellipse cx="66" cy="118" rx="9" ry="5" fill="#4A9E6A"/>
  </svg>
);
export default Dog;

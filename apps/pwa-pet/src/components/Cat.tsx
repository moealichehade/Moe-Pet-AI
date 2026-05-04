import type { FC } from 'react';
type Mood = 'happy' | 'sleepy' | 'curious';
const eyeMap = {
  happy:   { l: 'M36 42 Q42 36 48 42', r: 'M56 42 Q62 36 68 42' },
  sleepy:  { l: 'M36 42 L48 42',        r: 'M56 42 L68 42' },
  curious: { l: 'M42 39 a5 6 0 1 0 0.1 0', r: 'M62 39 a5 6 0 1 0 0.1 0' },
};
const mouthMap = {
  happy:   'M44 54 Q52 62 60 54',
  sleepy:  'M46 57 Q52 54 58 57',
  curious: 'M50 54 a4 5 0 1 0 0.1 0',
};
const Cat: FC<{ mood?: Mood }> = ({ mood = 'happy' }) => (
  <svg width="120" height="120" viewBox="0 0 104 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="52" cy="116" rx="28" ry="5" fill="rgba(224,90,138,0.15)"/>
    <ellipse cx="52" cy="88" rx="26" ry="30" fill="#E05A8A"/>
    <ellipse cx="52" cy="96" rx="16" ry="20" fill="#F0A0C0" opacity="0.5"/>
    <circle cx="52" cy="52" r="30" fill="#E05A8A"/>
    <polygon points="26,30 18,8 38,24" fill="#C03A6A"/>
    <polygon points="78,30 86,8 66,24" fill="#C03A6A"/>
    <polygon points="28,28 22,12 36,22" fill="#F0A0C0"/>
    <polygon points="76,28 82,12 68,22" fill="#F0A0C0"/>
    <ellipse cx="52" cy="56" rx="22" ry="20" fill="#F4C0D1"/>
    <circle cx="40" cy="48" r="8" fill="white"/>
    <circle cx="64" cy="48" r="8" fill="white"/>
    <path d={eyeMap[mood].l} stroke="#3a1020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d={eyeMap[mood].r} stroke="#3a1020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="40" cy="50" r="3.5" fill="#3a1020"/>
    <circle cx="64" cy="50" r="3.5" fill="#3a1020"/>
    <ellipse cx="52" cy="60" rx="4" ry="3" fill="#E05A8A"/>
    <path d={mouthMap[mood]} stroke="#C03A6A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <line x1="52" y1="60" x2="52" y2="66" stroke="#C03A6A" strokeWidth="1.5"/>
    <line x1="28" y1="56" x2="14" y2="52" stroke="#C03A6A" strokeWidth="1" strokeLinecap="round"/>
    <line x1="28" y1="60" x2="13" y2="60" stroke="#C03A6A" strokeWidth="1" strokeLinecap="round"/>
    <line x1="76" y1="56" x2="90" y2="52" stroke="#C03A6A" strokeWidth="1" strokeLinecap="round"/>
    <line x1="76" y1="60" x2="91" y2="60" stroke="#C03A6A" strokeWidth="1" strokeLinecap="round"/>
    <ellipse cx="40" cy="112" rx="8" ry="4" fill="#C03A6A"/>
    <ellipse cx="64" cy="112" rx="8" ry="4" fill="#C03A6A"/>
  </svg>
);
export default Cat;

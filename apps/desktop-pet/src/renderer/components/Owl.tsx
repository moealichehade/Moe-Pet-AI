import type { FC } from 'react';
import type { PetMood } from '../hooks/usePetState';

interface OwlSVGProps { mood: PetMood; }

const eyeMap = {
  happy:   { l: 'M54 68 Q60 62 66 68', r: 'M94 68 Q100 62 106 68' },
  sleepy:  { l: 'M54 68 L66 68',        r: 'M94 68 L106 68' },
  curious: { l: 'M60 65 a5 6 0 1 0 0.1 0', r: 'M100 65 a5 6 0 1 0 0.1 0' },
};

const mouthMap = {
  happy:   'M74 88 Q80 94 86 88',
  sleepy:  'M76 90 Q80 88 84 90',
  curious: 'M78 88 a3 4 0 1 0 0.1 0',
};

const Owl: FC<OwlSVGProps> = ({ mood }) => (
  <svg width="120" height="140" viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg"
    role="img" aria-label="Owl pet">
    {/* Shadow */}
    <ellipse cx="80" cy="172" rx="38" ry="7" fill="rgba(80,60,120,0.18)" />
    {/* Body */}
    <ellipse cx="80" cy="120" rx="38" ry="44" fill="#7B68C8" />
    {/* Wing left */}
    <ellipse cx="44" cy="122" rx="16" ry="28" fill="#6255A8" transform="rotate(-12 44 122)" />
    {/* Wing right */}
    <ellipse cx="116" cy="122" rx="16" ry="28" fill="#6255A8" transform="rotate(12 116 122)" />
    {/* Head */}
    <circle cx="80" cy="72" r="38" fill="#8B7DD8" />
    {/* Ear tufts */}
    <polygon points="58,38 50,16 66,32" fill="#6255A8" />
    <polygon points="102,38 110,16 94,32" fill="#6255A8" />
    {/* Face disc */}
    <ellipse cx="80" cy="76" rx="28" ry="26" fill="#C4B9F0" />
    {/* Eyes */}
    <circle cx="62" cy="68" r="11" fill="white" />
    <circle cx="98" cy="68" r="11" fill="white" />
    <path d={eyeMap[mood].l} stroke="#2D1F5E" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d={eyeMap[mood].r} stroke="#2D1F5E" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Pupils */}
    <circle cx="62" cy="70" r="4" fill="#2D1F5E" />
    <circle cx="98" cy="70" r="4" fill="#2D1F5E" />
    {/* Beak */}
    <polygon points="80,78 74,88 86,88" fill="#E8A930" />
    {/* Mouth */}
    <path d={mouthMap[mood]} stroke="#C07A10" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Belly pattern */}
    <ellipse cx="80" cy="130" rx="20" ry="26" fill="#A99EE0" opacity="0.5" />
    {/* Feet */}
    <ellipse cx="66" cy="162" rx="10" ry="5" fill="#E8A930" />
    <ellipse cx="94" cy="162" rx="10" ry="5" fill="#E8A930" />
  </svg>
);

export default Owl;

import { useRef, type FC, type ReactNode } from 'react';
import type { PetMood } from '../hooks/usePetState';

interface PetProps {
  name: string;
  mood: PetMood;
  dialogue: string;
  position: { x: number; y: number };
  onDrag: (x: number, y: number) => void;
  onClick: () => void;
  children: ReactNode;
  accentColor: string;
  scale?: number;
}

const Pet: FC<PetProps> = ({
  name, mood, dialogue, position,
  onDrag, onClick, children, accentColor, scale = 1,
}) => {
  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    onDrag(e.clientX - offset.current.x, e.clientY - offset.current.y);
  };

  const handleMouseUp = () => { dragging.current = false; };

  return (
    <div
      className="pet-wrapper"
      style={{ left: position.x, top: position.y }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="pet-row">
        {/* Pet body left */}
        <div className="pet-col">
          <button
            className={`pet-body pet-mood-${mood}`}
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            onMouseDown={handleMouseDown}
            onClick={onClick}
            aria-label={`${name} desktop pet`}
          >
            {children}
          </button>
          <div className="pet-name" style={{ color: accentColor }}>{name}</div>
        </div>

        {/* Speech bubble right */}
        <div className="speech-bubble" style={{ borderColor: accentColor }}>
          <span>{dialogue}</span>
        </div>
      </div>
    </div>
  );
};

export default Pet;

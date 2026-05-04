import { useMemo, useState } from 'react';
import DogMascot from './components/DogMascot';
import dialogues from './data/dialogues.json';

type Mood = 'happy' | 'surprised' | 'sleepy';

const moods: Mood[] = ['happy', 'surprised', 'sleepy'];

const randomFrom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

function App() {
  const [mood, setMood] = useState<Mood>('happy');
  const [line, setLine] = useState(() => randomFrom(dialogues));

  const speech = useMemo(() => line, [line]);

  const handleDogClick = () => {
    setMood(randomFrom(moods));
    setLine(randomFrom(dialogues));
  };

  return (
    <main className="pet-stage">
      <div className="speech-bubble">{speech}</div>
      <div className="pet-float">
        <DogMascot mood={mood} onClick={handleDogClick} />
      </div>
    </main>
  );
}

export default App;

import { useState, useEffect, useCallback } from 'react';
import Owl from './components/Owl';
import Wolf from './components/Wolf';
import { usePetState } from './hooks/usePetState';
import owlDialogues  from './data/dialogue/owl.json';
import wolfDialogues from './data/dialogue/wolf.json';
import './styles/app.css';

const pauseMessages = [
  "One hour in. Take a breath. You are doing well.",
  "Pause. Shoulders down. Jaw soft. One slow breath.",
  "An hour has passed. How are you feeling right now?",
  "Step back for one moment. Notice what you notice.",
  "Before the next hour begins — one breath. That is enough.",
  "Your mind has been working hard. Give it ten seconds.",
  "Check in with your body. Tight anywhere? Breathe into it.",
  "One mindful pause. In through the nose. Out through the mouth.",
  "You showed up. That matters. Take a quiet moment.",
  "The hour is done. What do you need right now?",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const owl  = usePetState(owlDialogues,  { x: 0, y: 0 });
  const wolf = usePetState(wolfDialogues, { x: 0, y: 0 });

  const [pause, setPause]         = useState<string | null>(null);
  const [pauseVisible, setPauseVisible] = useState(false);

  // Hourly pause
  const showPause = useCallback(() => {
    setPause(randomFrom(pauseMessages));
    setPauseVisible(true);
    setTimeout(() => setPauseVisible(false), 20000);
  }, []);

  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000;
    const t = setTimeout(() => {
      showPause();
      const interval = setInterval(showPause, ONE_HOUR);
      return () => clearInterval(interval);
    }, ONE_HOUR);
    return () => clearTimeout(t);
  }, [showPause]);

  return (
    <div className="app">

      {/* Header */}
      <div className="app-header">
        <span className="app-title">Moe Pet AI</span>
        <span className="app-sub">Your mindful companions</span>
      </div>

      {/* Pets */}
      <div className="pets-row">

        {/* Wolf card */}
        <div className="pet-card wolf-card" onClick={wolf.handleClick}>
          <div className="pet-bubble wolf-bubble">{wolf.dialogue}</div>
          <div className="pet-figure">
            <Wolf mood={wolf.mood} />
          </div>
          <div className="pet-label wolf-label">Wolf</div>
          <div className="pet-hint">tap to interact</div>
        </div>

        {/* Owl card */}
        <div className="pet-card owl-card" onClick={owl.handleClick}>
          <div className="pet-bubble owl-bubble">{owl.dialogue}</div>
          <div className="pet-figure">
            <Owl mood={owl.mood} />
          </div>
          <div className="pet-label owl-label">Owl</div>
          <div className="pet-hint">tap to reflect</div>
        </div>

      </div>

      {/* Wolf info panel */}
      <div className="wolf-info-panel">
        <span className="wolf-info-title">📅 Wolf — Schedule Agent</span>
        <p className="wolf-info-body">
          Add events to Apple Calendar on your Mac. Wolf reads them and alerts you
          10 minutes before each one. On mobile, Wolf stays in focus mode.
        </p>
      </div>

      {/* Hourly pause overlay */}
      {pauseVisible && pause && (
        <div className="pause-overlay" onClick={() => setPauseVisible(false)}>
          <div className="pause-card">
            <span className="pause-icon">🦉</span>
            <p className="pause-message">{pause}</p>
            <small className="pause-dismiss">tap anywhere to dismiss</small>
          </div>
        </div>
      )}

    </div>
  );
}

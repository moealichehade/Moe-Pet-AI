import { useState, useEffect, type FC } from 'react';

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

const OwlPrompt: FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible]  = useState(false);

  useEffect(() => {
    // Fire once after 1 hour, then every hour
    const ONE_HOUR = 60 * 60 * 1000;

    function showPause() {
      setMessage(randomFrom(pauseMessages));
      setVisible(true);
      // Auto-dismiss after 20 seconds
      setTimeout(() => setVisible(false), 20000);
    }

    // First pause after 1 hour
    const first = setTimeout(() => {
      showPause();
      // Then repeat every hour
      const interval = setInterval(showPause, ONE_HOUR);
      return () => clearInterval(interval);
    }, ONE_HOUR);

    return () => clearTimeout(first);
  }, []);

  // Also listen for main-process signals
  useEffect(() => {
    if (!window.moePetAPI) return;

    window.moePetAPI.onHourlyPause?.(() => {
      setMessage(randomFrom(pauseMessages));
      setVisible(true);
      setTimeout(() => setVisible(false), 20000);
    });

    window.moePetAPI.onIdleNotify?.(() => {
      setMessage("You have been away. Welcome back. One breath before you continue.");
      setVisible(true);
      setTimeout(() => setVisible(false), 15000);
    });

    window.moePetAPI.onPreEventNotify?.(() => {
      setMessage("Something is coming up. Settle your mind before you step in.");
      setVisible(true);
      setTimeout(() => setVisible(false), 12000);
    });
  }, []);

  if (!visible || !message) return null;

  return (
    <div className="owl-prompt" onClick={() => setVisible(false)}>
      <span className="owl-prompt-icon">🦉</span>
      <p>{message}</p>
      <small>tap to dismiss</small>
    </div>
  );
};

export default OwlPrompt;

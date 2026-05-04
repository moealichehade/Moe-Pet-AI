import { useState, useEffect, type FC } from 'react';

const idlePrompts = [
  "You've been away. How are you feeling right now?",
  "One breath before you return. In… and out.",
  "Welcome back. What matters most in the next hour?",
  "Rest noticed. Take a moment to ground yourself.",
  "Notice your body. Shoulders down. Jaw soft. Ready.",
];

const preEventPrompts = [
  "Something is coming. One breath first.",
  "How do you want to show up in this next moment?",
  "Settle your mind before you step in.",
  "You are prepared. Trust what you know.",
  "Presence is your greatest tool right now.",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const OwlPrompt: FC = () => {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.moePetAPI) return;

    window.moePetAPI.onIdleNotify(() => {
      setPrompt(randomFrom(idlePrompts));
      setVisible(true);
      setTimeout(() => setVisible(false), 12000);
    });

    window.moePetAPI.onPreEventNotify(() => {
      setPrompt(randomFrom(preEventPrompts));
      setVisible(true);
      setTimeout(() => setVisible(false), 10000);
    });
  }, []);

  if (!visible || !prompt) return null;

  return (
    <div className="owl-prompt" onClick={() => setVisible(false)}>
      <span className="owl-prompt-icon">🦉</span>
      <p>{prompt}</p>
      <small>tap to dismiss</small>
    </div>
  );
};

export default OwlPrompt;

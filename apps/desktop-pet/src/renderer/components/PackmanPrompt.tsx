import { useEffect, useRef, useState, type FC } from 'react';
import Packman from './Packman';

const ONE_HOUR = 60 * 60 * 1000;
const PAUSE_START_HOUR = 8;
const PAUSE_END_HOUR = 21;
const PACKMAN_PAUSE_MESSAGE = 'pause stretch, breath and drink water';

function isPauseWindow(date: Date) {
  const hour = date.getHours();
  return hour >= PAUSE_START_HOUR && hour < PAUSE_END_HOUR;
}

function getDelayToNextPause(now = new Date()) {
  if (isPauseWindow(now)) return ONE_HOUR;

  const next = new Date(now);
  next.setHours(PAUSE_START_HOUR, 0, 0, 0);

  if (now.getHours() >= PAUSE_END_HOUR || now >= next) {
    next.setDate(next.getDate() + 1);
  }

  return next.getTime() - now.getTime();
}

const PackmanPrompt: FC = () => {
  const [visible, setVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPause = () => {
    setVisible(true);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setVisible(false), 20000);
  };

  useEffect(() => {
    const scheduleNextPause = () => {
      const delay = getDelayToNextPause();
      pauseTimer.current = setTimeout(() => {
        if (isPauseWindow(new Date())) showPause();
        scheduleNextPause();
      }, delay);
    };

    scheduleNextPause();

    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!window.moePetAPI) return;

    window.moePetAPI.onHourlyPause?.(() => {
      if (isPauseWindow(new Date())) showPause();
    });
  }, []);

  if (!visible) return null;

  return (
    <div className="packman-prompt" onClick={() => setVisible(false)}>
      <div className="packman-prompt-pet"><Packman mood="curious" /></div>
      <p>{PACKMAN_PAUSE_MESSAGE}</p>
      <small>8 AM–9 PM hourly reminder · tap to dismiss</small>
    </div>
  );
};

export default PackmanPrompt;

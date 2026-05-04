import { useState, useEffect, useCallback } from 'react';
import type { DailyLogPayload, LogEntry } from '../../../shared/types';

const emptyEntry: LogEntry = {
  date: '',
  completedTasks: [],
  attendedEvents: [],
  reflections: [],
  owlPromptsSeen: 0,
  lastUpdated: '',
};

declare global {
  interface Window {
    moePetAPI?: {
      fetchSchedule:    () => Promise<import('../../../shared/types').SchedulePayload>;
      onScheduleUpdate: (cb: (p: import('../../../shared/types').SchedulePayload) => void) => void;
      onPreEventNotify: (cb: (e: import('../../../shared/types').CalendarEvent) => void) => void;
      onIdleNotify:     (cb: (secs: number) => void) => void;
      onHourlyPause:    (cb: () => void) => void;
      fetchLog:         () => Promise<DailyLogPayload>;
      completeTask:     (title: string) => Promise<void>;
      attendEvent:      (title: string) => Promise<void>;
      logReflection:    (text: string)  => Promise<void>;
      logOwlPrompt:     ()              => Promise<void>;
      onLogUpdated:     (cb: (p: DailyLogPayload) => void) => void;
    };
  }
}

export function useDailyLog() {
  const [today, setToday] = useState<LogEntry>(emptyEntry);
  const [week,  setWeek]  = useState<LogEntry[]>([]);

  const load = useCallback(async () => {
    if (!window.moePetAPI) return;
    const payload = await window.moePetAPI.fetchLog();
    setToday(payload.today);
    setWeek(payload.week);
  }, []);

  useEffect(() => {
    load();
    if (window.moePetAPI?.onLogUpdated) {
      window.moePetAPI.onLogUpdated(p => {
        setToday(p.today);
        setWeek(p.week);
      });
    }
  }, [load]);

  const completeTask = async (title: string) => {
    await window.moePetAPI?.completeTask(title);
  };

  const attendEvent = async (title: string) => {
    await window.moePetAPI?.attendEvent(title);
  };

  const addReflection = async (text: string) => {
    await window.moePetAPI?.logReflection(text);
  };

  return { today, week, completeTask, attendEvent, addReflection };
}

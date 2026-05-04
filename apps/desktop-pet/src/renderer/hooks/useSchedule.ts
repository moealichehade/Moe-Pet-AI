import { useState, useEffect, useCallback } from 'react';
import type { SchedulePayload, CalendarEvent, Reminder } from '../../../shared/types';

interface ScheduleState {
  nextEvent: CalendarEvent | null;
  allEvents: CalendarEvent[];
  topReminders: Reminder[];
  permissionStatus: 'granted' | 'denied' | 'mock' | 'loading';
  lastFetched: string | null;
}

function parsePayload(payload: SchedulePayload): Omit<ScheduleState, 'permissionStatus'> {
  const upcoming = payload.events
    .filter(e => e.minutesUntil > 0)
    .sort((a, b) => a.minutesUntil - b.minutesUntil);
  return {
    nextEvent:    upcoming[0] ?? null,
    allEvents:    payload.events,
    topReminders: payload.reminders.filter(r => !r.completed).slice(0, 3),
    lastFetched:  payload.fetchedAt,
  };
}

export function useSchedule() {
  const [state, setState] = useState<ScheduleState>({
    nextEvent: null,
    allEvents: [],
    topReminders: [],
    permissionStatus: 'loading',
    lastFetched: null,
  });

  const load = useCallback(async () => {
    if (!window.moePetAPI) return;
    const payload = await window.moePetAPI.fetchSchedule();
    setState({ ...parsePayload(payload), permissionStatus: payload.permissionStatus });
  }, []);

  useEffect(() => {
    load();
    if (window.moePetAPI?.onScheduleUpdate) {
      window.moePetAPI.onScheduleUpdate(payload => {
        setState({ ...parsePayload(payload), permissionStatus: payload.permissionStatus });
      });
    }
  }, [load]);

  return { ...state, refresh: load };
}

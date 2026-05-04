import { contextBridge, ipcRenderer } from 'electron';
import type { SchedulePayload, CalendarEvent, DailyLogPayload } from '../shared/types';

contextBridge.exposeInMainWorld('moePetAPI', {
  // ── Schedule ────────────────────────────────────────────────────────────
  fetchSchedule: (): Promise<SchedulePayload> =>
    ipcRenderer.invoke('schedule:fetch'),

  onScheduleUpdate: (cb: (p: SchedulePayload) => void) =>
    ipcRenderer.on('schedule:data', (_e, p) => cb(p)),

  onPreEventNotify: (cb: (e: CalendarEvent) => void) =>
    ipcRenderer.on('notify:pre-event', (_e, e) => cb(e)),

  onIdleNotify: (cb: (secs: number) => void) =>
    ipcRenderer.on('notify:idle', (_e, s) => cb(s)),

  // ── Daily log ───────────────────────────────────────────────────────────
  fetchLog: (): Promise<DailyLogPayload> =>
    ipcRenderer.invoke('log:fetch'),

  completeTask:  (title: string) => ipcRenderer.invoke('log:complete-task', title),
  attendEvent:   (title: string) => ipcRenderer.invoke('log:attend-event',  title),
  logReflection: (text: string)  => ipcRenderer.invoke('log:reflection',    text),
  logOwlPrompt:  ()              => ipcRenderer.invoke('log:owl-prompt'),

  onLogUpdated: (cb: (p: DailyLogPayload) => void) =>
    ipcRenderer.on('log:updated', (_e, p) => cb(p)),
});

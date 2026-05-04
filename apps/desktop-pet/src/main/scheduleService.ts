import { execFile } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import type { SchedulePayload, CalendarEvent, Reminder } from '../shared/types';
import { getMockSchedule } from './mockSchedule';

// Path to compiled Swift binary — lives next to the main process in production,
// or in the swift/ folder during development
function getBridgePath(): string {
  const devPath  = path.join(__dirname, '../../swift/EventKitBridge');
  const prodPath = path.join(process.resourcesPath ?? '', 'EventKitBridge');
  if (fs.existsSync(devPath))  return devPath;
  if (fs.existsSync(prodPath)) return prodPath;
  return '';
}

function runBridge(): Promise<SchedulePayload> {
  return new Promise((resolve) => {
    const bridgePath = getBridgePath();

    if (!bridgePath) {
      console.warn('[scheduleService] EventKitBridge not found — falling back to mock');
      resolve(getMockSchedule());
      return;
    }

    execFile(bridgePath, { timeout: 12000 }, (err, stdout, stderr) => {
      if (err || !stdout.trim()) {
        console.warn('[scheduleService] Bridge error — falling back to mock:', stderr);
        resolve(getMockSchedule());
        return;
      }

      try {
        const raw = JSON.parse(stdout) as SchedulePayload;
        resolve(raw);
      } catch (parseErr) {
        console.warn('[scheduleService] JSON parse error — falling back to mock');
        resolve(getMockSchedule());
      }
    });
  });
}

export async function fetchSchedule(): Promise<SchedulePayload> {
  return runBridge();
}

export function getNextEvent(payload: SchedulePayload): CalendarEvent | null {
  const upcoming = payload.events
    .filter((e: CalendarEvent) => e.minutesUntil > 0)
    .sort((a: CalendarEvent, b: CalendarEvent) => a.minutesUntil - b.minutesUntil);
  return upcoming[0] ?? null;
}

export function getTopReminders(payload: SchedulePayload, count = 3): Reminder[] {
  return payload.reminders
    .filter((r: Reminder) => !r.completed)
    .slice(0, count);
}

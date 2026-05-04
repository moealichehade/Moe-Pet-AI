import { execFile } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import type { SchedulePayload, CalendarEvent, Reminder } from '../shared/types';
import { getMockSchedule } from './mockSchedule';

// Path to compiled Swift binary — lives next to the main process in production,
// or in the swift/ folder during development
function getBridgePath(): string {
  // __dirname = dist/main/main/ so go up 3 levels to reach project root
  const devPath  = path.join(__dirname, '../../../swift/EventKitBridge');
  const prodPath = path.join(process.resourcesPath ?? '', 'EventKitBridge');
  console.log('[scheduleService] Looking for bridge at:', devPath);
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

// Work-relevant Reminder lists — Wolf shows these first
const WORK_LISTS = ['inbox', 'ams', 'counseling', 'momento', 'momento24-7',
  'mindfulink', 'isca', 'snhu', 'antioch', 'school', 'work', 'moe'];

function isWorkList(listName: string): boolean {
  const lower = listName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return WORK_LISTS.some(w => lower.includes(w));
}

export function getTopReminders(payload: SchedulePayload, count = 5): Reminder[] {
  const all = payload.reminders.filter((r: Reminder) => !r.completed);
  // Work lists first, then others
  const work  = all.filter(r => isWorkList(r.list));
  const other = all.filter(r => !isWorkList(r.list));
  return [...work, ...other].slice(0, count);
}

export function getWorkReminders(payload: SchedulePayload, count = 5): Reminder[] {
  return payload.reminders
    .filter((r: Reminder) => !r.completed && isWorkList(r.list))
    .slice(0, count);
}

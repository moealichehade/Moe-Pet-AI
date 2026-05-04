import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Log lives at ~/.moe-pet-ai/daily-log.json — never in the repo
const LOG_DIR  = path.join(os.homedir(), '.moe-pet-ai');
const LOG_FILE = path.join(LOG_DIR, 'daily-log.json');

export interface LogEntry {
  date: string;          // YYYY-MM-DD
  completedTasks: string[];
  attendedEvents: string[];
  reflections: string[];
  owlPromptsSeen: number;
  lastUpdated: string;   // ISO
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function readLog(): Record<string, LogEntry> {
  if (!fs.existsSync(LOG_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeLog(data: Record<string, LogEntry>): void {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getOrCreateToday(data: Record<string, LogEntry>): LogEntry {
  const key = todayKey();
  if (!data[key]) {
    data[key] = {
      date: key,
      completedTasks:  [],
      attendedEvents:  [],
      reflections:     [],
      owlPromptsSeen:  0,
      lastUpdated:     new Date().toISOString(),
    };
  }
  return data[key];
}

export function logCompletedTask(title: string): void {
  const data  = readLog();
  const today = getOrCreateToday(data);
  if (!today.completedTasks.includes(title)) {
    today.completedTasks.push(title);
    today.lastUpdated = new Date().toISOString();
    writeLog(data);
  }
}

export function logAttendedEvent(title: string): void {
  const data  = readLog();
  const today = getOrCreateToday(data);
  if (!today.attendedEvents.includes(title)) {
    today.attendedEvents.push(title);
    today.lastUpdated = new Date().toISOString();
    writeLog(data);
  }
}

export function logReflection(text: string): void {
  const data  = readLog();
  const today = getOrCreateToday(data);
  today.reflections.push(text);
  today.lastUpdated = new Date().toISOString();
  writeLog(data);
}

export function logOwlPrompt(): void {
  const data  = readLog();
  const today = getOrCreateToday(data);
  today.owlPromptsSeen += 1;
  today.lastUpdated = new Date().toISOString();
  writeLog(data);
}

export function getTodayLog(): LogEntry {
  const data  = readLog();
  return getOrCreateToday(data);
}

export function getWeekSummary(): LogEntry[] {
  const data = readLog();
  const keys = Object.keys(data).sort().slice(-7);
  return keys.map(k => data[k]);
}

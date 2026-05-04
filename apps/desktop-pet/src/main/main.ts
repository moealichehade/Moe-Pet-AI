import { app, BrowserWindow, ipcMain, Notification, powerMonitor } from 'electron';
import * as path from 'path';
import { fetchSchedule, getNextEvent } from './scheduleService';
import {
  getTodayLog, getWeekSummary,
  logCompletedTask, logAttendedEvent,
  logReflection, logOwlPrompt,
} from './dailyLog';
import type { SchedulePayload } from '../shared/types';

let win: BrowserWindow | null = null;
let scheduleCache: SchedulePayload | null = null;
let notifyTimer: ReturnType<typeof setInterval> | null = null;

// ── Window ────────────────────────────────────────────────────────────────
function createWindow() {
  win = new BrowserWindow({
    width: 220,
    height: 500,
    x: 0,
    y: 580,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
  win.on('closed', () => { win = null; });
}

// ── Schedule IPC ──────────────────────────────────────────────────────────
ipcMain.handle('schedule:fetch', async () => {
  scheduleCache = await fetchSchedule();
  return scheduleCache;
});

// ── Daily Log IPC ─────────────────────────────────────────────────────────
ipcMain.handle('log:fetch', () => ({
  today: getTodayLog(),
  week:  getWeekSummary(),
}));

ipcMain.handle('log:complete-task', (_e, title: string) => {
  logCompletedTask(title);
  win?.webContents.send('log:updated', { today: getTodayLog(), week: getWeekSummary() });
});

ipcMain.handle('log:attend-event', (_e, title: string) => {
  logAttendedEvent(title);
  win?.webContents.send('log:updated', { today: getTodayLog(), week: getWeekSummary() });
});

ipcMain.handle('log:reflection', (_e, text: string) => {
  logReflection(text);
  win?.webContents.send('log:updated', { today: getTodayLog(), week: getWeekSummary() });
});

ipcMain.handle('log:owl-prompt', () => {
  logOwlPrompt();
});

// ── Pre-event notifications ───────────────────────────────────────────────
function startNotificationLoop() {
  if (notifyTimer) clearInterval(notifyTimer);

  notifyTimer = setInterval(async () => {
    const payload = await fetchSchedule();
    scheduleCache = payload;

    const next = getNextEvent(payload);
    if (next && next.minutesUntil <= 10 && next.minutesUntil > 8) {
      new Notification({
        title: '🐺 Wolf — Heads up',
        body:  `"${next.title}" in ${next.minutesUntil} minutes.`,
      }).show();
      win?.webContents.send('notify:pre-event', next);
    }

    win?.webContents.send('schedule:data', payload);
  }, 5 * 60 * 1000);
}

// ── Hourly Owl pause ──────────────────────────────────────────────────────
function startHourlyPause() {
  const ONE_HOUR = 60 * 60 * 1000;
  setInterval(() => {
    win?.webContents.send('notify:hourly-pause');
  }, ONE_HOUR);
}

// ── Idle detection ────────────────────────────────────────────────────────
function startIdleDetection() {
  setInterval(() => {
    const secs = powerMonitor.getSystemIdleTime();
    if (secs >= 900) {
      win?.webContents.send('notify:idle', secs);
    }
  }, 60 * 1000);
}

// ── App lifecycle ─────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  startNotificationLoop();
  startIdleDetection();
  startHourlyPause();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (notifyTimer) clearInterval(notifyTimer);
  if (process.platform !== 'darwin') app.quit();
});

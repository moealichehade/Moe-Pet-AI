// Shared types between Electron main process and React renderer

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  calendar: string;
  minutesUntil: number;
}

export interface Reminder {
  id: string;
  title: string;
  dueDate: string | null;
  completed: boolean;
  list: string;
}

export interface SchedulePayload {
  events: CalendarEvent[];
  reminders: Reminder[];
  fetchedAt: string;
  permissionStatus: 'granted' | 'denied' | 'mock';
}

export interface LogEntry {
  date: string;
  completedTasks: string[];
  attendedEvents: string[];
  reflections: string[];
  owlPromptsSeen: number;
  lastUpdated: string;
}

export interface DailyLogPayload {
  today: LogEntry;
  week: LogEntry[];
}

export type IpcChannel =
  | 'schedule:fetch'
  | 'schedule:data'
  | 'schedule:permission-status'
  | 'notify:pre-event'
  | 'notify:idle'
  | 'log:fetch'
  | 'log:complete-task'
  | 'log:attend-event'
  | 'log:reflection'
  | 'log:owl-prompt'
  | 'log:updated';

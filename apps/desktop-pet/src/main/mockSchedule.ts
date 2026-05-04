import type { SchedulePayload } from '../shared/types';

function todayAt(h: number, m: number): string {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function minutesUntil(iso: string): number {
  return Math.round((new Date(iso).getTime() - Date.now()) / 60000);
}

export function getMockSchedule(): SchedulePayload {
  const events = [
    {
      id: 'e1',
      title: 'Morning Check-in — Grade 8',
      startTime: todayAt(8, 30),
      endTime: todayAt(9, 0),
      calendar: 'AMS Counseling',
      minutesUntil: minutesUntil(todayAt(8, 30)),
    },
    {
      id: 'e2',
      title: 'SEL Session — HS Advisory',
      startTime: todayAt(10, 15),
      endTime: todayAt(11, 0),
      calendar: 'AMS Counseling',
      minutesUntil: minutesUntil(todayAt(10, 15)),
    },
    {
      id: 'e3',
      title: 'Supervision Meeting',
      startTime: todayAt(13, 0),
      endTime: todayAt(13, 45),
      calendar: 'AMS Counseling',
      minutesUntil: minutesUntil(todayAt(13, 0)),
    },
    {
      id: 'e4',
      title: 'Parent Consultation',
      startTime: todayAt(15, 30),
      endTime: todayAt(16, 0),
      calendar: 'AMS Counseling',
      minutesUntil: minutesUntil(todayAt(15, 30)),
    },
  ];

  const reminders = [
    { id: 'r1', title: 'Complete session notes — Grade 8', dueDate: null, completed: false, list: 'AMS Tasks' },
    { id: 'r2', title: 'Update ISCA progress log', dueDate: null, completed: false, list: 'AMS Tasks' },
    { id: 'r3', title: 'Prepare mindfulness cards for HS session', dueDate: null, completed: false, list: 'AMS Tasks' },
    { id: 'r4', title: 'Review student referral form', dueDate: null, completed: false, list: 'AMS Tasks' },
  ];

  return {
    events,
    reminders,
    fetchedAt: new Date().toISOString(),
    permissionStatus: 'mock',
  };
}

import type { FC } from 'react';
import type { CalendarEvent, Reminder } from '../../../shared/types';

interface WolfScheduleProps {
  nextEvent: CalendarEvent | null;
  topReminders: Reminder[];
  permissionStatus: string;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function urgencyLabel(mins: number): string {
  if (mins <= 0)  return '🔴 Now';
  if (mins <= 10) return `🟠 ${mins}m`;
  if (mins <= 30) return `🟡 ${mins}m`;
  return `🟢 ${formatTime(new Date(Date.now() + mins * 60000).toISOString())}`;
}

const WolfSchedule: FC<WolfScheduleProps> = ({ nextEvent, topReminders, permissionStatus }) => {
  if (permissionStatus === 'loading') {
    return <div className="wolf-panel wolf-loading">Fetching schedule…</div>;
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="wolf-panel wolf-denied">
        <span>⚠️ Calendar access denied.</span>
        <small>Open System Settings → Privacy → Calendar to allow.</small>
      </div>
    );
  }

  return (
    <div className="wolf-panel">
      {/* Next event */}
      <div className="wolf-section">
        <span className="wolf-label">NEXT</span>
        {nextEvent ? (
          <div className="wolf-event">
            <span className="wolf-urgency">{urgencyLabel(nextEvent.minutesUntil)}</span>
            <span className="wolf-title">{nextEvent.title}</span>
          </div>
        ) : (
          <span className="wolf-empty">No upcoming events today.</span>
        )}
      </div>

      {/* Top reminders */}
      <div className="wolf-section">
        <span className="wolf-label">TASKS</span>
        {topReminders.length > 0 ? (
          <ul className="wolf-tasks">
            {topReminders.map(r => (
              <li key={r.id}>▸ {r.title}</li>
            ))}
          </ul>
        ) : (
          <span className="wolf-empty">All clear.</span>
        )}
      </div>

      {permissionStatus === 'mock' && (
        <div className="wolf-mock-badge">MOCK DATA</div>
      )}
    </div>
  );
};

export default WolfSchedule;

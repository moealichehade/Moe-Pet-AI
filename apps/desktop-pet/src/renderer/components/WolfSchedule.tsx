import type { FC } from 'react';
import type { CalendarEvent } from '../../../shared/types';

interface WolfScheduleProps {
  nextEvent:        CalendarEvent | null;
  allEvents:        CalendarEvent[];
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

const WolfSchedule: FC<WolfScheduleProps> = ({
  nextEvent, allEvents, permissionStatus
}) => {
  if (permissionStatus === 'loading') {
    return <div className="wolf-panel wolf-loading">Syncing calendar…</div>;
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="wolf-panel wolf-denied">
        <span>⚠️ Calendar access denied</span>
        <small>System Settings → Privacy → Calendar</small>
      </div>
    );
  }

  const upcomingEvents = allEvents
    .filter(e => e.minutesUntil > -60)
    .sort((a, b) => a.minutesUntil - b.minutesUntil)
    .slice(0, 5);

  return (
    <div className="wolf-panel">
      <div className="wolf-section">
        <span className="wolf-label">📅 TODAY'S CALENDAR</span>

        {upcomingEvents.length > 0 ? (
          <ul className="wolf-tasks">
            {upcomingEvents.map(e => (
              <li key={e.id} className="wolf-task-item">
                <div className="wolf-event-row">
                  <span className="wolf-urgency">{urgencyLabel(e.minutesUntil)}</span>
                  <span className="wolf-task-title">{e.title}</span>
                </div>
                <div className="wolf-event-meta">
                  <span className="wolf-list-badge">{formatTime(e.startTime)} → {formatTime(e.endTime)}</span>
                  {e.calendar && <span className="wolf-cal-badge">{e.calendar}</span>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="wolf-no-events">
            <span className="wolf-empty">No events today.</span>
            <small className="wolf-hint">Add events in Apple Calendar — Wolf will show them here.</small>
          </div>
        )}
      </div>

      {permissionStatus === 'mock' && (
        <div className="wolf-mock-badge">MOCK DATA</div>
      )}
    </div>
  );
};

export default WolfSchedule;

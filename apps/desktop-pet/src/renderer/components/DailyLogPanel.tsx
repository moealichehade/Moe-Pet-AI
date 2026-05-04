import { useState, type FC } from 'react';
import type { LogEntry } from '../../../shared/types';

interface DailyLogPanelProps {
  today: LogEntry;
  onReflection: (text: string) => void;
}

const DailyLogPanel: FC<DailyLogPanelProps> = ({ today, onReflection }) => {
  const [input, setInput]   = useState('');
  const [open,  setOpen]    = useState(false);

  const submit = () => {
    if (!input.trim()) return;
    onReflection(input.trim());
    setInput('');
  };

  return (
    <div className="owl-log-panel">
      <button className="owl-log-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '▲ Owl Log' : '▼ Owl Log'}
      </button>

      {open && (
        <div className="owl-log-body">
          {/* Stats row */}
          <div className="owl-log-stats">
            <span>✅ {today.completedTasks.length} tasks</span>
            <span>📅 {today.attendedEvents.length} events</span>
            <span>🦉 {today.owlPromptsSeen} prompts</span>
          </div>

          {/* Reflections */}
          {today.reflections.length > 0 && (
            <div className="owl-log-reflections">
              {today.reflections.slice(-3).map((r, i) => (
                <p key={i} className="owl-log-reflection-item">"{r}"</p>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="owl-log-input-row">
            <input
              className="owl-log-input"
              placeholder="Add a reflection…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
            />
            <button className="owl-log-submit" onClick={submit}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyLogPanel;

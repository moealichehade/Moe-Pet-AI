import { useState, useEffect, useCallback, useRef } from 'react';
import Wolf from './components/Wolf';
import Owl from './components/Owl';
import Cat from './components/Cat';
import Dog from './components/Dog';
import Panda from './components/Panda';
import characters from './data/characters.json';
import './styles/app.css';

type CharKey = 'wolf' | 'owl' | 'cat' | 'dog' | 'panda';
type Mood = 'happy' | 'sleepy' | 'curious';
const KEYS: CharKey[] = ['wolf', 'owl', 'cat', 'dog', 'panda'];
const MOODS: Mood[] = ['happy', 'sleepy', 'curious'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const PetSVG = ({ id, mood }: { id: CharKey; mood: Mood }) => {
  const props = { mood };
  if (id === 'wolf')  return <Wolf  {...props} />;
  if (id === 'owl')   return <Owl   {...props} />;
  if (id === 'cat')   return <Cat   {...props} />;
  if (id === 'dog')   return <Dog   {...props} />;
  if (id === 'panda') return <Panda {...props} />;
  return null;
};

interface PauseRecord {
  char: CharKey;
  message: string;
  time: string;
  taken: boolean;
}

const ONE_HOUR = 60 * 60 * 1000;

export default function App() {
  const [active,    setActive]    = useState<CharKey>('owl');
  const [moods,     setMoods]     = useState<Record<CharKey, Mood>>({
    wolf: 'happy', owl: 'happy', cat: 'happy', dog: 'happy', panda: 'happy'
  });
  const [pause,     setPause]     = useState<{ msg: string; char: CharKey } | null>(null);
  const [history,   setHistory]   = useState<PauseRecord[]>([]);
  const [tab,       setTab]       = useState<'pets' | 'history'>('pets');
  const [nextPause, setNextPause] = useState<number>(ONE_HOUR);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerPause = useCallback((charKey?: CharKey) => {
    const char = charKey ?? randomFrom(KEYS);
    const char_data = characters[char];
    const msg  = randomFrom(char_data.pauses);
    setPause({ msg, char });
    setMoods(m => ({ ...m, [char]: randomFrom(MOODS) }));
    setNextPause(ONE_HOUR);
    return { char, msg };
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      triggerPause();
    }, ONE_HOUR);

    countRef.current = setInterval(() => {
      setNextPause(p => Math.max(0, p - 1000));
    }, 1000);

    return () => {
      if (timerRef.current)  clearInterval(timerRef.current);
      if (countRef.current) clearInterval(countRef.current);
    };
  }, [triggerPause]);

  const dismissPause = (taken: boolean) => {
    if (!pause) return;
    const record: PauseRecord = {
      char: pause.char,
      message: pause.msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      taken,
    };
    setHistory(h => [record, ...h].slice(0, 20));
    setPause(null);
  };

  const handlePetClick = (key: CharKey) => {
    setActive(key);
    setMoods(m => ({ ...m, [key]: randomFrom(MOODS) }));
  };

  const fmtNext = () => {
    const m = Math.floor(nextPause / 60000);
    const s = Math.floor((nextPause % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const c = characters[active];

  return (
    <div className="app">

      {/* Header */}
      <header className="app-header">
        <div className="header-title">Moe Pet AI</div>
        <div className="header-sub">pause tracker</div>
        <div className="next-pause-badge">
          next pause in <strong>{fmtNext()}</strong>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${tab === 'pets' ? 'tab-active' : ''}`} onClick={() => setTab('pets')}>companions</button>
        <button className={`tab ${tab === 'history' ? 'tab-active' : ''}`} onClick={() => setTab('history')}>history {history.length > 0 && <span className="tab-badge">{history.length}</span>}</button>
      </div>

      {tab === 'pets' && (
        <>
          {/* Active pet spotlight */}
          <div className="spotlight" style={{ borderColor: c.border, background: c.bg }}>
            <div className="spotlight-pet">
              <PetSVG id={active} mood={moods[active]} />
            </div>
            <div className="spotlight-info">
              <div className="spotlight-name" style={{ color: c.color }}>{c.name}</div>
              <div className="spotlight-trait">{c.trait}</div>
              <button className="pause-now-btn" style={{ background: c.color }} onClick={() => triggerPause(active)}>
                pause now
              </button>
            </div>
          </div>

          {/* Character selector */}
          <div className="char-grid">
            {KEYS.map(key => {
              const ch = characters[key];
              return (
                <button key={key} className={`char-btn ${active === key ? 'char-active' : ''}`}
                  style={active === key ? { borderColor: ch.color, background: ch.bg } : {}}
                  onClick={() => handlePetClick(key)}>
                  <div className="char-mini"><PetSVG id={key} mood={moods[key]} /></div>
                  <div className="char-btn-name" style={active === key ? { color: ch.color } : {}}>{ch.name}</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {tab === 'history' && (
        <div className="history-list">
          {history.length === 0 && (
            <div className="history-empty">
              <span className="empty-icon">🦉</span>
              <p>No pauses yet. Your first one is coming.</p>
            </div>
          )}
          {history.map((r, i) => {
            const ch = characters[r.char];
            return (
              <div key={i} className="history-item" style={{ borderLeftColor: ch.color }}>
                <div className="history-header">
                  <span className="history-char" style={{ color: ch.color }}>{ch.name}</span>
                  <span className="history-time">{r.time}</span>
                  <span className={`history-status ${r.taken ? 'status-taken' : 'status-skipped'}`}>
                    {r.taken ? 'taken' : 'skipped'}
                  </span>
                </div>
                <p className="history-msg">"{r.message}"</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Pause overlay */}
      {pause && (
        <div className="pause-overlay">
          <div className="pause-card" style={{ borderColor: characters[pause.char].border }}>
            <div className="pause-pet">
              <PetSVG id={pause.char} mood="curious" />
            </div>
            <div className="pause-char-name" style={{ color: characters[pause.char].color }}>
              {characters[pause.char].name} says
            </div>
            <p className="pause-message">"{pause.msg}"</p>
            <div className="pause-actions">
              <button className="pause-btn-take" style={{ background: characters[pause.char].color }}
                onClick={() => dismissPause(true)}>
                I paused ✓
              </button>
              <button className="pause-btn-skip" onClick={() => dismissPause(false)}>
                skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

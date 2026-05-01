import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

const FOCUS = 25 * 60;
const BREAK = 5 * 60;

export default function Pomodoro() {
  const [mode, setMode] = useState('focus');
  const [seconds, setSeconds] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('focus_sessions') || 0));
  const [focusTime, setFocusTime] = useState(() => Number(localStorage.getItem('focus_time') || 0));

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      setSeconds((value) => {
        if (value > 1) return value - 1;
        if (mode === 'focus') {
          setSessions((count) => {
            localStorage.setItem('focus_sessions', count + 1);
            return count + 1;
          });
          setFocusTime((time) => {
            localStorage.setItem('focus_time', time + 25);
            return time + 25;
          });
          setMode('break');
          return BREAK;
        }
        setMode('focus');
        return FOCUS;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, mode]);

  const display = useMemo(() => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`, [seconds]);

  const reset = () => {
    setRunning(false);
    setMode('focus');
    setSeconds(FOCUS);
  };

  return (
    <section className="page">
      <PageHeader eyebrow="Pomodoro" title="Focus timer" />
      <div className="pomodoro-panel">
        <div className={`timer-ring ${mode}`}>
          <span>{mode === 'focus' ? 'Focus' : 'Break'}</span>
          <strong>{display}</strong>
        </div>
        <div className="timer-actions">
          <button className="primary-button" onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
          <button className="secondary-button" onClick={reset}>Reset</button>
        </div>
        <div className="metrics-grid compact">
          <div className="metric-card teal"><div className="metric-icon"><i className="bi bi-check2-circle" /></div><div><p>Focus Sessions</p><strong>{sessions}</strong></div></div>
          <div className="metric-card amber"><div className="metric-icon"><i className="bi bi-hourglass-split" /></div><div><p>Daily Focus Time</p><strong>{focusTime}m</strong></div></div>
        </div>
      </div>
    </section>
  );
}

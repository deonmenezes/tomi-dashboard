import { useEffect, useState } from 'react';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8787';

function StatCard({ title, value, tone = 'pink' }) {
  return (
    <div className={`card tone-${tone}`}>
      <p className="label">{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch(`${API}/api/robot/status`);
      const data = await res.json();
      setStatus(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, []);

  const send = async (command) => {
    await fetch(`${API}/api/robot/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    load();
  };

  if (loading || !status) return <div className="loading">Loading Tomi dashboard...</div>;

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="tag">UNITREE GO2 COMMAND CENTER</p>
          <h1>Tomi Dashboard</h1>
          <p className="subtitle">Neobrutalist live control panel for Tomi</p>
        </div>
        <div className={`pill ${status.connected ? 'on' : 'off'}`}>
          {status.connected ? 'CONNECTED' : 'OFFLINE'}
        </div>
      </header>

      <section className="grid">
        <StatCard title="Battery" value={`${Math.round(status.battery)}%`} tone="yellow" />
        <StatCard title="Mode" value={status.mode.toUpperCase()} tone="blue" />
        <StatCard title="Location" value={status.location} tone="green" />
        <StatCard title="Last Action" value={status.lastAction} tone="pink" />
      </section>

      <section className="controls">
        <h2>Quick Commands</h2>
        <div className="btnRow">
          <button onClick={() => send('patrol')}>Start Patrol</button>
          <button onClick={() => send('stream')}>Start Stream</button>
          <button onClick={() => send('idle')}>Set Idle</button>
          <button onClick={() => send('charge')}>Charge Mode</button>
          <button className="danger" onClick={() => send('stop')}>Emergency Stop</button>
        </div>
      </section>

      <footer>
        Updated: {new Date(status.updatedAt).toLocaleString()}
      </footer>
    </div>
  );
}

export default App;

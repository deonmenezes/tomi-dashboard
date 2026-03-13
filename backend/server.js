import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8787;

const state = {
  robotName: 'Tomi',
  battery: 92,
  mode: 'idle',
  location: 'Go2 Robot Environment',
  connected: true,
  lastAction: 'System boot complete',
  updatedAt: new Date().toISOString(),
};

setInterval(() => {
  if (state.mode !== 'charging') {
    state.battery = Math.max(10, state.battery - 0.1);
  } else {
    state.battery = Math.min(100, state.battery + 0.4);
  }
  state.updatedAt = new Date().toISOString();
}, 3000);

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'tomi-dashboard-backend' });
});

app.get('/api/robot/status', (_, res) => {
  res.json(state);
});

app.post('/api/robot/command', (req, res) => {
  const { command } = req.body || {};

  if (!command) {
    return res.status(400).json({ ok: false, error: 'command is required' });
  }

  const c = String(command).toLowerCase();

  if (c === 'patrol') state.mode = 'patrol';
  else if (c === 'stream') state.mode = 'streaming';
  else if (c === 'idle') state.mode = 'idle';
  else if (c === 'charge') state.mode = 'charging';
  else if (c === 'stop') state.mode = 'stopped';

  state.lastAction = `Command received: ${command}`;
  state.updatedAt = new Date().toISOString();

  return res.json({ ok: true, state });
});

app.listen(PORT, () => {
  console.log(`Tomi backend running on http://localhost:${PORT}`);
});

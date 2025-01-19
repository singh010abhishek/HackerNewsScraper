import { WebSocketServer } from 'ws';
import { getInitialData } from './scraper.js';

export function initializeWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws) => {
    console.log('New WebSocket connection');

    const initialData = await getInitialData();
    ws.send(JSON.stringify({ type: 'initial', data: initialData }));

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return wss;
}
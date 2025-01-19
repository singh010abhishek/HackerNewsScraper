import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { startScraping } from './scraper.js';
import { initializeWebSocket } from './websocket.js';
import { initializeDatabase } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();
    const wss = initializeWebSocket(app);
    startScraping(wss);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
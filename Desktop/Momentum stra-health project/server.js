// Simple Node.js WebSocket backend for development
// Run with: node server.js

const WebSocket = require('ws');
const PORT = 3001;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'welcome', message: 'WebSocket connection established.' }));

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Echo message back
    ws.send(message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

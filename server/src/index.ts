import express from 'express';
import { transactions } from './data.js';

const app = express();
const PORT = 3001;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
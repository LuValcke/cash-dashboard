import express from 'express';
import { transactions } from './data.js';

const app = express();
app.use(express.json());
const PORT = 3001;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/transactions', (req, res) => {
    const movement = req.body;
    const id = crypto.randomUUID();
    const newTransaction = {
        id,
        ...movement
    }
    transactions.unshift(newTransaction);
    res.status(201).json(newTransaction)
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
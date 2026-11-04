import express from 'express';
import { transactions } from './data.js';
import { validateTransactionInput } from './validateTransaction.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
const PORT = 3001;

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.get('/transactions', (req, res) => {
	res.json(transactions);
});

app.post('/transactions', (req, res) => {

	const error = validateTransactionInput(req.body);
	if (error) {
		return res.status(400).json({ error });
	}

	const { description, amount, date, type } = req.body;
	const id = crypto.randomUUID();
	const newTransaction = { id, description, amount, date, type };
	
	transactions.unshift(newTransaction);
	res.status(201).json(newTransaction)
});

app.delete('/transactions/:id', (req, res) => {
	const { id } = req.params;

	const transactionToDelete = transactions.findIndex(transaction => transaction.id === id);

	if (transactionToDelete === -1) {
		return res.status(404).json({ error: 'Transaction not found' });
	};

	transactions.splice(transactionToDelete, 1)

	res.status(204).end();
});

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
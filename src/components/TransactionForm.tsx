import { useState } from 'react';
import type { TransactionType, Transaction } from '../types/transactions';
import { validateTransaction } from '../utils/validateTransaction';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [type, setType] = useState<TransactionType>('expense');
	const [error, setError] = useState<string>('');

	

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

		const validationError = validateTransaction({description, amount, date});
		if(validationError) {
			setError(validationError)
			return
		}
		setError('')

		const newTransaction: Transaction = {
			id: crypto.randomUUID(),
			description: description.trim(),
			amount: Number(amount),
			date,
			type,
   	};
		onAddTransaction(newTransaction);
		setDescription('')
		setAmount('')
		setDate('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='descriptionText'> Descripción </label>
      <input id='descriptionText' value={description} onChange={(e)=> setDescription(e.target.value)}></input>
			<label htmlFor='amount'> Cantidad </label>
      <input id='amount' type='number' value={amount} onChange={(e)=> setAmount(e.target.value)}></input>
			<label htmlFor='date'> Fecha </label>
      <input id='date' type='date' value={date} onChange={(e)=> setDate(e.target.value)}></input>
			<label htmlFor='type'>Tipo</label>
			<select
				id='type'
				value={type}
				onChange={(e) => setType(e.target.value as TransactionType)}
			>
				<option value='income'>Ingreso</option>
				<option value='expense'>Gasto</option>
			</select>
			{error && 
				<p role='alert'>
					⚠️ {error}
				</p>
			}
			<button type='submit'>Añadir</button>
    </form>
  );
}
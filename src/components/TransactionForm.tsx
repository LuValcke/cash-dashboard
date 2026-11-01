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

		const validationError = validateTransaction({ description, amount, date });
		if (validationError) {
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
		<form onSubmit={handleSubmit} className='card transaction-form'>
			<div className='transaction-form__field'>
				<label htmlFor='descriptionText' className='transaction-form__label'> Descripción </label>
				<input id='descriptionText' value={description} onChange={(e) => setDescription(e.target.value)} className='transaction-form__input'></input>
			</div>
			<div className='transaction-form__field'>
				<label htmlFor='amount' className='transaction-form__label'> Cantidad </label>
				<input id='amount' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} className='transaction-form__input'></input>
			</div>
			<div className='transaction-form__field'>
				<label htmlFor='date' className='transaction-form__label'> Fecha </label>
				<input id='date' type='date' value={date} onChange={(e) => setDate(e.target.value)} className='transaction-form__input'></input>
			</div>
			<div className='transaction-form__field'>
				<label htmlFor='type' className='transaction-form__label'>Tipo</label>
				<select
					id='type'
					value={type}
					onChange={(e) => setType(e.target.value as TransactionType)}
					className='transaction-form__input'
				>
					<option value='income'>Ingreso</option>
					<option value='expense'>Gasto</option>
				</select>
			</div>
			<div className='transaction-form__actions'>
				<button type='submit' className='transaction-form__button'>Añadir</button>
				{error && <p role='alert' className='transaction-form__error'>⚠️ {error}</p>}
			</div>
		</form>
	);
}
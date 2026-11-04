import type { Transaction } from '../types/transactions';

export type NewTransaction = Omit<Transaction, 'id'>;

export async function createTransaction(input: NewTransaction): Promise<Transaction> {
	const bodyInit = JSON.stringify(input)
	const init = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: bodyInit,
	};

	const response = await fetch('/api/transactions', init)

	if (!response.ok) {
		throw new Error('Failed to create transaction');
	}

	return response.json();
}

export async function deleteTransaction(id: string): Promise<void> {
	const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
    })

	if(!response.ok) {
		throw new Error('Failed to delete transaction')
	}
}
import type { Transaction } from '../types/transactions';

export type TransactionAction =
	| { type: 'loaded'; payload: Transaction[] }
	| { type: 'added'; payload: Transaction }
	| { type: 'removed'; payload: string }

export function transactionsReducer(
	state: Transaction[],
	action: TransactionAction
): Transaction[] {
	switch (action.type) {
		case 'loaded':
			return action.payload
		case 'added':
			return [
				action.payload,
				...state
			]
		case 'removed':
			return state.filter((transaction) => transaction.id !== action.payload)
		default:
			return state;
	}
}
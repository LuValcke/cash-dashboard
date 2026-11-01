import type { Transaction } from '../types/transactions';

export interface MonthlyTotals {
	month: string; // 'YYYY-MM'
	income: number;
	expense: number;
}

export function groupByMonth(transactions: Transaction[]): MonthlyTotals[] {
	 const totals: Record<string, MonthlyTotals> = {};

	transactions.forEach((transaction) => {
		const month = transaction.date.slice(0,7);
		if (!totals[month]) {
     totals[month] = { month, income: 0, expense: 0 };
   	}
		if(transaction.type === 'income') {
			totals[month].income += transaction.amount
		}
		if(transaction.type === 'expense') {
			totals[month].expense += transaction.amount
		}
	});
	return Object.values(totals).sort((a, b) => a.month.localeCompare(b.month));
}
export type TransactionType = 'income' | 'expense';

export type Transaction = {
    id: string;
    amount: number;
    date: string;
    description: string; // ISO 8601: 'YYYY-MM-DD'.
    type: TransactionType;
};
import { useState, useEffect } from 'react';
import type { Transaction } from '../types/transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const loadTransactions = async () => {
    try {
        const response = await fetch('/api/transactions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
            }
        const data: Transaction[] = await response.json();
        setTransactions(data);
    } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
        setIsLoading(false);
    }
  };

  loadTransactions();
}, []);

  return { transactions, isLoading, error };
}
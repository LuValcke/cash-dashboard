import { useState, useEffect, useReducer } from 'react';
import type { Transaction } from '../types/transactions';
import { transactionsReducer } from '../state/transactionsReducer';

export function useTransactions() {
  const [transactions, dispatch] = useReducer(transactionsReducer, []);
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
        dispatch({
          type: 'loaded',
          payload: data,
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const addTransaction = (transaction: Transaction) => {
    dispatch({
      type: 'added',
      payload: transaction,
    })
  }

  const removeTransaction = (id: string) => {
    dispatch({
      type: 'removed',
      payload: id,
    })
  }

  return { transactions, isLoading, error, addTransaction, removeTransaction };
}
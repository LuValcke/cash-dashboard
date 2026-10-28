import type { TransactionType } from '../types/transactions';

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  income: 'Ingreso',
  expense: 'Gasto',
};

export function formatTransactionType(type: TransactionType): string {
  return TRANSACTION_TYPE_LABELS[type];
}

const currencyFormatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}
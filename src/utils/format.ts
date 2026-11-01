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

export function formatMonth(month: string): string {
  const [year, monthNumber] = month.split('-');
  const date = new Date(Number(year), Number(monthNumber) - 1, 1);
  return new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' }).format(date)
}

const compactCurrencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatCurrencyCompact(amount: number): string {
  return compactCurrencyFormatter.format(amount);
}
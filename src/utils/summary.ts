import type { Transaction } from '../types/transactions';

export function calculateSummary(transactions: Transaction[]) {
  // 1. totalIncome: suma de los importes de tipo 'income'
    const incomes =  transactions.filter((transaction) => transaction.type === 'income')
    const totalIncome = incomes.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0)
  // 2. totalExpense: suma de los importes de tipo 'expense'
    const expenses =  transactions.filter((transaction) => transaction.type === 'expense')
    const totalExpense = expenses.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0)
  // 3. balance: ingresos menos gastos
    const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
}
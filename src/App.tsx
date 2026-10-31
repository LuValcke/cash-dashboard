import { useState, useMemo } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { formatTransactionType, formatCurrency } from './utils/format';
import { calculateSummary } from './utils/summary'
import { TransactionForm } from './components/TransactionForm';
import type { TransactionFilter } from './types/transactions';
import { TransactionFilters } from './components/TransactionFilters';

function App() {
  const { transactions, isLoading, error, addTransaction, removeTransaction } = useTransactions();

  const [filter, setFilter] = useState<TransactionFilter>('all');

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((transaction) => transaction.type === filter);
  }, [transactions, filter]);

  if (isLoading) return <p>Cargando…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  const { totalIncome, totalExpense, balance } = calculateSummary(transactions);

  return (
    <div className='app'>
      <header>
        <h1>Previsión de caja</h1>
      </header>
      <main>
        <section aria-labelledby="summary-title">
          <h2 id="summary-title">Resumen</h2>
          <div className='summary'>
            <article className='card'>
              <h3 className='card__title'>Ingresos</h3>
              <p className='card__value'> {formatCurrency(totalIncome)} </p>
            </article>
            <article className='card'>
              <h3 className='card__title'>Gastos</h3>
              <p className='card__value'> {formatCurrency(totalExpense)} </p>
            </article>
            <article className='card'>
              <h3 className='card__title'>Saldo</h3>
              <p className='card__value'> {formatCurrency(balance)} </p>
            </article>
          </div>
        </section>
        <section aria-labelledby='transaction-form'>
          <h2 id='transaction-form'>Nuevo movimiento</h2>
          <TransactionForm onAddTransaction={addTransaction} />
        </section>
        <section aria-labelledby="transactions-title">
          <h2 id='transactions-title'>Movimientos</h2>
          <TransactionFilters value={filter} onChange={setFilter} />
          {filteredTransactions.length === 0 ? (
            <p className='transaction__empty'>No hay movimientos.</p>
          ) : (<ul className='transaction__list'>
            {filteredTransactions.map((transaction) => (
              <li className='transaction' key={transaction.id}>
                <div className='transaction__info'>
                  <p className='transaction__description'>{transaction.description}</p>
                  <p className='transaction__type'>{formatTransactionType(transaction.type)}</p>
                </div>
                <div className='transaction__actions'>
                  <p className={`transaction__amount transaction__amount--${transaction.type}`}>{formatCurrency(transaction.amount)}</p>
                  <button onClick={() => removeTransaction(transaction.id)} aria-label={`Borrar ${transaction.description}`} className='transaction__delete'>Borrar</button>
                </div>
              </li>
            ))}
          </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
import { useTransactions } from './hooks/useTransactions';
import { formatTransactionType, formatCurrency } from './utils/format';
import { calculateSummary } from './utils/summary' 

function App() {
  const { transactions, isLoading, error } = useTransactions();

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
        <section aria-labelledby="transactions-title">
          <h2 id='transactions-title'>Movimientos</h2>
          <ul className='transaction__list'>
            {transactions.map((transaction) => (
              <li className='transaction' key={transaction.id}>
                <div className='transaction__info'>
                  <p className='transaction__description'>{transaction.description}</p>
                  <p className='transaction__type'>{formatTransactionType(transaction.type)}</p>
                </div>
                <p className={`transaction__amount transaction__amount--${transaction.type}`}>{formatCurrency(transaction.amount)}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
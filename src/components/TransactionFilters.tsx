import type { TransactionFilter } from '../types/transactions';

interface TransactionFiltersProps {
  value: TransactionFilter;
  onChange: (filter: TransactionFilter) => void;
}

const options: { value: TransactionFilter; label: string }[] = [
	{ value: 'all', label: 'Todos' },
	{ value: 'income', label: 'Ingresos' },
	{ value: 'expense', label: 'Gastos' }
]

export function TransactionFilters({ value, onChange }: TransactionFiltersProps) {
  return (
    <fieldset>
      <legend>Mostrar</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="transaction-filter"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
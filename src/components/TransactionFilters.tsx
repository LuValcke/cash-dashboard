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
    <fieldset className='transaction-filters'>
      <legend className='transaction-filters__legend'>Mostrar</legend>
			<div className='transaction-filters__options'>
				{options.map((option) => (
					<label key={option.value} className='transaction-filters__option'>
						<input
							type="radio"
							name="transaction-filter"
							value={option.value}
							checked={value === option.value}
							onChange={() => onChange(option.value)}
							className='transaction-filters__input visually-hidden'
						/>
						{option.label}
					</label>
				))}
			</div>
    </fieldset>
  );
}
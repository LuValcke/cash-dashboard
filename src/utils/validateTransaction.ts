interface TransactionFormValues {
  description: string;
  amount: string;
  date: string;
}

export function validateTransaction(values: TransactionFormValues): string | null {
	const numericAmount = Number(values.amount)

  if (!values.description.trim()) return 'Escribe una descripción.';
  if (!(numericAmount > 0)) return 'Escribe una cantidad.';
  if (!values.date.trim()) return 'Escribe una fecha.';
  
  return null;
}
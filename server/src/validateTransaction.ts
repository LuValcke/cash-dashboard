export function validateTransactionInput(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) {
    return 'Request body must be an object';
  }

  const { description, amount, date, type } = body as Record<string, unknown>;

  if (typeof description !== 'string') {
    return 'Description type not supported'
  }
  if (!description.trim()) {
    return 'Description is required and must be a non-empty string'
  }
  if (typeof amount !== 'number') {
    return 'Amount type not supported'
  }
  if (amount <= 0) {
    return 'amount must be a number greater than 0'
  }
  if (typeof date !== 'string') {
    return 'Date type not supported'
  } 
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(date))){
    return 'date must use the format YYYY-MM-DD'
  }
  if (type !== 'income' && type !== 'expense') {
    return 'Type must be `income` or `expense`';
  }

  return null;
}
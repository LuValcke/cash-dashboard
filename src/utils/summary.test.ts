import { calculateSummary } from './summary';
import type { Transaction } from '../types/transactions';
import { describe, expect, it } from 'vitest';

describe('calculateSummary', () => {
	it('calcula ingresos, gastos y saldo', () => {
		const movements: Transaction[] = [
			{ id: "t1", amount: 3200, date: "2026-07-01", description: "Pago cliente Acme", type: "income" },
			{ id: "t2", amount: 1200, date: "2026-07-05", description: "Alquiler oficina", type: "expense" },
			{ id: "t3", amount: 450, date: "2026-07-18", description: "Licencias software", type: "expense" },
		]
		
		const totals = calculateSummary(movements)

		expect(totals).toEqual({ totalIncome: 3200, totalExpense: 1650, balance: 1550 })
	});
	it('devuelve ceros cuando no hay movimientos', () => {
		const movements: Transaction[] = [
		]
		
		const totals = calculateSummary(movements)

		expect(totals).toEqual({ totalIncome: 0, totalExpense: 0, balance: 0 })
	});
});
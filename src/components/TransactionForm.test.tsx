import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TransactionForm } from './TransactionForm';

describe('TransactionForm', () => {
	it('muestra un error si se envía vacío', async () => {
		const user = userEvent.setup();
		const handleAdd = vi.fn();
		render(<TransactionForm onAddTransaction={handleAdd} />);

		const button = screen.getByRole('button', { name: 'Añadir' });

		await user.click(button);

		const alert = screen.getByRole('alert');

		expect(alert).toBeInTheDocument();
		expect(alert).toHaveTextContent('Escribe una descripción');
		expect(handleAdd).not.toHaveBeenCalled();
	});

	it('envía el movimiento cuando los datos son válidos', async () => {
		const user = userEvent.setup();
		const handleAdd = vi.fn();
		render(<TransactionForm onAddTransaction={handleAdd} />);

		await user.type(screen.getByLabelText('Descripción'), 'Alquiler');
		await user.type(screen.getByLabelText('Fecha'), '2026-10-10');
		await user.type(screen.getByLabelText('Cantidad'), '2000');
		const select = screen.getByLabelText('Tipo');
		await user.selectOptions(select, 'expense');
		
		const button = screen.getByRole('button', { name: 'Añadir' })
		await user.click(button)

		expect(handleAdd).toHaveBeenCalledWith(
			expect.objectContaining({
				amount: 2000,
				date: '2026-10-10',
				description: 'Alquiler',
				type: 'expense'
			})
		);
		expect(screen.getByLabelText('Descripción')).toHaveValue('');
	});
});
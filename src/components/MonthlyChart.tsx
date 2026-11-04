import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import type { MonthlyTotals } from '../utils/groupByMonth';
import { CHART_COLORS } from '../constants/colors'
import { formatMonth, formatCurrencyCompact, formatCurrency } from '../utils/format';

interface MonthlyChartProps {
	data: MonthlyTotals[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
	return (
		<>
			<div aria-hidden='true' className='card'>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data} barGap={4} accessibilityLayer={false}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey='month' tickFormatter={formatMonth} />
						<YAxis tickFormatter={formatCurrencyCompact} />
						<Tooltip
							formatter={(value) => formatCurrency(Number(value))}
							labelFormatter={(label) => (typeof label === 'string' ? formatMonth(label) : label)}
						/>
						<Legend />
						<Bar dataKey='income' name="Ingresos" fill={CHART_COLORS.income} radius={[6, 6, 0, 0]} maxBarSize={40} />
						<Bar dataKey='expense' name="Gastos" fill={CHART_COLORS.expense} radius={[6, 6, 0, 0]} maxBarSize={40} />
					</BarChart>
				</ResponsiveContainer>
			</div>
			<table className="visually-hidden">
				<caption>Ingresos y gastos por mes</caption>
				<thead>
					<tr>
						<th scope="col">Mes</th>
						<th scope="col">Ingresos</th>
						<th scope="col">Gastos</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d) => (
						<tr key={d.month}>
							<th scope="row">{formatMonth(d.month)}</th>
							<td>{formatCurrency(d.income)}</td>
							<td>{formatCurrency(d.expense)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
# Cash Dashboard

A small cash-flow forecast dashboard built with React, TypeScript and Vite. It shows income, expenses and balance, a monthly chart, and lets you add, delete and filter transactions.

I built it to practise frontend fundamentals step by step: state management, typing, accessibility, data visualisation and testing.

![Cash Dashboard screenshot](docs/screenshot.png)

## Features

- Summary cards with total income, expenses and balance
- Monthly bar chart of income and expenses, with an accessible data table as an alternative
- Transaction list loaded from a REST endpoint, with loading and error states
- Form to add transactions, with validation
- Delete transactions
- Filter by type (all, income, expenses)
- Currency and month formatting with `Intl` (es-ES, EUR)

## Tech stack

React · TypeScript · Vite · Recharts · Vitest · React Testing Library · CSS (custom properties, Grid, Flexbox, BEM)

## Technical decisions

- **Custom hook (`useTransactions`)** handles data fetching, loading and error states, and exposes `addTransaction` and `removeTransaction`. Components never see `dispatch`.
- **`useReducer` with a discriminated union** for actions (`loaded`, `added`, `removed`), so each action has a typed payload.
- **Derived state:** totals and monthly data are calculated from the transactions on every render instead of being stored, so the list, the summary and the chart can't get out of sync.
- **Pure functions** in `utils/` for formatting, summary calculation, monthly grouping and form validation, which keeps components simple and easy to test.
- **Controlled form** that converts and validates values on submit.
- **`useMemo`** for the filtered list. With this amount of data it isn't needed for performance; I used it to practise.
- **Accessibility:** semantic HTML, labelled sections, a `fieldset` for the filter, native radios hidden only visually so keyboard navigation still works, visible focus, descriptive `aria-label` on delete buttons, `role="alert"` on errors, AA colour contrast, and a visually hidden data table for the chart.
- **Design tokens** as CSS custom properties, and a reusable `card` class composed with component classes.

## Testing

Tests use Vitest and React Testing Library. They cover the summary calculation (including an empty list) and the form, from the user's point of view: an empty submit shows an error, and valid data is sent to the parent.

Elements are found by role and label, the same way assistive technologies find them.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To run the tests:

```bash
npm test
```

## Project structure

```
src/
  components/   UI components (form, filters, chart)
  constants/    chart colours
  hooks/        useTransactions
  state/        transactions reducer
  types/        shared types
  utils/        formatting, summary, monthly grouping and validation
public/api/     mock REST data (transactions.json)
```

## Known limitations

- The API is mocked with a static JSON file, so new or deleted transactions are lost on reload.
- In testing with VoiceOver on Safari, the chart axes were still announced even though the chart is hidden from assistive technologies with `aria-hidden`. I'm still looking into a more robust approach.

## Next steps

- Persist data (localStorage or a real API)
- Improve the chart's screen reader experience
- More tests: filters, delete and monthly grouping
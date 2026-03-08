# Income Plan — Salary Splitter

A simple budgeting tool that helps you split your monthly income into categories and visualize where your money goes. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Salary Input** — Enter your monthly income in euros with real-time validation
- **Category Management** — Add, remove, and reorder spending categories with drag-and-drop. Each category has a color, percentage, euro amount, and optional notes
- **Fixed vs. Percentage Amounts** — Lock categories to a fixed euro amount or keep them percentage-based so they scale with your salary
- **Interactive Donut Chart** — Visualize your budget split with hover details showing category names and percentages
- **Smart Budget Alerts** — Get warnings when your allocations exceed recommended thresholds (e.g., housing > 30%, savings < 20%)
- **Financial Guidelines** — Built-in reference cards for the **50/30/20 Rule** and **6 Accounts Rule** (T. Harv Eker)
- **Bilingual** — Full English and Lithuanian language support with one-click switching
- **Dark Mode** — Automatically adapts to your system preference
- **Persistent Data** — Your salary, categories, and language preference are saved in localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

### Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/) for internationalization
- [react-hook-form](https://react-hook-form.com/) for form validation
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) for tests

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Theme variables and dark mode
│   ├── layout.tsx               # Root layout with language provider
│   └── page.tsx                 # Main page
├── components/
│   ├── salary-input.tsx         # Salary euro input
│   ├── category-manager.tsx     # Category editor with drag-and-drop
│   ├── split-visualization.tsx  # Interactive donut chart
│   ├── budget-alerts.tsx        # Guideline-based alerts
│   ├── financial-guidelines.tsx # Budgeting reference cards
│   ├── language-provider.tsx    # i18n context provider
│   └── __tests__/               # Component tests
├── data/
│   └── categories.ts            # Default categories and colors
└── locales/
    ├── en.json                  # English translations
    └── lt.json                  # Lithuanian translations
```
# salary_split

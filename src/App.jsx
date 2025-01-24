import { ThemeProvider } from './contexts/ThemeContext';
import { TransactionProvider } from './contexts/TransactionContext';
import { ThemeToggle } from './components/ThemeToggle';
import { FinancialSummary } from './components/FinancialSummary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { useTransactions } from './contexts/TransactionContext';

function ExpenseTracker() {
  const { addTransaction, getSummary, getRecentTransactions } = useTransactions();
  const summary = getSummary();
  const recentTransactions = getRecentTransactions();

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-dark-background transition-colors duration-200">
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-10">
        <div className="glassmorphic px-4 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-primary dark:text-dark-accent">
              Expense Tracker
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Financial Summary Section */}
        <FinancialSummary
          balance={summary.balance}
          income={summary.income}
          expenses={summary.expenses}
          transactions={recentTransactions}
        />

        {/* Transaction Management Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={addTransaction} />
          </div>

          {/* Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList transactions={recentTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <ExpenseTracker />
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
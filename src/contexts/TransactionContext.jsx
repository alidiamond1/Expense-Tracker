import { createContext, useContext, useEffect, useState } from 'react';

const TransactionContext = createContext();

const STORAGE_KEY = 'expense_tracker_transactions';

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [
      {
        id: Date.now(),
        ...transaction,
      },
      ...prev,
    ]);
  };

  const removeTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getSummary = () => {
    return transactions.reduce((summary, transaction) => {
      const amount = transaction.amount;
      return {
        balance: summary.balance + amount,
        income: amount > 0 ? summary.income + amount : summary.income,
        expenses: amount < 0 ? summary.expenses + Math.abs(amount) : summary.expenses,
      };
    }, {
      balance: 0,
      income: 0,
      expenses: 0,
    });
  };

  const getRecentTransactions = (limit = 10) => {
    return transactions.slice(0, limit);
  };

  const value = {
    transactions,
    addTransaction,
    removeTransaction,
    getSummary,
    getRecentTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
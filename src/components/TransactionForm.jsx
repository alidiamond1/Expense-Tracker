import { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: 'emerald' },
  { id: 'transport', label: 'Transportation', color: 'blue' },
  { id: 'shopping', label: 'Shopping', color: 'purple' },
  { id: 'bills', label: 'Bills & Utilities', color: 'red' },
  { id: 'entertainment', label: 'Entertainment', color: 'yellow' },
  { id: 'health', label: 'Healthcare', color: 'pink' },
  { id: 'other', label: 'Other', color: 'gray' },
];

export function TransactionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount.replace(/[^0-9.-]+/g, ''));
    onSubmit({
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
    });
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    // Remove any non-digit characters except decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }

    setFormData(prev => ({ ...prev, amount: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphic rounded-xl p-6 shadow-xl space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-heading font-bold text-primary dark:text-dark-accent mb-6">
        Add Transaction
      </h2>

      {/* Transaction Type Toggle */}
      <div className="flex rounded-lg overflow-hidden">
        {['expense', 'income'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type }))}
            className={`flex-1 py-2 px-4 capitalize transition-colors ${
              formData.type === type
                ? 'bg-primary text-white dark:bg-dark-accent'
                : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300'
            } animate-tap`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="relative">
        <input
          required
          type="text"
          value={formData.amount}
          onChange={handleAmountChange}
          className="peer w-full px-4 py-2 border rounded-lg bg-transparent border-gray-300 
                   dark:border-gray-700 focus:border-primary dark:focus:border-dark-accent
                   focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-accent/20"
          placeholder=" "
        />
        <label className="absolute left-4 -top-2.5 bg-white dark:bg-dark-background px-1 text-sm
                       text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-2
                       peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm">
          Amount
        </label>
      </div>

      {/* Category Select */}
      <div className="relative">
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="peer w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300
                   dark:border-gray-700 focus:border-primary dark:focus:border-dark-accent text-slate-900 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-accent/20"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        <label className="absolute left-4 -top-2.5 bg-white dark:bg-dark-background px-1 text-sm
                       text-gray-600 dark:text-gray-400">
          Category
        </label>
      </div>

      {/* Description Input */}
      <div className="relative">
        <input
          required
          type="text"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="peer w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300
                   dark:border-gray-700 focus:border-primary dark:focus:border-dark-accent text-slate-900 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-accent/20"
          placeholder=" "
        />
        <label className="absolute left-4 -top-2.5 bg-white dark:bg-dark-background px-1 text-sm
                       text-gray-600 dark:text-gray-400 transition-all peer-placeholder-shown:top-2
                       peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm">
          Description
        </label>
      </div>

      {/* Date Input */}
      <div className="relative">
        <input
          required
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          className="peer w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 border-gray-300
                   dark:border-gray-700 focus:border-primary dark:focus:border-dark-accent text-slate-900 dark:text-slate-100
                   focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-accent/20
                   [color-scheme:light] dark:[color-scheme:dark]"
        />
        <label className="absolute left-4 -top-2.5 bg-white dark:bg-dark-background px-1 text-sm
                       text-gray-600 dark:text-gray-400">
          Date
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg shadow-lg
                 dark:bg-dark-accent hover:bg-primary/90 dark:hover:bg-dark-accent/90
                 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-accent/20
                 animate-hover"
      >
        Add Transaction
      </motion.button>
    </motion.form>
  );
}
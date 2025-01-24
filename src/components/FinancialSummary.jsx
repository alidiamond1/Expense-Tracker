import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  LineController
} from 'chart.js';
import { useTheme } from '../contexts/ThemeContext';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler
);

export function FinancialSummary({ balance = 0, income = 0, expenses = 0, transactions = [] }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Create new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: transactions.slice(-7).map(t => new Date(t.date).toLocaleDateString()),
          datasets: [{
            label: 'Balance Trend',
            data: transactions.slice(-7).map(t => t.amount),
            borderColor: isDarkMode ? '#2DD4BF' : '#4F46E5',
            backgroundColor: isDarkMode ? 'rgba(45, 212, 191, 0.1)' : 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              ticks: {
                color: isDarkMode ? '#e5e7eb' : '#374151',
              }
            },
            x: {
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              ticks: {
                color: isDarkMode ? '#e5e7eb' : '#374151',
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions, isDarkMode]);

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: balance,
      color: 'text-primary dark:text-dark-accent',
      bgColor: 'bg-primary/5 dark:bg-dark-accent/5'
    },
    {
      title: 'Total Income',
      amount: income,
      color: 'text-secondary',
      bgColor: 'bg-secondary/5'
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      color: 'text-red-500',
      bgColor: 'bg-red-500/5'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glassmorphic rounded-xl p-4 shadow-xl ${card.bgColor} animate-hover`}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>
            <p className={`mt-2 text-2xl font-bold ${card.color}`}>
              ${Math.abs(card.amount).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphic rounded-xl p-4 shadow-xl h-64"
      >
        <canvas ref={chartRef} />
      </motion.div>
    </div>
  );
}
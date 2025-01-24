import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Add JSX runtime automatic
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    // Enable HMR
    hmr: true,
    // Open browser on start
    open: true,
    // Configure port
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@contexts': resolve(__dirname, './src/contexts'),
    },
  },
  build: {
    // Enable source maps for production
    sourcemap: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Configure output directory
    outDir: 'dist',
    // Enable minification
    minify: 'terser',
    // Configure chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});
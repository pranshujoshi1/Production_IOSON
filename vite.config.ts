import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Raise chunk size warning from 500kb → 700kb (framer-motion is legitimately large)
    chunkSizeWarningLimit: 700,

    rollupOptions: {
      output: {
        /**
         * Manual chunks — split the bundle so the browser can cache
         * vendor code independently of app code.
         */
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('posthog-js'))    return 'vendor-analytics';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('lucide-react'))  return 'vendor-icons';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
            return 'vendor-react';
          }
          return 'vendor-misc';
        },
      },
    },
  },
});

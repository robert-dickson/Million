import { resolve } from 'path';
import { defineConfig } from 'vite';
import { million } from './src/vite-plugin-million';

const src = resolve(__dirname, './src');

export default defineConfig({
  resolve: {
    alias: {
      src,
    },
  },
  plugins: [
    million({ importSource: src, react: false })
  ],
  test: {
    watch: false,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov'],
    },
  },
});

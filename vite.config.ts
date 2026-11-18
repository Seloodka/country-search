import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const rootDir = import.meta.dirname;

export default defineConfig({
  base: './',
  root: resolve(rootDir, 'src'),
  publicDir: resolve(rootDir, 'public'),

  build: {
    outDir: resolve(rootDir, 'dist'),
    emptyOutDir: true,
  },

  server: {
    open: '/index.html',
  },

  test: {
    dir: resolve(rootDir, 'tests'),
    environment: 'node',
    globals: true,
  },
});

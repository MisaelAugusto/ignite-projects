import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      screens: path.resolve(__dirname, './src/screens'),
      styles: path.resolve(__dirname, './src/styles'),
      routes: path.resolve(__dirname, './src/routes'),
      assets: path.resolve(__dirname, './src/assets')
    }
  }
});

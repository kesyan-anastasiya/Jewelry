import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: '../server/dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
      '/img': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  server: {
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        vision: resolve(__dirname, 'src/vision.html'),
        services: resolve(__dirname, 'src/services.html'),
        partenariats: resolve(__dirname, 'src/partenariats.html'),
        contact: resolve(__dirname, 'src/contact.html'),
      },
    },
  },
});

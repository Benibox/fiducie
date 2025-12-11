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
        'index-en': resolve(__dirname, 'src/index-en.html'),
        vision: resolve(__dirname, 'src/vision.html'),
        'vision-en': resolve(__dirname, 'src/vision-en.html'),
        services: resolve(__dirname, 'src/services.html'),
        'services-en': resolve(__dirname, 'src/services-en.html'),
        partenariats: resolve(__dirname, 'src/partenariats.html'),
        'partenariats-en': resolve(__dirname, 'src/partenariats-en.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        'contact-en': resolve(__dirname, 'src/contact-en.html'),
        'mentions-legales': resolve(__dirname, 'src/mentions-legales.html'),
        'mentions-legales-en': resolve(__dirname, 'src/mentions-legales-en.html'),
      },
    },
  },
});

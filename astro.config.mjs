import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  site: 'https://alchemy.build', // Replace with your actual production URL
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  // Production optimizations
  build: {
    // Inline small stylesheets for faster rendering
    inlineStylesheets: 'auto',
    // Asset file hashing for long-term caching
    assets: '_assets',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    ssr: {
      noExternal: ['framer-motion'],
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    build: {
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching
          manualChunks: {
            // React core
            'react-vendor': ['react', 'react-dom'],
            // Animation library - separate chunk
            'framer-motion': ['framer-motion'],
            // Icon libraries - will be tree-shaken but group what remains
            'icons': ['lucide-react'],
          },
          // Use stable file names for better caching
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 500,
    },
    // Optimize dependency pre-bundling
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
      // Force pre-bundling for consistency
      force: false,
    },
  },
});
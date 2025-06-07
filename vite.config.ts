/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(),],
  test: {
    globals: true, 
    environment: 'jsdom', 
    setupFiles: './src/config/setupTests.ts',
    reporters: ['default', 'html'], 
  },
  preview: {
		port: 3000,
		host: true,    // This enables listening on all network interfaces
	},
	server: {        // Also add this for development server
		host: true,    // This enables listening on all network interfaces
		port: 3000
	}
})

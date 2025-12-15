import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// Optimize for production
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		// Code splitting for better caching
		rollupOptions: {
			output: {
				manualChunks: {
					// Vendor chunks for better caching
					'openlayers': ['ol'],
					'svelte': ['svelte'],
					'allmaps': ['@allmaps/openlayers', '@allmaps/maplibre']
				}
			}
		},
		// Asset size limits
		chunkSizeWarningLimit: 1000,
		// Source maps for debugging (smaller inline maps)
		sourcemap: false,
		// CSS code splitting
		cssCodeSplit: true,
		// Asset inlining threshold
		assetsInlineLimit: 4096
	},
	optimizeDeps: {
		// Pre-bundle dependencies
		include: ['ol', '@allmaps/openlayers']
	}
});

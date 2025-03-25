import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Apply removeConsole plugin only in production mode
    ...(mode === 'production' ? [removeConsole({ include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], exclude: 'node_modules' })] : [])
  ,
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'PureMusic',
      short_name: 'PureMusic',
      description: 'Bringing Music To You',
      theme_color: '#64a4d3',
      background_color: '#FFFFFF',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/PureMusicLogo192Size.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/PureMusicLogo512Size.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
],
build: {
  minify: 'esbuild',
  sourcemap: mode === 'production', // Optionally enable sourcemaps only in production
}
}));

/*
export default defineConfig({
  plugins: [react()],
})
*/
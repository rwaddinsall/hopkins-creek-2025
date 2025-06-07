import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  adapter: netlify(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
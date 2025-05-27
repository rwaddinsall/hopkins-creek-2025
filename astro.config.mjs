// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
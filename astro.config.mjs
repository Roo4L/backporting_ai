import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static site generation for GitHub Pages
  integrations: [tailwind({
    applyBaseStyles: true,
  })],
  site: 'https://backporting.ai',
  base: process.env.ASTRO_BASE_PATH ?? '/',
});



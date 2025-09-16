import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: true,
  })],
  // Set the public site URL and base path for GitHub Pages project site
  // If you later add a custom domain, update `site` and remove/adjust `base` accordingly
  site: 'https://backporting.ai',
  base: '/',
});



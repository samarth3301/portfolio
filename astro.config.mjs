// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Static by default. Only /api/now-playing opts out of prerendering, so the
// adapter exists purely to run that one function. Swapping hosts means
// swapping this import, nothing else.
// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});

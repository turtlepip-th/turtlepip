// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://turtlepip.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/disclosure') &&
        !page.includes('/risk-warning') &&
        !page.includes('/privacy-policy'),
    }),
  ],
});

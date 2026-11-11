import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangcompass.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/go/') && !page.includes('/go.html') && !page.endsWith('/go'),
      serialize(item) {
        if (item.url.includes('/airports/') || item.url.includes('/rankings/')) {
          item.changefreq = 'daily';
          item.priority = 0.9;
        } else if (item.url === 'https://jichangcompass.com/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else {
          item.changefreq = 'weekly';
          item.priority = 0.7;
        }
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 健壮的 Sitemap 生成器：
 * 替代存在 routes 钩子边界 bug 的第三方集成，确保在 GitHub Actions (Linux) 及本地 Windows 环境下 100% 零错误稳定生成。
 */
function robustSitemap() {
  return {
    name: 'robust-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const outDir = fileURLToPath(dir);
        const siteUrl = 'https://jichangznz.blog';
        const now = new Date().toISOString();

        // 过滤合规页面：排除 /go/ 推广跳转页、404、纯文本及 xml 接口
        const validUrls = pages
          .map((p) => {
            let pathname = p.pathname.replace(/^\//, '');
            if (pathname && !pathname.endsWith('/')) pathname += '/';
            return `${siteUrl}/${pathname}`;
          })
          .filter((url) => {
            return (
              !url.includes('/go/') &&
              !url.includes('/go.html') &&
              !url.endsWith('/go/') &&
              !url.includes('/404') &&
              !url.includes('.txt') &&
              !url.includes('.xml')
            );
          });

        const uniqueUrls = Array.from(new Set(validUrls)).sort();

        // 1. 生成 sitemap-0.xml
        const urlEntries = uniqueUrls
          .map((url) => {
            let priority = '0.7';
            let changefreq = 'weekly';
            if (url === `${siteUrl}/`) {
              priority = '1.0';
              changefreq = 'daily';
            } else if (url.includes('/airports/') || url.includes('/rankings/')) {
              priority = '0.9';
              changefreq = 'daily';
            }
            return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
          })
          .join('\n');

        const sitemap0Content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
        fs.writeFileSync(path.join(outDir, 'sitemap-0.xml'), sitemap0Content, 'utf8');

        // 2. 生成 sitemap-index.xml 及兼容的 sitemap.xml
        const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${siteUrl}/sitemap-0.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
        fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), sitemapIndexContent, 'utf8');
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapIndexContent, 'utf8');

        console.log(`[robust-sitemap] Successfully generated sitemaps with ${uniqueUrls.length} URLs!`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://jichangznz.blog',
  build: {
    assets: 'assets',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    robustSitemap(),
  ],
});

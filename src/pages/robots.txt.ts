import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../consts';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

# Explicit permissions for Search Engines & AI Crawlers (GEO / AEO)
# 注意：严禁写入 Disallow: /go 或 Disallow: /go.html，避免 Bing 站长工具误报 Blocked by robots.txt 错误
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: PerplexityBot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Claude-Web
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Applebot-Extended
Allow: /

# Sitemap location
Sitemap: ${SITE_CONFIG.siteUrl}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

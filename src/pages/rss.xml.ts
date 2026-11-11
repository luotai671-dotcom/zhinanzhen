import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../consts';

export async function GET(context: any) {
  const blogPosts = await getCollection('blog');
  const airports = await getCollection('airports');

  const items = [
    ...blogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      author: post.data.author,
    })),
    ...airports.map((airport) => ({
      title: `${airport.data.name} 2026深度评测报告与晚高峰测速`,
      pubDate: airport.data.updatedDate,
      description: airport.data.tagline,
      link: `/airports/${airport.slug}`,
      author: SITE_CONFIG.author.name,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    site: context.site || SITE_CONFIG.siteUrl,
    items,
    customData: `<language>zh-CN</language>`,
  });
}


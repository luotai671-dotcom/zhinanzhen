import { defineCollection, z } from 'astro:content';

const airportsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    englishName: z.string().optional(),
    tagline: z.string(),
    rank: z.number(),
    rating: z.number().min(1).max(10),
    reviewCount: z.number().default(120),
    establishedYear: z.number().default(2021),
    linesType: z.string(),
    protocols: z.array(z.string()),
    startingPrice: z.number(),
    billingPeriod: z.string().default('月'),
    speedPeak: z.string(),
    latencyAvg: z.string(),
    packetLoss: z.string(),
    bandwidth: z.string(),
    nodesCount: z.string(),
    streamingUnlock: z.object({
      netflix: z.boolean().default(true),
      disney: z.boolean().default(true),
      youtube4k: z.boolean().default(true),
      chatgpt: z.boolean().default(true),
      tiktok: z.boolean().default(true),
    }),
    coupon: z.object({
      code: z.string(),
      discount: z.string(),
      expiry: z.string().optional(),
    }).optional(),
    affiliateSlug: z.string(),
    affiliateTargetUrl: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    tags: z.array(z.string()),
    category: z.array(z.string()).default(['all']),
    clients: z.array(z.string()).default(['Clash Verge', 'Sing-box', 'Surge', 'Shadowrocket', 'Quantumult X']),
    updatedDate: z.date(),
    featured: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('机场指南针技术团队'),
    category: z.string(),
    tags: z.array(z.string()),
    readingTime: z.string().default('5分钟'),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  airports: airportsCollection,
  blog: blogCollection,
};


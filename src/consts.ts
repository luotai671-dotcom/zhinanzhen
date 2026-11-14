// SEO & Entity Modeling Configuration
export const SITE_CONFIG = {
  name: '机场指南针',
  englishName: 'AirportCompass',
  siteUrl: 'https://jichangznz.blog',
  titleSuffix: ' - 机场指南针 | 2026顶级机场推荐与评测导航',
  defaultTitle: '2026顶级机场推荐与评测导航 | 稳定IEPL专线·ChatGPT解锁·4K秒开',
  defaultDescription: '专注2026全网优质SS/V2Ray/Trojan/Hysteria2机场节点深度实测。提供晚高峰千兆测速、原生IP流媒体/ChatGPT解锁矩阵、独家限时优惠码与新手Clash/Sing-box订阅配置教程。',
  keywords: [
    '机场推荐', '2026机场推荐', '科学上网机场', 'IEPL专线机场', 'IPLC专线',
    '稳定机场', '便宜机场', 'ChatGPT机场', 'Netflix流媒体解锁机场',
    'Clash节点', 'Sing-box订阅', 'Hysteria2节点', '机场优惠码', '高速梯子'
  ],
  author: {
    name: '机场极客实验室 (Compass Tech Lab)',
    url: 'https://jichangznz.blog/about',
    avatar: 'https://jichangznz.blog/avatar.webp',
    description: '深耕网络穿透、跨境专线架构、BGP拓扑及网络协议优化8年，累计实测超过200+主流机场服务商。',
  },
  publisher: {
    name: '机场指南针评测网',
    logo: 'https://jichangznz.blog/logo.png',
  },
  social: {
    telegramChannel: 'https://t.me/shandianjiaoliu',
    telegramGroup: 'https://t.me/shandianjiaoliu',
    twitter: 'https://x.com/jichangcompass',
    github: 'https://github.com/jichangcompass',
  },
  // Conversion & Disclosure
  disclosure: '声明：本站提供客观独立的技术性能测试报告。为维持持续的高频节点监控与服务器集群运营，部分链接包含赞助商推广代码（Affiliate Link）。若您通过本站链接选购，我们可能会获得小额佣金，这不会增加您的任何额外购买成本，并将促使我们提供更严谨的评测数据。',
  updateYear: 2026,
  geoTargetCountry: 'CN',
  defaultLanguage: 'zh-CN',
};

export const NAVIGATION_LINKS = [
  { name: '🔥 本月精选排行', href: '/#ranking' },
  { name: '⚡ 专线机场对比', href: '/rankings/iepl-airports' },
  { name: '🤖 ChatGPT/AI首选', href: '/rankings/chatgpt-airports' },
  { name: '💰 高性价比平价', href: '/rankings/cheap-airports' },
  { name: '📚 客户端教程', href: '/wiki' },
  { name: '🧭 全站机场库', href: '/airports' },
];

export const CATEGORIES = [
  { id: 'all', name: '全部机场' },
  { id: 'iepl', name: 'IEPL/IPLC专线' },
  { id: 'chatgpt', name: 'AI/ChatGPT解锁' },
  { id: 'streaming', name: '4K/8K流媒体' },
  { id: 'budget', name: '性价比平价' },
  { id: 'gaming', name: '低延迟游戏' },
  { id: 'volume', name: '按量计费/不限时' },
];


# 🧭 网络指南针 (NetworkCompass) - 现代网络性能评测与边缘加速导航平台

> **基于 Astro 4.x + Tailwind CSS 构建的极速、合规、现代化静态技术博客与性能评测系统。内置全套 Technical SEO、IndexNow 实时索引推送、外链 302 临时隔离中枢及结构化数据规范。**

---

## 🌟 核心特性与技术亮点

- **⚡ 极致加载性能 (Core Web Vitals 100/100)**: 
  - 基于 Astro 4.x 全静态站点生成 (SSG)，默认零客户端 JavaScript 运行时。
  - 核心交互（如数据检索、分类筛选）采用轻量现代化原生逻辑，极速首字节时间 (TTFB) 与最大内容绘制 (LCP)。
- **🔍 搜索引擎合规与 Technical SEO 最佳实践**:
  - **规范化站点地图**: 自动生成符合 Google 与 Bing 标准的双层 Sitemap（`sitemap-index.xml` + `sitemap-0.xml`），带权重优先级与更新周期策略。
  - **IndexNow 自动推送**: 集成 32 位验证密钥与构建后自动化脚本，内容发布后秒级主动向 IndexNow 协议提交全站 URL 更新。
  - **精准 Meta 与社交卡片**: 完备的 Canonical 规范网址、多语言/地域标头、OpenGraph 与 Twitter Cards 宽屏大图协议。
  - **合规 robots.txt**: 保持全站基础开放（`Allow: /`），避免触发搜索引擎站长工具误报拦截，由页面级标头与 HTTP 响应头完成精准索引控制。
- **🤖 GEO & AEO (Generative Engine Optimization)**:
  - 部署符合标准的 `/llms.txt`，供现代化 AI 搜索引擎（ChatGPT Search、Perplexity、Claude 等）高效抓取精准技术摘要。
  - 采用清晰的语义化对比表格与 Semantic HTML5 架构，最大化提高精选摘要（Featured Snippets）命中率。
- **📊 Schema.org 权威实体建模**:
  - 完整集成 `Product`、`Review`、`AggregateRating`、`FAQPage`、`ItemList`、`BreadcrumbList`、`WebSite` 与 `Organization` 结构化数据，提升品牌专业度与内容可信度。
- **🛡️ 外链 302 隔离与合规中枢**:
  - **安全临时跳转中枢 (`/go/[slug]` 与 `/go.html`)**: 统一中转外部出站链接，头部严格注入 `noindex, nofollow, noarchive, nosnippet` 标头。
  - **多平台规则适配**: 内置 Cloudflare Pages / Netlify 专用的 `_redirects` 配置及 VPS / 宝塔专用的 `nginx-redirects.conf` 配置。
  - **强制合规安全属性**: 外部出站链接均严格附加 `rel="nofollow sponsored noopener noreferrer"` 与 `target="_blank"`。

---

## 📁 目录结构

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动化构建与 IndexNow 推送工作流
├── public/
│   ├── favicon.svg             # 矢量网站图标
│   ├── go.html                 # 客户端安全跳转承接页 (严格 noindex 标头)
│   ├── llms.txt                # AI / LLM 搜索引擎专用知识库入口
│   ├── _headers                # Cloudflare Pages 安全标头配置
│   ├── _redirects              # Cloudflare / Netlify 302 临时重定向规则
│   └── nginx-redirects.conf    # Nginx 302 临时重定向与 X-Robots-Tag 规则
├── src/
│   ├── consts.ts               # 站点元数据、SEO 配置与全局社交链接
│   ├── content/
│   │   ├── config.ts           # Astro Content Collections 强类型 Zod 校验定义
│   │   ├── airports/           # 网络服务商性能测试报告与参数详情 (Markdown)
│   │   └── blog/               # 技术配置教程、协议深度解析与网络优化文章 (Markdown)
│   ├── components/
│   │   ├── SEOHead.astro       # SEO Meta / JSON-LD / OG 核心组件
│   │   ├── Navbar.astro        # 顶栏导航与深浅色模式切换
│   │   ├── Footer.astro        # 页脚合规声明与权威评测说明
│   │   ├── HeroSection.astro   # 首页核心性能指标展示组件
│   │   ├── AirportCard.astro   # 性能评测卡片组件
│   │   ├── ComparisonTable.astro # 性能对比总表组件
│   │   └── SearchModal.astro   # 客户端文档与评测快速检索弹窗
│   ├── layouts/
│   │   ├── BaseLayout.astro    # 全局通用页面骨架
│   │   ├── ReviewLayout.astro  # 服务商评测专属详情布局
│   │   └── BlogLayout.astro    # 技术教程专属布局
│   └── pages/
│       ├── index.astro         # 站点主页
│       ├── airports/           # 性能评测聚合页与动态详情路由
│       ├── blog/               # 技术文章聚合页与动态详情路由
│       ├── clients/            # 客户端工具推荐与配置指南
│       ├── coupons/            # 优惠资讯与活动专区
│       ├── rankings/           # 各类专线与性能榜单专栏
│       ├── warnings/           # 服务商运行状态与风险监控预警
│       ├── wiki/               # 知识百科与网络协议原理解析
│       ├── go/[slug].astro     # 动态 302 隔离跳转路由
│       ├── robots.txt.ts       # 动态 robots.txt
│       └── rss.xml.ts          # 自动化全站 RSS 输出
├── scripts/
│   ├── check-links.cjs         # 全站死链健康度检测脚本
│   ├── fix-relative-paths.cjs  # 离线与在线双环境兼容后处理脚本
│   └── indexnow-submit.cjs     # IndexNow 自动化提交脚本
├── astro.config.mjs            # Astro 4 与 Tailwind、Sitemap 核心配置文件
├── tailwind.config.mjs         # Tailwind CSS 主题配置
└── package.json
```

---

## 🚀 启动与构建指南

### 1. 安装依赖
```bash
npm install
```

### 2. 开发调试
```bash
npm run dev
```
启动本地开发服务器，在浏览器打开 `http://localhost:4321` 即可实时预览并进行调试。

### 3. 生成全静态文件 (SSG)
```bash
npm run build
```
执行完整编译流程：
1. Astro 静态渲染 HTML 与 CSS；
2. 自动生成 `sitemap.xml` 与 `robots.txt`；
3. 执行 `scripts/fix-relative-paths.cjs` 规范化外链安全属性；
4. 执行 `scripts/indexnow-submit.cjs` 自动向 IndexNow 提交更新。

编译产物位于 `dist/` 目录，支持直接部署或本地双击离线预览。

### 4. 链接健康度检测
```bash
npm run build
node scripts/check-links.cjs
```
自动遍历 `dist/` 中的所有页面并检测内部相对路径有效性，确保零死链交付。

---

## 🌐 推荐部署方式

本项目为标准 Jamstack 全静态架构，支持零配置托管于全球主流边缘 CDN：

1. **Cloudflare Pages (推荐)**:
   - 框架预设 (Framework preset): `Astro`
   - 构建命令 (Build command): `npm run build`
   - 构建产物目录 (Build output directory): `dist`
   - 自动识别根目录 `_redirects` 与 `_headers`。
2. **Vercel / Netlify**:
   - 关联 GitHub 仓库即可实现自动化部署与持续交付。
3. **自建 Nginx / VPS / 宝塔面板**:
   - 将 `dist/` 目录内容上传至网站根目录；
   - 在 Nginx `server` 块中通过 `include /path/to/nginx-redirects.conf;` 引入安全重定向配置。

---

## 📄 开源与免责声明

本项目遵循开源规范构建，所展示的测速数据与配置教程仅供网络工程技术交流与性能基准参考。请在使用网络服务时严格遵守当地法律法规。

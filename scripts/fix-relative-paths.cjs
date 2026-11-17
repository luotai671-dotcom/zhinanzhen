const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function getAllFiles(dir, ext = '.html') {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, ext));
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/ to process.`);

htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Calculate relative depth from dist/
  const relativeFromDist = path.relative(distDir, path.dirname(filePath));
  const depth = relativeFromDist === '' ? 0 : relativeFromDist.split(path.sep).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  // 1. Fix asset links
  content = content
    .replace(/href="\/_astro\//g, `href="${prefix}_astro/`)
    .replace(/src="\/_astro\//g, `src="${prefix}_astro/`)
    .replace(/href="\/favicon\.svg"/g, `href="${prefix}favicon.svg"`);

  // 2. Fix navigation links so file:// works seamlessly
  content = content
    .replace(/href="\/"/g, `href="${prefix}index.html"`)
    .replace(/href="\/#airports-section"/g, `href="${prefix}index.html#airports-section"`)
    .replace(/href="\/wiki"/g, `href="${prefix}wiki/index.html"`)
    .replace(/href="\/clients"/g, `href="${prefix}clients/index.html"`)
    .replace(/href="\/warnings"/g, `href="${prefix}warnings/index.html"`)
    .replace(/href="\/coupons"/g, `href="${prefix}coupons/index.html"`)
    .replace(/href="\/airports"/g, `href="${prefix}airports/index.html"`)
    .replace(/href="\/airports\/([a-zA-Z0-9_-]+)"/g, `href="${prefix}airports/$1/index.html"`)
    .replace(/href="\/go\/([a-zA-Z0-9_-]+)"/g, `href="${prefix}go/$1/index.html"`)
    .replace(/href="\/blog"/g, `href="${prefix}blog/index.html"`)
    .replace(/href="\/blog\/([a-zA-Z0-9_-]+)"/g, `href="${prefix}blog/$1/index.html"`)
    .replace(/href="\/rankings\/([a-zA-Z0-9_-]+)"/g, `href="${prefix}rankings/$1/index.html"`);

  // 3. 全站 AFF 推广链接强制合规：统一附加 rel="nofollow sponsored noopener noreferrer" 与 target="_blank"
  content = content.replace(/<a\b([^>]*?)>/gi, (match, attrs) => {
    // 判断是否是指向 /go/ 或 go.html 的推广跳转链接
    const isAffLink = /href\s*=\s*["'][^"']*(?:\/go\/|go\.html|\/dist\/go\/)[^"']*["']/i.test(attrs);
    if (!isAffLink) return match;

    let newAttrs = attrs;

    // 确保 target="_blank"
    if (!/target\s*=\s*["'][^"']*["']/i.test(newAttrs)) {
      newAttrs += ' target="_blank"';
    } else {
      newAttrs = newAttrs.replace(/target\s*=\s*["'][^"']*["']/i, 'target="_blank"');
    }

    // 严格确保 rel="nofollow sponsored noopener noreferrer"
    if (!/rel\s*=\s*["'][^"']*["']/i.test(newAttrs)) {
      newAttrs += ' rel="nofollow sponsored noopener noreferrer"';
    } else {
      newAttrs = newAttrs.replace(/rel\s*=\s*["'][^"']*["']/i, 'rel="nofollow sponsored noopener noreferrer"');
    }

    return `<a${newAttrs}>`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

// 4. 同步全量静态产物到根目录（确保无论托管平台从 dist 目录还是根目录部署，CSS、JS 与页面均 100% 正常渲染）
const foldersToSync = ['_astro', 'airports', 'blog', 'clients', 'coupons', 'go', 'rankings', 'warnings', 'wiki'];
foldersToSync.forEach((folder) => {
  const src = path.join(distDir, folder);
  const dest = path.join(__dirname, '..', folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
});

const filesToSync = [
  'index.html',
  'robots.txt',
  'sitemap-0.xml',
  'sitemap-index.xml',
  'sitemap.xml',
  'rss.xml',
  'favicon.svg',
  'site.webmanifest',
];
filesToSync.forEach((file) => {
  const src = path.join(distDir, file);
  const dest = path.join(__dirname, '..', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

console.log('Successfully patched all HTML files with robust relative paths, AFF compliance, and full root-level assets synchronization!');

const fs = require('fs');
const path = require('path');

const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html');
let content = fs.readFileSync(distIndexPath, 'utf8');

// Also update dist/index.html to use relative paths for local file preview support
let localDistContent = content
  .replaceAll('href="/_astro/', 'href="./_astro/')
  .replaceAll('src="/_astro/', 'src="./_astro/')
  .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"')
  .replaceAll('href="/wiki"', 'href="./wiki/index.html"')
  .replaceAll('href="/clients"', 'href="./clients/index.html"')
  .replaceAll('href="/warnings"', 'href="./warnings/index.html"')
  .replaceAll('href="/coupons"', 'href="./coupons/index.html"');

fs.writeFileSync(distIndexPath, localDistContent, 'utf8');

// For root index.html, paths need to point to ./dist/
let rootContent = content
  .replaceAll('href="/_astro/', 'href="./dist/_astro/')
  .replaceAll('src="/_astro/', 'src="./dist/_astro/')
  .replaceAll('href="/favicon.svg"', 'href="./dist/favicon.svg"')
  .replaceAll('href="/wiki"', 'href="./dist/wiki/index.html"')
  .replaceAll('href="/clients"', 'href="./dist/clients/index.html"')
  .replaceAll('href="/warnings"', 'href="./dist/warnings/index.html"')
  .replaceAll('href="/coupons"', 'href="./dist/coupons/index.html"');

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), rootContent, 'utf8');
console.log('Successfully updated both root index.html and dist/index.html with relative paths and UTF-8 encoding!');

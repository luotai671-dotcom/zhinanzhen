const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext = '.html') {
  let results = [];
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

const htmlFiles = getAllFiles(path.join(__dirname, '..', 'dist'));
console.log('Total HTML pages in dist:', htmlFiles.length);

let brokenCount = 0;
htmlFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /href="(\.\.?[^"#]+\.html)(#[^"]*)?"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const link = match[1];
    const target = path.resolve(path.dirname(f), link);
    if (!fs.existsSync(target)) {
      console.log(`Broken link in ${path.relative(__dirname, f)} -> ${link}`);
      brokenCount++;
    }
  }
});

console.log(`Link check completed. Total broken internal relative links: ${brokenCount}`);


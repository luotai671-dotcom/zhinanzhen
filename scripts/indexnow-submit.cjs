/**
 * IndexNow Protocol Submission Script
 * Automatically extracts URLs from sitemap and submits them to IndexNow API.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = '41889b18d1b395e76872a144ecb15050';
const HOST = 'jichangcompass.com';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const DIST_DIR = path.join(__dirname, '..', 'dist');

function getUrlsFromSitemaps() {
  const urls = new Set();

  if (!fs.existsSync(DIST_DIR)) {
    console.warn('[IndexNow] dist directory does not exist yet. Please run build first.');
    return [];
  }

  // Find all sitemap XML files in dist
  const files = fs.readdirSync(DIST_DIR).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
      if (matches) {
        matches.forEach((m) => {
          const url = m.replace(/<\/?loc>/g, '').trim();
          // Skip sitemap index references pointing to other xml files
          if (!url.endsWith('.xml') && url.includes(HOST)) {
            urls.add(url);
          }
        });
      }
    } catch (err) {
      console.warn(`[IndexNow] Error reading ${file}:`, err.message);
    }
  }

  // Fallback: If sitemap didn't yield URLs, include at least the homepage
  if (urls.size === 0) {
    urls.add(`https://${HOST}/`);
  }

  return Array.from(urls);
}

function submitToIndexNow(urls) {
  return new Promise((resolve) => {
    if (!urls || urls.length === 0) {
      console.log('[IndexNow] No URLs found to submit.');
      return resolve(false);
    }

    const payload = JSON.stringify({
      host: HOST,
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    });

    console.log(`[IndexNow] Submitting ${urls.length} URLs to https://api.indexnow.org/indexnow ...`);
    console.log(`[IndexNow] Host: ${HOST} | Key: ${API_KEY}`);

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`[IndexNow] SUCCESS (HTTP 200): All ${urls.length} URLs successfully submitted to IndexNow!`);
          resolve(true);
        } else if (res.statusCode === 202) {
          console.log(`[IndexNow] ACCEPTED (HTTP 202): Request accepted by IndexNow; key validation in progress.`);
          resolve(true);
        } else {
          console.warn(`[IndexNow] API responded with status ${res.statusCode}:`, body || res.statusMessage);
          resolve(false);
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      console.log('[IndexNow] Request timed out. (Skipping in offline/sandboxed build environment)');
      resolve(false);
    });

    req.on('error', (err) => {
      console.log(`[IndexNow] Network notice: ${err.message}. (Skipping in offline/sandboxed build environment)`);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('--- Starting IndexNow URL Submission ---');
  const urls = getUrlsFromSitemaps();
  console.log(`[IndexNow] Extracted ${urls.length} canonical URLs from sitemap.`);
  
  if (urls.length > 0) {
    console.log(`[IndexNow] Previewing first 3 URLs:`);
    urls.slice(0, 3).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
    if (urls.length > 3) {
      console.log(`  ... and ${urls.length - 3} more.`);
    }
  }

  await submitToIndexNow(urls);
  console.log('--- IndexNow URL Submission Completed ---');
}

main();


const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.json': 'application/json; charset=utf-8'
};

const PUBLIC_ROOT = path.join(__dirname, '..', '..', 'public');

/**
 * Serves a file from /public for a given URL pathname.
 * Returns true if it handled the request (found + served, or
 * cleanly 404'd), false if the caller should keep looking for
 * a matching route instead.
 */
function serveStatic(req, res, pathname) {
  // Only ever serve out of /public, and only GET/HEAD.
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;

  const decoded = decodeURIComponent(pathname);
  const safeRelative = path.normalize(decoded).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(PUBLIC_ROOT, safeRelative);

  // Defensive: refuse to serve anything that resolves outside of
  // /public, even via a crafted ".." or absolute-path style URL.
  if (!filePath.startsWith(PUBLIC_ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return true;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return false; // let the router try a page route, or 404 later
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.css' || ext === '.js' ? 'no-cache' : 'public, max-age=3600'
  });

  if (req.method === 'HEAD') {
    res.end();
    return true;
  }

  fs.createReadStream(filePath).pipe(res);
  return true;
}

module.exports = { serveStatic, PUBLIC_ROOT };

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const distIndex = path.join(__dirname, 'dist', 'index.html');
const rootIndex = path.join(__dirname, 'index.html');
const baseDir = fs.existsSync(distIndex) ? path.join(__dirname, 'dist') : __dirname;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname || '/');
  if (pathname === '/') pathname = '/index.html';

  const safePath = path.normalize(path.join(baseDir, pathname));
  if (!safePath.startsWith(baseDir)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(safePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';

  fs.stat(safePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const fallback = baseDir === path.join(__dirname, 'dist') ? distIndex : rootIndex;
      fs.readFile(fallback, (e, data) => {
        if (e) {
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
      });
      return;
    }
    res.setHeader('Content-Type', type);
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
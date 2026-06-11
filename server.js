const http = require('http');
const puppeteer = require('puppeteer');

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/shot') {
    try {
      const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
      const page = await browser.newPage();
      await page.setContent('<h1>upuai e2e puppeteer</h1>');
      const png = await page.screenshot({ type: 'png' });
      await browser.close();
      res.writeHead(200, { 'content-type': 'image/png' });
      res.end(png);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(`screenshot failed: ${err && err.message}\nHOME=${process.env.HOME}`);
    }
    return;
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: true, home: process.env.HOME }));
});

server.listen(port, () => console.log(`listening on :${port} HOME=${process.env.HOME}`));

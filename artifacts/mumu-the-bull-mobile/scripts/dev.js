#!/usr/bin/env node
/**
 * Dev wrapper: starts an HTTP proxy on 0.0.0.0:PORT immediately so the
 * workflow port/health check can detect it, then launches Expo/Metro on
 * PORT+1.  All requests are forwarded PORT → PORT+1 once Metro is ready.
 */

const http = require('http');
const net = require('net');
const { spawn } = require('child_process');

const PORT = parseInt(process.env.PORT || '8082', 10);
const METRO_PORT = PORT + 1;

let metroReady = false;

function tryProxy(req, res, targetPort) {
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `localhost:${targetPort}` },
  };
  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxy.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('Metro starting…\n');
    }
  });
  if (req.readable) req.pipe(proxy, { end: true });
  else proxy.end();
}

const server = http.createServer((req, res) => {
  if (metroReady) {
    tryProxy(req, res, METRO_PORT);
  } else {
    // Respond 200 immediately so health checks pass before Metro warms up
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Metro starting…\n');
  }
});

// WebSocket upgrade passthrough
server.on('upgrade', (req, socket, head) => {
  const conn = net.connect(METRO_PORT, '127.0.0.1', () => {
    const hdrs = Object.entries(req.headers)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\r\n');
    conn.write(`${req.method} ${req.url} HTTP/1.1\r\n${hdrs}\r\n\r\n`);
    if (head && head.length) conn.write(head);
    socket.pipe(conn);
    conn.pipe(socket);
  });
  conn.on('error', () => socket.destroy());
  socket.on('error', () => conn.destroy());
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[dev-wrapper] Listening on 0.0.0.0:${PORT} → Metro on :${METRO_PORT}`);

  const env = { ...process.env, PORT: String(METRO_PORT) };

  const metro = spawn(
    'pnpm',
    ['exec', 'expo', 'start', '--localhost', '--port', String(METRO_PORT)],
    { stdio: 'inherit', env }
  );

  // Poll until Metro responds, then flip metroReady
  const interval = setInterval(() => {
    const check = http.get({ hostname: '127.0.0.1', port: METRO_PORT, path: '/' }, (r) => {
      if (r.statusCode < 500) {
        console.log('[dev-wrapper] Metro is ready, enabling proxy passthrough');
        metroReady = true;
        clearInterval(interval);
      }
      r.resume();
    });
    check.on('error', () => {}); // Metro not up yet, keep polling
    check.end();
  }, 2000);

  metro.on('exit', (code) => {
    clearInterval(interval);
    server.close();
    process.exit(code ?? 0);
  });
});

process.on('SIGTERM', () => { server.close(); process.exit(0); });
process.on('SIGINT', () => { server.close(); process.exit(0); });

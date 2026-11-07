import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Availability, Reservation } from './reservations.js';

const DEFAULT_CAPACITY = 5;

export function createApp({ capacity = DEFAULT_CAPACITY, resource = 'Black Tech NOLA community event' } = {}) {
  const availability = new Availability(capacity);
  const reservations = new Reservation(availability);
  const json = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };
  return http.createServer(async (req, res) => {
    try {
      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(await readFile(new URL('../public/index.html', import.meta.url)));
      }
      if (req.method === 'GET' && req.url === '/api/availability') {
        return json(res, 200, { resource, available: availability.available() });
      }
      if (req.method === 'POST' && req.url === '/api/reservations') {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 4096) return json(res, 413, { message: 'Request too large.' });
        }
        let data;
        try { data = JSON.parse(body); } catch { return json(res, 400, { message: 'Use valid JSON.' }); }
        if (!data || typeof data !== 'object') return json(res, 400, { message: 'Use a request object.' });
        const result = reservations.reserve(data.name, data.quantity);
        return json(res, result.status === 'confirmed' ? 201 : 400,
          { ...result, available: availability.available() });
      }
      json(res, 404, { message: 'Not found.' });
    } catch (error) {
      // Keep unexpected failures separate from validation rejections.
      json(res, 500, { status: 'error', message: error.message, available: availability.available() });
    }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const capacity = Number(process.env.CAPACITY ?? DEFAULT_CAPACITY);
  if (!Number.isSafeInteger(capacity) || capacity < 0) throw new Error('CAPACITY must be a nonnegative integer');
  const port = Number(process.env.PORT ?? 3000);
  createApp({ capacity, resource: process.env.RESOURCE }).listen(port, '127.0.0.1', () => {
    console.log(`Workshop app: http://127.0.0.1:${port}. Restart to reset capacity to ${capacity}.`);
  });
}

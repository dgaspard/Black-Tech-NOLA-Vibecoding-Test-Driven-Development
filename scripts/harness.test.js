import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';
test('the real app serves the page and initial availability', async () => {
  const server = createApp({ capacity: 2 });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const page = await fetch(base);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /id="reservation"/);
    const response = await fetch(`${base}/api/availability`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).available, 2);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

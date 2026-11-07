import { mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const stage = process.argv[2];
if (!['starter', 'services', 'workflow', 'complete'].includes(stage)) {
  console.error('Usage: npm run checkpoint -- starter|services|workflow|complete'); process.exit(1);
}
// Preserve work before replacing the explicit workshop files.
const backup = resolve(root, '.backups', `${Date.now()}-${stage}`);
await mkdir(backup, { recursive: true });
await copyFile(resolve(root, 'src/reservations.js'), resolve(backup, 'reservations.js'));
for (const file of await readdir(resolve(root, 'features'))) {
  if (file.endsWith('.feature')) {
    await copyFile(resolve(root, 'features', file), resolve(backup, file));
    await rm(resolve(root, 'features', file));
  }
}
await copyFile(resolve(root, 'checkpoints', stage === 'complete' ? 'complete' : 'starter', 'reservations.js'), resolve(root, 'src/reservations.js'));
for (const group of stage === 'starter' ? [] : stage === 'services' ? ['service-features'] : ['service-features', 'workflow-features']) {
  for (const file of await readdir(resolve(root, 'checkpoints', group))) {
    await copyFile(resolve(root, 'checkpoints', group, file), resolve(root, 'features', file));
  }
}
console.log(`Loaded ${stage}. Previous app and root feature files saved in ${backup}. Restart any running server.`);
console.log(stage === 'starter' ? 'No business scenarios yet. Run npm run test:harness.' : stage === 'complete' ? 'Run npm test: expect 6 passing scenarios.' : 'Run npm test: expect business failures, with no undefined steps.');

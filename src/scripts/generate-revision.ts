import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

interface RevisionEntry {
  url: string;
  revision: string;
}

const publicDir = path.resolve('public');

// all static files to be auto-revisioned inside `serwist.addToPrecacheList() YAHUOOOOOO`
const filesToHash = ['data/metadata.json', 'data/hotlines.json', 'bettergov-horizontal-logo.png'];

const revisionEntries: RevisionEntry[] = filesToHash.map(relativePath => {
  const filePath = path.join(publicDir, relativePath);
  const buffer = fs.readFileSync(filePath);
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 10);
  const url = `/${relativePath.replace(/\\/g, '/')}`;

  return { url, revision: hash };
});

const outputPath = path.join('src', 'revisions.json');
fs.writeFileSync(outputPath, JSON.stringify(revisionEntries, null, 2));

console.log('revisions.json generated successfully:');
// table for readable type shi!!!
console.table(revisionEntries);

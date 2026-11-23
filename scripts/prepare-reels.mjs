import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const url = 'https://github.com/AdrianCabello/lautarovulcano/releases/download/portfolio-video-2026-11-23/reels-web.tar.gz';
const checksum = 'b3f776c80ad225a1886d033d152b3b580ce8c0dac347da3e0b4dc558bc4f6488';
const assets = fileURLToPath(new URL('../src/assets/', import.meta.url));
const destination = join(assets, 'reels');
const marker = join(destination, '.release');
if (await readFile(marker, 'utf8').catch(() => '') !== checksum) {
  const temp = await mkdtemp(join(tmpdir(), 'portfolio-reels-'));
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Media download returned ' + response.status);
    const archive = join(temp, 'reels.tar.gz');
    const hash = createHash('sha256');
    const verify = new Transform({
      transform(chunk, encoding, next) { hash.update(chunk); next(null, chunk); }
    });
    await pipeline(Readable.fromWeb(response.body), verify, createWriteStream(archive));
    if (hash.digest('hex') !== checksum) throw new Error('Media checksum mismatch');
    await mkdir(destination, { recursive: true });
    execFileSync('tar', ['-xzf', archive, '-C', destination]);
    await writeFile(marker, checksum);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import ts from 'typescript';

const source = ts.createSourceFile('archive.ts', await readFile('src/app/components/behance-archive/behance-archive.component.ts', 'utf8'), ts.ScriptTarget.Latest, true);
let projects = [];
function visit(node) {
  if (ts.isPropertyDeclaration(node) && node.name.getText(source) === 'projects') {
    projects = node.initializer.elements.map(item => Object.fromEntries(item.properties.map(p => [p.name.getText(source), p.initializer.text])));
  }
  ts.forEachChild(node, visit);
}
visit(source);
const manifest = JSON.parse(await readFile('src/assets/work-gallery/manifest.json', 'utf8').catch(error => {
  if (error.code === 'ENOENT') return '{}';
  throw error;
}));
async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response;
}
async function saveImage(candidate, directory, index) {
  const extension = candidate.type === 'WEBP' ? 'webp' : new URL(candidate.url).pathname.split('.').pop();
  const path = `${directory}/${index}.${extension}`;
  try { await stat(`src/${path}`); } catch {
    const response = await request(candidate.url);
    if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error('Not an image');
    await writeFile(`src/${path}`, Buffer.from(await response.arrayBuffer()));
  }
  return `/${path}`;
}
async function importProject(project) {
  const id = project.url.split('/')[4];
  if (manifest[id]?.curated) return;
  try {
    const html = await (await request(project.url)).text();
    const match = html.match(/<script type="application\/json" id="beconfig-store_state">([\s\S]*?)<\/script>/);
    if (!match) throw new Error('Project data missing');
    const data = JSON.parse(match[1]).project.project;
    const directory = `assets/work-gallery/${id}`;
    await mkdir(`src/${directory}`, { recursive: true });
    const groups = [];
    let index = 0;
    const otherMedia = [];
    for (const module of data.modules) {
      const images = [];
      for (const item of module.components || [module]) {
        const available = (item.imageSizes?.allAvailable || []).filter(s => s.url && s.width);
        if (!available.length) continue;
        available.sort((a, b) => b.width - a.width || Number(a.type === 'WEBP') - Number(b.type === 'WEBP'));
        const full = available[0];
        const preview = available.filter(s => s.width <= 1400).sort((a, b) => b.width - a.width)[0] || full;
        const original = await saveImage(full, directory, `${++index}-full`);
        const src = full.url === preview.url ? original : await saveImage(preview, directory, `${index}-view`);
        images.push({ src, original, width: full.width, height: full.height || Math.round(full.width * item.height / item.width), source: full.url });
      }
      if (images.length) groups.push(images);
      else if (!['TextModule', 'SpacerModule', 'MediaCollectionModule'].includes(module.__typename)) otherMedia.push(module.__typename);
    }
    if (!groups.length) throw new Error('No images recovered');
    manifest[id] = { title: project.title, category: project.category, url: project.url, groups, otherMedia };
    console.log(`${project.title}: ${index} images; other media: ${otherMedia.join(', ') || 'none'}`);
  } catch (error) {
    console.error(`${project.title}: ${error.message}`);
    process.exitCode = 1;
  }
}
let next = 0;
await Promise.all(Array.from({ length: 3 }, async () => {
  while (next < projects.length) await importProject(projects[next++]);
}));
await mkdir('src/assets/work-gallery', { recursive: true });
await writeFile('src/assets/work-gallery/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Recovered ${Object.keys(manifest).length}/${projects.length} projects`);

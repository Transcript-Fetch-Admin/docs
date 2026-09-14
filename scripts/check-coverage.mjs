import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (file) => readFileSync(file, 'utf8');
const coverage = JSON.parse(read('migration-coverage.json'));
const config = JSON.parse(read('docs.json'));
const paths = [];
function visit(node) {
  if (typeof node === 'string') paths.push(node);
  else if (Array.isArray(node)) node.forEach(visit);
  else if (node && typeof node === 'object') {
    for (const key of ['tabs', 'groups', 'pages']) if (node[key]) visit(node[key]);
  }
}
visit(config.navigation);
for (const path of paths) assert(existsSync(`${path}.mdx`), `Missing navigation page: ${path}`);
assert.equal(new Set(paths).size, paths.length, 'Duplicate navigation pages');
for (const entry of coverage.routes) assert(existsSync(`${entry.target}.mdx`), `Missing copied page: ${entry.target}`);
for (const version of [1, 2]) {
  assert.equal(coverage.routes.filter(e => e.version === version && /^\/docs\/errors\/[^/]+$/.test(e.source)).length, 33);
  const spec = JSON.parse(read(version === 1 ? 'openapi-v1.json' : 'openapi.json'));
  const operations = Object.values(spec.paths).flatMap(item => Object.keys(item).filter(m => /^(get|post|put|patch|delete)$/.test(m)));
  assert.equal(operations.length, 8);
  assert.equal(coverage.routes.filter(e => e.version === version && e.operation).length, operations.length);
}
const bodies = new Map(paths.map(path => [path, read(`${path}.mdx`)]));
const errors = [];
for (const [path, source] of bodies) {
  const prose = source.replace(/```[\s\S]*?```/g, '');
  assert(!/\{\{(?:block:|api_base|free_credits)/.test(prose), `Unresolved placeholder: ${path}`);
  for (const m of prose.matchAll(/\]\(\/([^\s)]*)\)|href="\/([^"]*)"/g)) {
    const [target, anchor] = (m[1] ?? m[2]).split('#');
    if (!bodies.has(target)) { errors.push(`${path}: missing /${target}`); continue; }
    if (anchor && !bodies.get(target).includes(`id="${anchor}"`)) errors.push(`${path}: missing /${target}#${anchor}`);
  }
}
assert.deepEqual(errors, [], errors.join('\n'));
assert.equal(config.seo.metatags.robots, 'noindex, nofollow');
assert.equal(config.api.playground.display, 'simple');
assert.equal(config.logo, '/logo/transcriptfetch.png');
if (process.argv[2]) {
  const originals = JSON.parse(read(process.argv[2]));
  for (const original of originals) {
    const match = coverage.routes.find(e => e.source === original.route && e.version === original.version);
    assert(match, `Unmapped source: ${original.route} v${original.version}`);
    const body = bodies.get(match.target);
    for (const code of original.codeSamples) assert(body.includes(code.trim()), `Changed code sample: ${match.target}`);
    for (const heading of original.headings) {
      const plain = body.replaceAll('&amp;', '&').replaceAll('&#123;', '{').replaceAll('&#125;', '}').replace(/[`*]/g, '');
      assert(plain.includes(heading), `Missing heading: ${match.target}: ${heading}`);
    }
  }
}
console.log(`PASS: ${paths.length} pages, 66 versioned error guides, 16 API operations, local links/anchors, brand and trial safeguards.`);

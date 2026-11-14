import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const SERVERS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers');
const folders: string[] = [];
const clients: Client[] = [];

function folder(prefix: string, files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), prefix));

  folders.push(root);
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

let withProfile: Client;
let plain: Client;

before(() => {
  const base = folder('base-', { 'VERSION': '0.2.0\n' });
  const profiled = folder('project-', {
    '.agents/profile.json': JSON.stringify({
      profile: 'angular-app',
      subject: 'Invented demo app',
      baseVersion: '0.2.0',
      checks: {
        format: 'npm run format',
        lint: 'npm run lint',
      },
    }),
    'package.json': JSON.stringify({ dependencies: { '@angular/core': '^22.2.0' } }),
  });
  const bare = folder('plain-', { 'package.json': JSON.stringify({ devDependencies: { typescript: '6.0.3' } }) });

  withProfile = startServer(join(SERVERS, 'project.ts'), {
    BASE_ROOT: base,
    PROJECT_ROOT: profiled,
  });
  plain = startServer(join(SERVERS, 'project.ts'), {
    BASE_ROOT: base,
    PROJECT_ROOT: bare,
  });
  clients.push(withProfile, plain);
});
after(() => {
  clients.forEach((client) => client.close());
  for (const root of folders) {
    rmSync(root, {
      recursive: true,
      force: true,
    });
  }
});
describe('the project server', () => {
  it('gives the profile, the versions and the check commands of a project that chose strict lint', async () => {
    const result = await withProfile.call('info', {});

    assert.match(result.text, /Strict format and lint: angular-app/);
    assert.match(result.text, /@angular\/core \^22\.2\.0/);
    assert.match(result.text, /- format: `npm run format`\n- lint: `npm run lint`/);
  });
  it('works on a project without profile, and sends it to its own scripts', async () => {
    const result = await plain.call('info', {});

    assert.match(result.text, /Strict format and lint: none\. They are optional/);
    assert.match(result.text, /typescript 6\.0\.3/);
    assert.match(result.text, /use the scripts of package\.json/);
    assert.doesNotMatch(result.text, /welcome|Agents for the tasks/);
  });
});

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
const SHEET = '---\nid: typescript-eslint--no-floating-promises\nrule: "@typescript-eslint/no-floating-promises"\n---\n# no-floating-promises\n\n## Wrong\n\n```ts\nsave();\n```\n\n## Right\n\n```ts\nawait save();\n```\n';
const BASE: Record<string, string> = {
  'docs/practices/typescript-eslint--no-floating-promises.md': SHEET,
  'library/typescript-eslint/no-floating-promises.md': '# no-floating-promises\n\nOfficial page.\n',
  'library/unicorn/prefer-at.md': '# prefer-at\n\nPrefer .at() for index access from the end.\n',
  'skills/common/write-store/SKILL.md': '---\nname: write-store\ndescription: Use when you write a NgRx Signals store.\n---\n\n# Write a store\n\n1. Base steps.\n',
  'skills/angular/write-component/SKILL.md': '---\nname: write-component\ndescription: Use when you write an Angular component.\n---\n\n# Write a component\n',
  'skills/typescript/write-function/SKILL.md': '---\nname: write-function\ndescription: Use when you write a function of a library.\n---\n\n# Write a function\n',
  'skills/groups.json': JSON.stringify({
    common: [
      'angular-app',
      'ts-lib',
    ],
    angular: ['angular-app'],
    typescript: [
      'angular-app',
      'ts-lib',
    ],
  }),
};
const PROJECT: Record<string, string> = {
  '.agents/profile.json': JSON.stringify({ profile: 'ts-lib' }),
  '.agents/skills/write-store/SKILL.md': '---\nname: write-store\ndescription: Use when you write a store of this project.\n---\n\n# Write a store here\n\n1. Project steps.\n',
};

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

function start(name: string): Client {
  const env = {
    BASE_ROOT: folder('base-', BASE),
    PROJECT_ROOT: folder('project-', PROJECT),
  };
  const client = startServer(join(SERVERS, `${name}.ts`), env);

  clients.push(client);
  return client;
}

let practices: Client;
let skills: Client;

before(() => {
  practices = start('practices');
  skills = start('skills');
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
describe('the practices server', () => {
  it('gives the sheet of a rule by its id, with a wrong and a right example', async () => {
    const result = await practices.call('rule', { rule: '@typescript-eslint/no-floating-promises' });

    assert.equal(result.isError, false);
    assert.match(result.text, /## Wrong[\s\S]*## Right/);
    assert.match(result.text, /Official page: library\/typescript-eslint\/no-floating-promises\.md/);
  });
  it('falls back on the official page of a rule without a sheet', async () => {
    const result = await practices.call('rule', { rule: 'unicorn/prefer-at' });

    assert.match(result.text, /Prefer \.at\(\)/);
  });
  it('says so for an unknown rule', async () => {
    const result = await practices.call('rule', { rule: 'made-up/rule' });

    assert.equal(result.isError, true);
  });
});
describe('the skills server', () => {
  it('lists the skills of the profile only, the project skill replacing the common one', async () => {
    const result = await skills.call('list_skills', {});

    assert.equal(result.text, [
      'write-function (group typescript): Use when you write a function of a library.',
      'write-store (project): Use when you write a store of this project.',
    ].join('\n'));
    assert.doesNotMatch(result.text, /write-component/);
  });
  it('loads one skill without its header', async () => {
    const result = await skills.call('load_skill', { name: 'write-store' });

    assert.equal(result.text, '# Write a store here\n\n1. Project steps.');
  });
});

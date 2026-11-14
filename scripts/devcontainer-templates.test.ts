import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseJsonc } from './lib/jsonc.ts';
import {
  evaluate,
  type RuleConfig,
} from './lib/opencode-rules.ts';

interface DevContainer {
  image: string;
  mounts: string[];
  postCreateCommand: string;
  remoteEnv?: Record<string, string>;
  runArgs?: string[];
}

const TEMPLATES = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'templates', 'devcontainer');

function read(name: string): DevContainer {
  return parseJsonc(readFileSync(join(TEMPLATES, name, 'devcontainer.json'), 'utf8')) as DevContainer;
}

function mountTo(container: DevContainer, target: string): string | undefined {
  return container.mounts.find((mount) => mount.includes(`target=${target},`) || mount.endsWith(`target=${target}`));
}

describe('the two test dev containers', () => {
  const withBase = read('with-base');
  const withoutBase = read('without-base');

  it('mount the base read-only where its rules, servers and OpenCode config expect it', () => {
    assert.match(mountTo(withBase, '/opt/local-ai-base') ?? '', /source=\$\{localWorkspaceFolder\}\/\.\.\/local-ai-base,.*readonly$/);
    assert.match(mountTo(withBase, '/etc/opencode') ?? '', /source=\$\{localWorkspaceFolder\}\/\.\.\/local-ai-base\/opencode,.*readonly$/);
  });
  it('give nothing of the base to the project without it', () => {
    assert.equal(withoutBase.mounts.some((mount) => mount.includes('local-ai-base')), false);
    assert.equal(mountTo(withoutBase, '/etc/opencode'), undefined);
  });
  it('share the image, the OpenCode version, the setup and the model configuration', () => {
    assert.equal(withBase.image, 'mcr.microsoft.com/devcontainers/javascript-node:26');
    assert.equal(withoutBase.image, withBase.image);
    assert.equal(withoutBase.postCreateCommand, withBase.postCreateCommand);
    assert.equal(mountTo(withoutBase, '/home/node/.config/opencode'), mountTo(withBase, '/home/node/.config/opencode'));
  });
  it('install OpenCode 2.2.7 in the project, pinned, with its postinstall, never globally', () => {
    assert.match(withBase.postCreateCommand, /npm install --save-dev --save-exact .*@opencode\/cli@2\.2\.7/);
    assert.match(withBase.postCreateCommand, /node node_modules\/@opencode\/cli\/postinstall\.mjs/);
    assert.match(withBase.postCreateCommand, /npm pkg set scripts\.opencode=opencode/);
    assert.doesNotMatch(withBase.postCreateCommand, /--global/);
  });
  it('read the model keys from the same ai.env beside the projects, and pass the same web lock', () => {
    assert.deepEqual(withBase.runArgs, [
      '--env-file',
      [
        '$',
        '{localWorkspaceFolder}/../ai.env',
      ].join(''),
    ]);
    assert.deepEqual(withoutBase.runArgs, withBase.runArgs);
    assert.equal(withBase.remoteEnv?.['ANTHROPIC_API_KEY'], undefined);
    assert.deepEqual(withoutBase.remoteEnv, withBase.remoteEnv);
    assert.match(readFileSync(join(TEMPLATES, 'ai.env'), 'utf8'), /^ANTHROPIC_API_KEY=$/m);
  });
  it('lock the web in each container: no search tool, no fetch, no download, no shared session', () => {
    const lock = JSON.parse(withBase.remoteEnv?.['OPENCODE_CONFIG_CONTENT'] ?? '{}') as RuleConfig & {
      websearch?: boolean;
      share?: string;
    };

    assert.equal(lock.websearch, false);
    assert.equal(lock.share, 'disabled');
    assert.ok(lock.policies?.some((policy) => policy.action === 'websearch.use' && policy.resource === '*' && policy.effect === 'deny'));
    assert.equal(evaluate(lock, 'webfetch', 'https://example.test'), 'deny');
    assert.equal(evaluate(lock, 'websearch', 'angular signals'), 'deny');
    assert.equal(evaluate(lock, 'shell', 'curl https://example.test'), 'deny');
    assert.equal(evaluate(lock, 'shell', 'wget https://example.test'), 'deny');
    assert.equal(evaluate(lock, 'shell', 'git clone https://example.test/a.git'), 'deny');
  });
  it('switch OpenCode updates off in the shared user configuration', () => {
    const config = parseJsonc(readFileSync(join(TEMPLATES, 'opencode-user', 'opencode.jsonc'), 'utf8')) as Record<string, unknown>;

    assert.equal(config['update'], 'disable');
  });
  it('give both projects the same rights as the global base: the web refused, the rest allowed or asked', () => {
    const user = parseJsonc(readFileSync(join(TEMPLATES, 'opencode-user', 'opencode.jsonc'), 'utf8')) as RuleConfig;
    const base = parseJsonc(readFileSync(join(TEMPLATES, '..', '..', 'opencode', 'opencode.jsonc'), 'utf8')) as RuleConfig;
    const calls: [string, string][] = [
      ['webfetch', 'https://example.test'],
      ['websearch', 'angular signals'],
      ['shell', 'curl https://example.test'],
      ['shell', 'git clone https://example.test/a.git'],
      ['shell', 'npm install storybook'],
      ['shell', 'rm -rf src'],
      ['shell', 'npm run lint'],
      ['shell', 'cd src && ls'],
      ['read', 'design/screens.xd'],
    ];

    for (const [
      action,
      resource,
    ] of calls) {
      assert.equal(evaluate(user, action, resource), evaluate(base, action, resource), `${action} ${resource}`);
    }
    assert.equal(evaluate(user, 'webfetch', 'https://example.test'), 'deny');
    assert.equal(evaluate(user, 'shell', 'cd src && ls'), 'allow');
  });
});

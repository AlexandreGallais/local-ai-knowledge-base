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

interface DevContainer {
  image: string;
  mounts: string[];
  postCreateCommand: string;
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
    assert.match(withBase.postCreateCommand, /@opencode\/cli@2\.2\.7/);
    assert.equal(mountTo(withoutBase, '/home/node/.config/opencode'), mountTo(withBase, '/home/node/.config/opencode'));
  });
  it('switch OpenCode updates off in the shared user configuration', () => {
    const config = parseJsonc(readFileSync(join(TEMPLATES, 'opencode-user', 'opencode.jsonc'), 'utf8')) as Record<string, unknown>;

    assert.equal(config['update'], 'disable');
  });
});

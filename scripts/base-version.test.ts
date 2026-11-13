import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  checkBaseVersion,
  compareVersions,
} from '../global/tools/base-version.ts';

const folders: string[] = [];

function folder(): string {
  const path = mkdtempSync(join(tmpdir(), 'base-version-'));

  folders.push(path);
  return path;
}

function base(version: string): string {
  const path = folder();

  writeFileSync(join(path, 'VERSION'), `${version}\n`);
  return path;
}

function project(baseVersion?: string): string {
  const path = folder();

  if (baseVersion !== undefined) {
    mkdirSync(join(path, '.agents'));
    writeFileSync(join(path, '.agents', 'profile.json'), JSON.stringify({ baseVersion }));
  }
  return path;
}

after(() => {
  for (const path of folders) {
    rmSync(path, {
      recursive: true,
      force: true,
    });
  }
});
describe('compareVersions', () => {
  it('compares numbers, not text', () => {
    assert.ok(compareVersions('0.10.0', '0.9.0') > 0);
    assert.ok(compareVersions('0.2.0', '0.3.0') < 0);
    assert.equal(compareVersions('0.2', '0.2.0'), 0);
  });
});
describe('checkBaseVersion', () => {
  it('reports a missing global base', () => {
    const result = checkBaseVersion(join(folder(), 'nowhere'), project('0.2.0'));

    assert.equal(result.ok, false);
    assert.match(result.message, /^The global base is not installed/);
  });
  it('reports a global base older than the one the project expects', () => {
    const result = checkBaseVersion(base('0.2.0'), project('0.3.0'));

    assert.equal(result.ok, false);
    assert.equal(result.message, 'The global base is 0.2.0; this project expects 0.3.0 or later. Tell the user to update the global base before you work.');
  });
  it('accepts an equal or newer global base', () => {
    assert.equal(checkBaseVersion(base('0.2.0'), project('0.2.0')).ok, true);
    assert.equal(checkBaseVersion(base('0.3.1'), project('0.2.0')).ok, true);
  });
  it('sends a project without a profile to the welcome skill', () => {
    const result = checkBaseVersion(base('0.2.0'), project());

    assert.equal(result.ok, true);
    assert.match(result.message, /load the skill welcome first/);
  });
});

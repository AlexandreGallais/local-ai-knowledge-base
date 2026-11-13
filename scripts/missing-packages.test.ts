// The packages of a profile that a project lacks, and the install command given to the user.
import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  installAdvice,
  missingPackages,
  profilePackages,
} from '../global/tools/missing-packages.ts';

const BASE = join(dirname(fileURLToPath(import.meta.url)), '..', 'global');
const TABLE = readFileSync(join(BASE, 'packages.md'), 'utf8');

function project(profile: string, installed: string[]): string {
  const folder = mkdtempSync(join(tmpdir(), 'packages-'));

  mkdirSync(join(folder, '.agents'), { recursive: true });
  writeFileSync(join(folder, '.agents', 'profile.json'), JSON.stringify({ profile }));
  for (const name of installed) {
    mkdirSync(join(folder, 'node_modules', name), { recursive: true });
    writeFileSync(join(folder, 'node_modules', name, 'package.json'), '{}');
  }
  return folder;
}

describe('the packages of a profile', () => {
  it('reads the table of packages.md: every profile, and the packages of its own', () => {
    const tsLib = profilePackages(TABLE, 'ts-lib').map((item) => item.name);

    assert.ok(tsLib.includes('eslint'));
    assert.ok(tsLib.includes('vitest'));
    assert.ok(tsLib.includes('eslint-plugin-jsdoc'));
    assert.equal(tsLib.includes('angular-eslint'), false);
    assert.ok(profilePackages(TABLE, 'angular-app').some((item) => item.name === '@angular/cli' && item.version === '22.2.6'));
  });
  it('lists the packages a project lacks, and gives the one command that installs them', () => {
    const folder = project('ts-pure-lib', [
      'eslint',
      'typescript',
    ]);
    const missing = missingPackages(BASE, folder);
    const advice = installAdvice(missing);

    assert.equal(missing.some((item) => item.name === 'eslint'), false);
    assert.ok(missing.some((item) => item.name === 'eslint-plugin-functional'));
    assert.match(advice, /^npm install --save-dev .*eslint-plugin-functional@10\.0\.1/m);
    assert.doesNotMatch(advice, / eslint@/);
  });
  it('says so when every package is installed', () => {
    const names = profilePackages(TABLE, 'ts-lib').map((item) => item.name);

    assert.deepEqual(missingPackages(BASE, project('ts-lib', names)), []);
    assert.equal(installAdvice([]), 'Every package of the profile is installed.');
  });
});

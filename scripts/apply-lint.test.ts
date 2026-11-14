// The strict format and lint of the base, applied to a project only when the user asks for them:
// the profile file, the lint configs of the profile, and nothing else; run again, it keeps what the
// team changed.
import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
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
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { applyLint } from '../global/tools/apply-lint.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const folders: string[] = [];

function temporary(prefix: string): string {
  const folder = mkdtempSync(join(tmpdir(), prefix));

  folders.push(folder);
  return folder;
}

// A copy of a sample without its .agents/ folder: the project before the strict lint.
function sampleCopy(sample: string): string {
  const folder = temporary(`${sample}-`);

  cpSync(join(ROOT, 'samples', sample), folder, {
    recursive: true,
    filter: (source) => !source.includes(`${sample}/.agents`) && !source.includes('node_modules'),
  });
  return folder;
}

function readProfile(project: string): {
  profile: string;
  checks: Record<string, string>;
} {
  return JSON.parse(readFileSync(join(project, '.agents', 'profile.json'), 'utf8')) as {
    profile: string;
    checks: Record<string, string>;
  };
}

after(() => {
  for (const folder of folders) {
    rmSync(folder, {
      recursive: true,
      force: true,
    });
  }
});
describe('the strict format and lint of a project', () => {
  it('writes the profile and the lint configs of the profile, and no OpenCode config', () => {
    const project = sampleCopy('ts-lib');
    const written = applyLint(project, {
      profile: 'ts-lib',
      copyright: 'Copyright (c) 2026 Example Corp.',
    });

    assert.deepEqual(written, [
      '.agents/profile.json',
      '.agents/lint/',
    ]);
    assert.equal(readProfile(project).profile, 'ts-lib');
    assert.equal(readProfile(project).checks['test'], 'npx --no -- vitest run');
    assert.match(readFileSync(join(project, '.agents', 'lint', 'lint.config.mjs'), 'utf8'), /lintConfig\('ts-lib'/);
    assert.equal(existsSync(join(project, '.opencode')), false);
  });
  it('gives an empty project of an Angular profile the test command of Angular', () => {
    const project = temporary('empty-angular-');

    applyLint(project, { profile: 'angular-app' });
    assert.equal(readProfile(project).checks['test'], 'npx --no -- ng test --watch=false');
  });
  it('refuses an unknown profile', () => {
    assert.throws(() => applyLint(temporary('unknown-'), { profile: 'rust-app' }), /Unknown lint profile "rust-app"/);
  });
  it('keeps AGENTS.md, the project skills and the check commands of the team when run again', () => {
    const project = sampleCopy('angular-app');
    const agents = '# AGENTS.md\n\n- Alarms are numbered by tens.\n';

    writeFileSync(join(project, 'AGENTS.md'), agents);
    applyLint(project, { profile: 'angular-app' });
    const profile = readProfile(project);

    profile.checks['test'] = 'npm run test:ci';
    writeFileSync(join(project, '.agents', 'profile.json'), JSON.stringify(profile));
    applyLint(project, { profile: 'angular-app' });
    assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), agents);
    assert.equal(readProfile(project).checks['test'], 'npm run test:ci');
  });
});

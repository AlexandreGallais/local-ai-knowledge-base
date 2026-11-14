// The welcome of a project: the detection guesses its kind, versions, test runner and copyright; the
// profile the user confirmed is applied; running it again keeps what the team wrote.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  mkdirSync,
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
import { allowedForProfile } from '../global/servers/lib/base.ts';
import {
  applyProfile,
  projectConfig,
} from '../global/tools/apply-profile.ts';
import { detectProject } from '../global/tools/detect-project.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GLOBAL = join(ROOT, 'global');
const folders: string[] = [];

function temporary(prefix: string): string {
  const folder = mkdtempSync(join(tmpdir(), prefix));

  folders.push(folder);
  return folder;
}

// A copy of a sample without its .agents/ folder: the project as the team has it before the welcome.
function sampleCopy(sample: string): string {
  const folder = temporary(`${sample}-`);

  cpSync(join(ROOT, 'samples', sample), folder, {
    recursive: true,
    filter: (source) => !source.includes(`${sample}/.agents`) && !source.includes('node_modules'),
  });
  return folder;
}

after(() => {
  for (const folder of folders) {
    rmSync(folder, {
      recursive: true,
      force: true,
    });
  }
});
describe('the detection of a project', () => {
  it('guesses the kind of each of the four samples and of an empty folder', () => {
    assert.equal(detectProject(sampleCopy('angular-app')).kind, 'angular-app');
    assert.equal(detectProject(sampleCopy('angular-lib')).kind, 'angular-lib');
    assert.equal(detectProject(sampleCopy('ts-lib')).kind, 'ts-lib');
    assert.equal(detectProject(sampleCopy('ts-pure-lib')).kind, 'ts-pure-lib');
    assert.equal(detectProject(temporary('empty-')).kind, 'empty');
  });
  it('sees a folder whose package.json only runs OpenCode as empty, and one with another package as not front-end', () => {
    const assistant = temporary('assistant-');
    const other = temporary('other-');

    writeFileSync(join(assistant, 'package.json'), JSON.stringify({
      devDependencies: { '@opencode/cli': '2.2.7' },
      scripts: { opencode: 'opencode' },
    }));
    writeFileSync(join(assistant, 'package-lock.json'), '{}');
    writeFileSync(join(other, 'package.json'), JSON.stringify({
      devDependencies: {
        '@opencode/cli': '2.2.7',
        'left-pad': '1.3.0',
      },
    }));
    assert.equal(detectProject(assistant).kind, 'empty');
    assert.equal(detectProject(other).kind, 'not-front');
  });
  it('reads the versions, the package manager and the test runner', () => {
    const app = detectProject(sampleCopy('angular-app'));
    const library = detectProject(sampleCopy('ts-lib'));

    assert.equal(app.versions['@angular/core'], '22.2.6');
    assert.equal(app.testRunner, 'ng test (vitest)');
    assert.equal(app.packageManager, 'npm');
    assert.equal(library.testRunner, 'vitest');
    assert.equal(library.versions['typescript'], '6.0.3');
  });
  it('finds the copyright header shared by the source files, and the file naming', () => {
    const library = detectProject(sampleCopy('ts-lib'));

    assert.equal(library.copyright, 'Copyright (c) 2026 Example Corp.');
    assert.equal(library.fileNaming, 'kebab-case');
  });
  it('refuses a project that is not front-end, with a clear message', () => {
    const folder = temporary('rust-');

    writeFileSync(join(folder, 'Cargo.toml'), '[package]\nname = "demo"\n');
    const result = spawnSync(
      process.execPath,
      [
        join(GLOBAL, 'tools', 'detect-project.ts'),
        folder,
      ],
      { encoding: 'utf8' },
    );

    assert.equal(detectProject(folder).kind, 'not-front');
    assert.match(result.stdout, /Kind: not-front \(Cargo\.toml: not a front-end project\)/);
    assert.match(result.stdout, /serves Angular and TypeScript front-end projects only\. Stop the welcome here\./);
  });
});
describe('the profile of a project', () => {
  it('opens no Angular skill, document or agent to a TypeScript library', () => {
    const config = projectConfig('ts-lib', GLOBAL);
    const allowed = allowedForProfile(GLOBAL, 'ts-lib');

    assert.deepEqual(config['skills'], ['/opt/local-ai-base/skills/typescript']);
    assert.deepEqual(
      Object
        .keys(config['agents'] as object)
        .sort(),
      [
        'component',
        'html-css',
        'service',
        'store',
      ],
    );
    assert.equal(allowed('docs', 'angular'), false);
    assert.equal(allowed('docs', 'ngrx-signals'), false);
    assert.equal(allowed('docs', 'typescript'), true);
  });
  it('writes the profile, the lint configs of the profile and the project config, out of Git', () => {
    const project = sampleCopy('ts-lib');

    mkdirSync(join(project, '.git', 'info'), { recursive: true });
    applyProfile(project, {
      profile: 'ts-lib',
      subject: 'Invented sample: pressure display helpers',
      copyright: 'Copyright (c) 2026 Example Corp.',
    });
    const profile = JSON.parse(readFileSync(join(project, '.agents', 'profile.json'), 'utf8')) as Record<string, unknown>;

    assert.equal(profile['profile'], 'ts-lib');
    assert.equal((profile['checks'] as Record<string, string>)['test'], 'npx --no -- vitest run');
    assert.match(readFileSync(join(project, '.agents', 'lint', 'lint.config.mjs'), 'utf8'), /lintConfig\('ts-lib'/);
    assert.match(readFileSync(join(project, '.opencode', 'opencode.json'), 'utf8'), /skills\/typescript/);
    assert.match(readFileSync(join(project, '.git', 'info', 'exclude'), 'utf8'), /^\.opencode\/$/m);
  });
  it('gives an empty project of an Angular profile the test command of Angular', () => {
    const project = temporary('empty-angular-');

    applyProfile(project, {
      profile: 'angular-app',
      subject: 'Invented sample: a new panel',
    });
    const profile = JSON.parse(readFileSync(join(project, '.agents', 'profile.json'), 'utf8')) as { checks: Record<string, string> };

    assert.equal(profile.checks['test'], 'npx --no -- ng test --watch=false');
  });
  it('keeps AGENTS.md, the project skills and the check commands of the team when run again', () => {
    const project = sampleCopy('angular-app');
    const skill = join(project, '.agents', 'skills', 'number-alarms', 'SKILL.md');

    cpSync(join(ROOT, 'project', 'AGENTS.md'), join(project, 'AGENTS.md'));
    applyProfile(project, {
      profile: 'angular-app',
      subject: 'Invented sample: a list of users',
      conventions: ['File names are in kebab-case.'],
    });
    const filled = readFileSync(join(project, 'AGENTS.md'), 'utf8');

    assert.match(filled, /- Subject: Invented sample: a list of users/);
    assert.match(filled, /- File names are in kebab-case\./);
    const teamAgents = `${filled}- Alarms are numbered by tens.\n`;
    const profilePath = join(project, '.agents', 'profile.json');
    const profile = JSON.parse(readFileSync(profilePath, 'utf8')) as { checks: Record<string, string> };

    writeFileSync(join(project, 'AGENTS.md'), teamAgents);
    mkdirSync(dirname(skill), { recursive: true });
    writeFileSync(skill, '---\nname: number-alarms\n---\n');
    profile.checks['test'] = 'npm run test:ci';
    writeFileSync(profilePath, JSON.stringify(profile));
    applyProfile(project, {
      profile: 'angular-app',
      subject: 'Invented sample: another subject',
    });
    assert.equal(readFileSync(join(project, 'AGENTS.md'), 'utf8'), teamAgents);
    assert.equal(readFileSync(skill, 'utf8'), '---\nname: number-alarms\n---\n');
    assert.equal((JSON.parse(readFileSync(profilePath, 'utf8')) as { checks: Record<string, string> }).checks['test'], 'npm run test:ci');
  });
});

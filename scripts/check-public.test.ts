// Tests of scripts/check-public.ts on small Git repositories built for the test.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
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
  describe,
  it,
} from 'node:test';
import {
  checkPublic,
  readTerms,
} from './check-public.ts';

const TERMS = [
  'acme marine',
  'blue harbour quota',
];

function run(root: string, args: string[]): void {
  const result = spawnSync(
    'git',
    [
      '-c',
      'user.name=test',
      '-c',
      'user.email=test',
      '-c',
      'commit.gpgsign=false',
      ...args,
    ],
    {
      cwd: root,
      encoding: 'utf8',
    },
  );

  assert.equal(result.status, 0, result.stderr);
}

function repository(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'public-'));

  run(root, [
    'init',
    '-q',
    '-b',
    'main',
  ]);
  commit(root, files, 'docs: add the base');
  return root;
}

function commit(root: string, files: Record<string, string>, message: string): void {
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  run(root, [
    'add',
    '-A',
  ]);
  run(root, [
    'commit',
    '-q',
    '-m',
    message,
  ]);
}

function messages(root: string): string {
  return checkPublic(root, TERMS)
    .map((item) => `${item.where}: ${item.message}`)
    .join('\n');
}

describe('public repository check', () => {
  it('passes on a clean repository', () => {
    assert.equal(messages(repository({ 'README.md': '# Base\n' })), '');
  });
  it('refuses a file of the private specification', () => {
    assert.match(messages(repository({ 'spec/cadrage.md': '# Scope\n' })), /spec\/cadrage\.md: file of the private specification/);
  });
  it('refuses a research report tracked by Git', () => {
    assert.match(messages(repository({ 't3-some-research/rapport.md': '# Report\n' })), /t3-some-research\/rapport\.md: research report/);
    assert.match(messages(repository({ 'research/t3-some-research/rapport.md': '# Report\n' })), /research\/t3-some-research\/rapport\.md: research report/);
  });
  it('accepts the .gitignore of the research folder and the trial guides', () => {
    assert.equal(messages(repository({
      'research/.gitignore': '*\n!.gitignore\n',
      'trials/README.md': '# Trials\n',
    })), '');
  });
  it('refuses a forbidden term in a file, naming the term by number only', () => {
    const result = messages(repository({ 'README.md': 'Built for Acme Marine.\n' }));

    assert.match(result, /README\.md: forbidden term #1/);
    assert.doesNotMatch(result, /acme/i);
  });
  it('refuses a forbidden term kept only in the history', () => {
    const root = repository({ 'notes.md': 'The blue harbour quota is reached.\n' });

    rmSync(join(root, 'notes.md'));
    commit(root, { 'README.md': '# Base\n' }, 'docs: remove the notes');
    assert.match(messages(root), /commit [0-9a-f]{7}: forbidden term #2/);
  });
  it('reads the terms from the environment or from a file, skipping comments', () => {
    assert.deepEqual(readTerms('one; two ;', undefined), [
      'one',
      'two',
    ]);
    const file = join(mkdtempSync(join(tmpdir(), 'terms-')), 'terms.txt');

    writeFileSync(file, '# private list\nthree\n\nfour\n');
    assert.deepEqual(readTerms(undefined, file), [
      'three',
      'four',
    ]);
  });
});

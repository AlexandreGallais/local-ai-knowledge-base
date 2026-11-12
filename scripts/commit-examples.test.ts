// Passes every example of the write-commit-message skill to commitlint with its conventional
// configuration: each "Right" example must pass, each "Wrong" example must fail.
// commitlint is installed once from the npm registry into a folder of the system's temp folder.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
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

interface Example {
  label: string;
  message: string;
}

const COMMITLINT_VERSION = '21.2.4';
const SKILL = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', '.agents', 'skills', 'write-commit-message', 'SKILL.md');
const FOLDER = join(tmpdir(), `base-commitlint-${COMMITLINT_VERSION}`);
const BINARY = join(FOLDER, 'node_modules', '.bin', 'commitlint');
const WINDOWS = process.platform === 'win32';
// An example is a line that starts with "Wrong" or "Right", a blank line, then a `text` block.
const EXAMPLE = /^((?:Wrong|Right)\b.*)\n\n```text\n([\s\S]*?)\n```$/gm;

function examples(text: string): Example[] {
  return [...text.matchAll(EXAMPLE)].map((match) => {
    return {
      label: match[1],
      message: `${match[2]}\n`,
    };
  });
}

function installCommitlint(): void {
  if (existsSync(BINARY)) {
    return;
  }
  const result = spawnSync(
    'npm',
    [
      'install',
      '--prefix',
      FOLDER,
      '--no-save',
      '--silent',
      `@commitlint/cli@${COMMITLINT_VERSION}`,
      `@commitlint/config-conventional@${COMMITLINT_VERSION}`,
    ],
    {
      encoding: 'utf8',
      shell: WINDOWS,
    },
  );

  assert.equal(result.status, 0, `npm could not install commitlint: ${result.stderr}`);
}

function commitlint(message: string): {
  passed: boolean;
  output: string;
} {
  writeFileSync(join(FOLDER, 'commitlint.config.mjs'), 'export default { extends: [\'@commitlint/config-conventional\'] };\n');
  const result = spawnSync(BINARY, [], {
    cwd: FOLDER,
    input: message,
    encoding: 'utf8',
    shell: WINDOWS,
  });

  return {
    passed: result.status === 0,
    output: result.stdout + result.stderr,
  };
}

describe('examples of the write-commit-message skill', () => {
  const found = examples(readFileSync(SKILL, 'utf8'));

  it('reads every text block of the skill as an example', () => {
    assert.equal(found.length, readFileSync(SKILL, 'utf8').split('\n```text\n').length - 1);
  });
  it('has wrong and right examples', () => {
    assert.ok(found.some((example) => example.label.startsWith('Wrong')));
    assert.ok(found.some((example) => example.label.startsWith('Right')));
  });
  it('passes commitlint with every right example and fails with every wrong one', () => {
    installCommitlint();
    for (const example of found) {
      const result = commitlint(example.message);
      const expected = example.label.startsWith('Right');

      assert.equal(result.passed, expected, `${example.label}\n${example.message}${result.output}`);
    }
  });
});

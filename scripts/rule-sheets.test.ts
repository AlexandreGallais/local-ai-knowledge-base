import assert from 'node:assert/strict';
import {
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  before,
  describe,
  it,
} from 'node:test';
import {
  installLint,
  PROFILES,
  ROOT,
  runTool,
  SAMPLES,
  SKIP,
} from './lib/samples.ts';

const SHEETS = join(ROOT, 'global', 'docs', 'practices');

interface Sheet {
  name: string;
  rule: string;
  sample: string;
  wrongFile: string;
  rightFile: string;
  wrong: string;
  right: string;
}

function field(text: string, key: string): string {
  return (new RegExp(`^${key}: (.+)$`, 'm').exec(text)?.[1] ?? '').replace(/^"(.*)"$/, '$1');
}

function code(text: string, section: string): string {
  const start = text.indexOf(`## ${section}\n`);
  const block = /```\w*\n([\s\S]*?)\n```/.exec(text.slice(start));

  return `${block?.[1] ?? ''}\n`;
}

function readSheets(): Sheet[] {
  return readdirSync(SHEETS)
    .filter((name) => name !== 'index.md')
    .map((name) => {
      const text = readFileSync(join(SHEETS, name), 'utf8');

      return {
        name,
        rule: field(text, 'rule'),
        sample: field(text, 'sample'),
        wrongFile: field(text, 'wrong-file'),
        rightFile: field(text, 'right-file'),
        wrong: code(text, 'Wrong'),
        right: code(text, 'Right'),
      };
    });
}

function lintExample(sheet: Sheet, file: string, content: string): string {
  const path = join(SAMPLES, sheet.sample, 'src', file);

  writeFileSync(path, content);
  try {
    return runTool('lint-file.ts', [path], SAMPLES).output;
  } finally {
    rmSync(path);
  }
}

before(() => {
  if (SKIP === undefined) {
    PROFILES.forEach((profile) => installLint(profile));
  }
});
describe('the rule sheets', { skip: SKIP }, () => {
  for (const sheet of readSheets()) {
    it(`${sheet.rule}: the wrong example breaks the rule, the right one does not`, () => {
      const pattern = new RegExp(` ${sheet.rule.replaceAll('/', '\\/')} `);

      assert.match(lintExample(sheet, sheet.wrongFile, sheet.wrong), pattern, sheet.name);
      assert.doesNotMatch(lintExample(sheet, sheet.rightFile, sheet.right), pattern, sheet.name);
    });
  }
});

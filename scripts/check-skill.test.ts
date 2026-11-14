// The check of a project skill, run by the AI after it saved a procedure of the user.
import assert from 'node:assert/strict';
import {
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import { checkSkillText } from '../global/tools/check-skill.ts';

const SKILLS = join(dirname(fileURLToPath(import.meta.url)), '..', 'project', '.agents', 'skills');
const SKILL = `---
name: number-alarms
description: Use when you give a number to a new alarm of a synoptic.
---

# Number an alarm

## Steps

1. Read the last alarm number in src/alarms/alarm-ids.ts.
2. Add 10 to it.

## Example

Wrong: alarm 4. Right: alarm 120 after alarm 110.

## Final check

- Is the new number 10 more than the last one?
`;

describe('the check of a project skill', () => {
  it('accepts a well-formed skill, and every skill of the project kit', () => {
    assert.deepEqual(checkSkillText('number-alarms', SKILL), []);
    for (const entry of readdirSync(SKILLS, { withFileTypes: true }).filter((item) => item.isDirectory())) {
      assert.deepEqual(checkSkillText(entry.name, readFileSync(join(SKILLS, entry.name, 'SKILL.md'), 'utf8')), [], entry.name);
    }
  });
  it('holds, flat, the skills taken from the 0.1 and the strict lint one', () => {
    const names = readdirSync(SKILLS, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name);

    for (const name of [
      'write-skill',
      'write-agents-md',
      'write-agent',
      'write-base-document',
      'write-commit-message',
      'choose-version',
      'name-branch',
      'look-up-api',
      'explain-code',
      'code-review',
      'architecture-review',
      'apply-strict-lint',
    ]) {
      assert.ok(names.includes(name), `${name} is missing`);
    }
    for (const name of names) {
      assert.ok(existsSync(join(SKILLS, name, 'SKILL.md')), `${name}: a skill folder holds its SKILL.md, no group folder`);
    }
  });
  it('refuses another folder name, a description without "Use when", a missing section and French', () => {
    const french = SKILL
      .replace('Use when you give', 'You give')
      .replace('## Final check', '## End')
      .replace('Add 10 to it.', 'Ajoute 10 pour la nouvelle alarme dans le fichier qui est dans les sources, avec une ligne.');

    assert.deepEqual(checkSkillText('alarms', french), [
      'name "number-alarms" differs from the folder "alarms"',
      'description must start with "Use when"',
      'missing ## Final check section',
      'write the skill in English',
    ]);
  });
});

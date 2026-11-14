// The check of a project skill, run by the AI after it saved a procedure of the user.
import assert from 'node:assert/strict';
import {
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

const COMMON = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'skills', 'common');
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
  it('accepts a well-formed skill, and every common skill of the base', () => {
    assert.deepEqual(checkSkillText('number-alarms', SKILL), []);
    for (const name of readdirSync(COMMON)) {
      assert.deepEqual(checkSkillText(name, readFileSync(join(COMMON, name, 'SKILL.md'), 'utf8')), [], name);
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

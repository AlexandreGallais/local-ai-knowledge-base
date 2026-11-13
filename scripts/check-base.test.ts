import assert from 'node:assert/strict';
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
  after,
  describe,
  it,
} from 'node:test';
import {
  checkBase,
  checkFormulaSections,
} from './check-base.ts';

const roots: string[] = [];
const SKILL = `---
name: write-component
description: Use when you write or change an Angular component.
---

# Write a component

## Steps

1. Read the version of Angular in package.json.

## Example

A component with one input.

## Final check

- Did the lint end with zero errors?
`;
const AGENT = `---
description: Writes one component for one task.
mode: subagent
permissions:
  - action: skill
    resource: write-component
    effect: allow
---

You write one component. Load the skill write-component first.
`;
const DOCUMENT = `---
id: signals
title: Signals
topic: angular
summary: Read and write signals.
sources: "[S1] Angular docs"
license: MIT
---

# Signals

## Read a signal

Call the signal as a function.

## Sources

- [S1] Angular, https://angular.dev
`;
const VALID: Record<string, string> = {
  'global/rules/common.md': '# Common rules\n\n1. Answer in the language of the question.\n',
  'global/opencode/opencode.jsonc': '{\n  // rules\n  "instructions": ["/opt/local-ai-base/rules/*.md"],\n}\n',
  'global/opencode/skills/write-component/SKILL.md': SKILL,
  'global/opencode/agents/component.md': AGENT,
  'global/docs/angular/index.md': '# Angular\n\n- [Signals](signals.md): Read and write signals.\n',
  'global/docs/angular/signals.md': DOCUMENT,
  'project/AGENTS.md': '# AGENTS.md\n\nRead the [signals](../global/docs/angular/signals.md#read-a-signal) document.\n',
};

function writeInto(root: string, path: string, text: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}

function makeBase(changes: Record<string, string> = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'check-base-'));
  const files = {
    ...VALID,
    ...changes,
  };

  roots.push(root);
  Object
    .entries(files)
    .forEach(([
      path,
      text,
    ]) => writeInto(root, path, text));
  return root;
}

function messages(root: string): string[] {
  return checkBase(root).findings.map((item) => item.message);
}

after(() => {
  for (const root of roots) {
    rmSync(root, {
      recursive: true,
      force: true,
    });
  }
});
describe('checkBase', () => {
  it('accepts a correct base', () => {
    const result = checkBase(makeBase());

    assert.deepEqual(result.findings, []);
    assert.ok(result.files >= 7);
  });
  it('refuses a malformed skill', () => {
    const skill = SKILL
      .replace('name: write-component', 'name: component')
      .replace('Use when you', 'When you');

    assert.deepEqual(messages(makeBase({ 'global/opencode/skills/write-component/SKILL.md': skill })), [
      'name "component" differs from the folder "write-component"',
      'description must start with "Use when"',
    ]);
  });
  it('refuses a skill without its Example and Final check sections', () => {
    const skill = SKILL
      .replace('## Example', '## Sample')
      .replace('## Final check', '## End');

    assert.deepEqual(messages(makeBase({ 'global/opencode/skills/write-component/SKILL.md': skill })), [
      'missing ## Example section',
      'missing ## Final check section',
    ]);
  });
  it('refuses an agent whose skill does not exist', () => {
    const agent = AGENT.replace('resource: write-component', 'resource: write-store');

    assert.deepEqual(messages(makeBase({ 'global/opencode/agents/component.md': agent })), ['allows the skill "write-store", which does not exist']);
  });
  it('refuses an agent that opens no skill', () => {
    const agent = AGENT.replace('action: skill', 'action: read');

    assert.deepEqual(messages(makeBase({ 'global/opencode/agents/component.md': agent })), ['the agent allows no skill: open the skill that holds its procedure']);
  });
  it('refuses an index that forgets a document', () => {
    const other = DOCUMENT.replace('id: signals', 'id: resource');

    assert.deepEqual(messages(makeBase({ 'global/docs/angular/resource.md': other })), ['the index does not list resource.md']);
  });
  it('refuses a broken internal link and a missing heading', () => {
    const kit = '# AGENTS.md\n\nSee [store](../global/docs/angular/store.md) and [read](../global/docs/angular/signals.md#write-a-signal).\n';

    assert.deepEqual(messages(makeBase({ 'project/AGENTS.md': kit })), [
      'links to a missing file: ../global/docs/angular/store.md',
      'links to a missing heading: ../global/docs/angular/signals.md#write-a-signal',
    ]);
  });
  it('refuses an instruction written in French', () => {
    const rules = '# Règles\n\n1. Réponds dans la langue de la question et ne mélange pas les langues.\n2. Lis le fichier de la tâche avant de commencer, et pas les autres fichiers du dossier.\n';

    assert.deepEqual(messages(makeBase({ 'global/rules/common.md': rules })), ['written in French; every file for the AI is in English']);
  });
  it('refuses a rule that sends the AI to the web', () => {
    const rules = '# Common rules\n\n1. Search the web when the docs do not answer.\n';

    assert.deepEqual(messages(makeBase({ 'global/rules/common.md': rules })), ['asks to use the web: 1. Search the web when the docs do not answer.']);
  });
  it('refuses an old-to-new row without its version', () => {
    const table = '\n## Old to new\n\n| Old | New | Since |\n| --- | --- | --- |\n| `mutate` | `update` | 17 |\n| `idKey` | `selectId` |  |\n';

    assert.deepEqual(messages(makeBase({ 'global/docs/angular/signals.md': `${DOCUMENT}${table}` })), ['a row of the "Since" table has no version: | `idKey` | `selectId` |  |']);
  });
  it('refuses a math section without its pitfall or its source', () => {
    const text = '# Angles\n\n## 1. Degrees\n\nFormula: rad = deg * pi / 180\n\nExample: `degreesToRadians(180)` gives `Math.PI`.\n\nSources: [S1]\n\n## 2. Normalize\n\nFormula: modulo(a, 360)\n\nExample: -90 gives 270.\n\nPitfall: 360 gives 0.\n\n## Sources\n\n- [S1] MDN.\n';

    assert.deepEqual(checkFormulaSections(text, 'angles.md').map((item) => item.message), [
      'section "1. Degrees" has no "Pitfall:" line',
      'section "2. Normalize" cites no source',
    ]);
  });
  it('refuses a config whose instructions load no file', () => {
    const config = '{ "instructions": ["/opt/local-ai-base/rules/missing.md"] }';

    assert.deepEqual(messages(makeBase({ 'global/opencode/opencode.jsonc': config })), ['instructions entry matches no file of the base: /opt/local-ai-base/rules/missing.md']);
  });
});

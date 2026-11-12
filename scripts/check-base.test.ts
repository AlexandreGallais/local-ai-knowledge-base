import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
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
  checkAgentsMd,
  checkBase,
  checkChatModel,
  checkDocument,
  checkSkill,
  findWebRequests,
  looksFrench,
} from './check-base.ts';

const NEWLINE = '\n';
const VALID_SKILL = [
  '---',
  'name: write-test',
  'description: Write a unit test for one function. Use when the user asks for a unit test.',
  'license: MIT',
  'metadata:',
  '  variant: files',
  '  version: "0.1.0"',
  '---',
  '',
  '# Write a test',
  '',
  '## Rules',
  '',
  '- Name each test after the behaviour it checks.',
  '- Never search the web. Never open a URL.',
  '',
  '## Steps',
  '',
  '1. Ask the user for the function to test.',
  '2. Produce one test per behaviour.',
  '<!-- files:begin -->',
  '3. Write the test file next to the source file.',
  '4. Run `npm test`. Fix every failure.',
  '<!-- files:end -->',
  '5. Give the list of tests.',
  '',
  '## Example',
  '',
  'Wrong: `test("works")`',
  '',
  'Right: `test("returns zero for an empty list")`',
  '',
  '## Final check',
  '',
  '- Is every test named after a behaviour?',
  '',
].join(NEWLINE);
const VALID_AGENTS = [
  '# AGENTS.md',
  '',
  '## Rules',
  '',
  '1. Answer in the language of the question.',
  '2. Never search the web. Never open a URL.',
  '',
  '## Skills',
  '',
  '- To write a unit test: load the skill `write-test`.',
  '',
  '## Index',
  '',
  '- [Strict null checks](docs/typescript/strict-null-checks.md): Rules for strictNullChecks. TS 5.9.',
  '',
  '## Final check',
  '',
  '- Is the answer in the language of the question?',
  '',
].join(NEWLINE);
const VALID_DOCUMENT = [
  '---',
  'id: typescript-strict-null-checks',
  'title: Strict null checks',
  'topic: typescript',
  'summary: Rules for strictNullChecks. TS 5.9.',
  'tool: typescript',
  'version: "5.9"',
  'checked: 2026-11-12',
  'sources: [S1]',
  'license: CC-BY-4.0, adapted from the TypeScript Handbook',
  'variant: files',
  '---',
  '',
  '# Strict null checks',
  '',
  '## 1. Rule (TypeScript strictNullChecks)',
  '',
  'Check a value for null before you use it. [S1]',
  '',
  '## Sources',
  '',
  '- [S1] Microsoft, "Everyday Types", TypeScript Handbook, https://www.typescriptlang.org/docs/, read 2026-11-12.',
  '',
].join(NEWLINE);
const VALID_CHAT_MODEL = [
  '---',
  'id: typescript-angular',
  'subject: TypeScript and Angular code',
  'knowledge: typescript, angular',
  'skills: write-test',
  'access: developers',
  '---',
  '',
  'You are the TypeScript and Angular assistant of a software team.',
  '',
  '## Rules',
  '',
  '1. Search the attached knowledge before you answer.',
  '2. Never search the web. Never open a URL.',
  '',
].join(NEWLINE);
const FRENCH_TEXT = 'Ce fichier est pour les humains. Il donne la structure de la base et le rôle de chaque dossier, avec une ligne pour chaque fichier.';

function agentsContext(overrides: Partial<Parameters<typeof checkAgentsMd>[2]> = {}): Parameters<typeof checkAgentsMd>[2] {
  return {
    skillNames: ['write-test'],
    documentPaths: ['docs/typescript/strict-null-checks.md'],
    exists: () => true,
    ...overrides,
  };
}

function messages(findings: { message: string }[]): string {
  return findings
    .map((item) => item.message)
    .join(NEWLINE);
}

function writeTree(root: string, files: Record<string, string>): void {
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
}

describe('checkSkill', () => {
  it('accepts a correct skill', () => {
    assert.deepEqual(checkSkill('write-test', VALID_SKILL, 'SKILL.md'), []);
  });
  it('refuses a name that differs from the folder', () => {
    assert.match(messages(checkSkill('other-name', VALID_SKILL, 'SKILL.md')), /differs from the folder/);
  });
  it('refuses a description without "Use when"', () => {
    const text = VALID_SKILL.replace('Use when the user asks for a unit test.', 'For tests.');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /Use when/);
  });
  it('refuses more than 150 lines', () => {
    const padding = Array
      .from({ length: 120 }, () => '- Keep each test short.')
      .join(NEWLINE);
    const text = VALID_SKILL.replace('## Steps', `${padding}${NEWLINE}${NEWLINE}## Steps`);

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /150 lines or fewer/);
  });
  it('refuses a URL to open', () => {
    const text = VALID_SKILL.replace('5. Give the list of tests.', '5. Open https://example.com/testing for details.');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /URL outside the Sources section/);
  });
  it('refuses a files block that is not closed', () => {
    const text = VALID_SKILL.replace('<!-- files:end -->', '');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /not closed/);
  });
  it('refuses an action step outside the files markers', () => {
    const text = VALID_SKILL.replace('5. Give the list of tests.', '5. Run `npm run lint`.');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /not between the files markers/);
  });
  it('refuses a colon followed by a space in an unquoted value', () => {
    const text = VALID_SKILL.replace('Write a unit test', 'Tests: write a unit test');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /breaks the YAML header/);
  });
  it('refuses a skill without Example or Final check', () => {
    const text = VALID_SKILL
      .replace('## Example', '## Notes')
      .replace('## Final check', '## End');
    const result = messages(checkSkill('write-test', text, 'SKILL.md'));

    assert.match(result, /missing ## Example/);
    assert.match(result, /missing ## Final check/);
  });
  it('refuses a skill that names a software', () => {
    const text = VALID_SKILL.replace('2. Produce one test per behaviour.', '2. Produce one test per behaviour in OpenCode.');

    assert.match(messages(checkSkill('write-test', text, 'SKILL.md')), /names a software/);
  });
});
describe('findWebRequests', () => {
  it('refuses a request to search the web', () => {
    assert.equal(findWebRequests('Search the web for the latest API.', 'a.md', false).length, 1);
  });
  it('accepts a rule that forbids the web', () => {
    assert.deepEqual(findWebRequests('Never search the web. Never open a URL.', 'a.md', false), []);
  });
  it('accepts URLs in the Sources section of a document only', () => {
    assert.deepEqual(findWebRequests(`## Sources${NEWLINE}- [S1] https://example.com`, 'a.md', true), []);
    assert.equal(findWebRequests(`## Rule${NEWLINE}See https://example.com`, 'a.md', true).length, 1);
  });
});
describe('looksFrench', () => {
  it('detects French text', () => {
    assert.equal(looksFrench(FRENCH_TEXT), true);
  });
  it('does not flag English text', () => {
    assert.equal(looksFrench('This file is for people. It gives the structure of the base and the role of each folder.'), false);
  });
});
describe('checkAgentsMd', () => {
  it('accepts a correct AGENTS.md', () => {
    assert.deepEqual(checkAgentsMd(VALID_AGENTS, 'AGENTS.md', agentsContext()), []);
  });
  it('refuses 60 lines or more outside the index', () => {
    const padding = Array
      .from({ length: 50 }, () => '')
      .join(NEWLINE);
    const text = VALID_AGENTS.replace('## Skills', `${padding}${NEWLINE}## Skills`);

    assert.match(messages(checkAgentsMd(text, 'AGENTS.md', agentsContext())), /keep fewer than 60/);
  });
  it('refuses 30 rules or more', () => {
    const rules = Array
      .from({ length: 30 }, (_, index) => `${index + 3}. Keep rule ${index}.`)
      .join(NEWLINE);
    const text = VALID_AGENTS.replace('## Skills', `${rules}${NEWLINE}${NEWLINE}## Skills`);

    assert.match(messages(checkAgentsMd(text, 'AGENTS.md', agentsContext())), /keep fewer than 30/);
  });
  it('refuses a skill without a trigger line', () => {
    const context = agentsContext({
      skillNames: [
        'write-test',
        'write-commit',
      ],
    });

    assert.match(messages(checkAgentsMd(VALID_AGENTS, 'AGENTS.md', context)), /no trigger line for the skill "write-commit"/);
  });
  it('refuses an index line that points to a missing file', () => {
    const context = agentsContext({ exists: () => false });

    assert.match(messages(checkAgentsMd(VALID_AGENTS, 'AGENTS.md', context)), /missing file/);
  });
  it('refuses a document missing from the index', () => {
    const context = agentsContext({
      documentPaths: [
        'docs/typescript/strict-null-checks.md',
        'docs/typescript/generics.md',
      ],
    });

    assert.match(messages(checkAgentsMd(VALID_AGENTS, 'AGENTS.md', context)), /missing from the index: docs\/typescript\/generics.md/);
  });
});
describe('checkDocument', () => {
  it('accepts a correct document', () => {
    assert.deepEqual(checkDocument(VALID_DOCUMENT, 'doc.md', 'typescript'), []);
  });
  it('refuses a missing header field and a missing Sources section', () => {
    const text = VALID_DOCUMENT
      .replace('tool: typescript\n', '')
      .replace('## Sources', '## References');
    const result = messages(checkDocument(text, 'doc.md', 'typescript'));

    assert.match(result, /missing header field "tool"/);
    assert.match(result, /missing ## Sources section/);
  });
});
describe('checkChatModel', () => {
  it('accepts a correct chat model', () => {
    assert.deepEqual(checkChatModel(VALID_CHAT_MODEL, 'model.md'), []);
  });
  it('refuses a first rule that does not search the knowledge', () => {
    const text = VALID_CHAT_MODEL.replace('1. Search the attached knowledge before you answer.', '1. Answer briefly.');

    assert.match(messages(checkChatModel(text, 'model.md')), /search its knowledge/);
  });
});
const HEAVY_SKILL = [
  '---',
  'name: read-big',
  'description: Read a big file through its extract. Use when a task needs a .pdf or .xd file.',
  'license: MIT',
  'metadata:',
  '  variant: files',
  '  version: "0.1.0"',
  '---',
  '',
  '# Read a big file',
  '',
  '## Heavy files',
  '',
  '- Documents and design: .pdf .xd',
  '',
  '## Steps',
  '',
  '1. Find the family of the file.',
  '<!-- files:begin id=extract -->',
  '2. Read `.agents/skills/read-big/references/formats.md`.',
  '3. Run `node .agents/skills/read-big/scripts/extract.ts "<path>"`.',
  '<!-- files:end -->',
  '4. Answer from the extract only.',
  '',
  '## Example',
  '',
  'Wrong: read `ui.xd` raw. Right: read its extract.',
  '',
  '## Final check',
  '',
  '- Did you read only the extract?',
  '',
].join(NEWLINE);
const HEAVY_CHAT = [
  '<!-- chat:begin id=extract -->',
  '2. Give the user the command for the format. Ask the user to paste its output.',
  '<!-- chat:end -->',
  '',
].join(NEWLINE);
const HEAVY_AGENTS = VALID_AGENTS
  .replace('2. Never search the web. Never open a URL.', '2. Never search the web. Never open a URL.\n3. Never read a heavy file raw.\n   Heavy files: .xd .pdf')
  .replace('- To write a unit test: load the skill `write-test`.', '- To read a heavy file: load the skill `read-big`.');

function heavyBase(overrides: Record<string, string | undefined> = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'check-base-'));
  const files: Record<string, string | undefined> = {
    'AGENTS.md': HEAVY_AGENTS,
    '.agents/skills/read-big/SKILL.md': HEAVY_SKILL,
    '.agents/skills/read-big/chat.md': HEAVY_CHAT,
    '.agents/skills/read-big/references/formats.md': VALID_DOCUMENT,
    '.agents/skills/read-big/scripts/extract.ts': 'export {};\n',
    'docs/README.fr.md': FRENCH_TEXT,
    'docs/typescript/README.fr.md': FRENCH_TEXT,
    'docs/typescript/strict-null-checks.md': VALID_DOCUMENT,
    ...overrides,
  };

  writeTree(
    root,
    Object.fromEntries(Object
      .entries(files)
      .filter((entry): entry is [string, string] => entry[1] !== undefined)),
  );
  return messages(checkBase(root).findings);
}

describe('skill references, scripts and chat.md', () => {
  it('accepts a skill with its references, its script and its chat text', () => {
    assert.equal(heavyBase(), '');
  });
  it('refuses an unexpected entry in a skill folder', () => {
    assert.match(heavyBase({ '.agents/skills/read-big/notes.txt': 'x' }), /unexpected entry/);
  });
  it('refuses a reference that SKILL.md never names', () => {
    assert.match(heavyBase({ '.agents/skills/read-big/references/other.md': VALID_DOCUMENT }), /reference not named in SKILL\.md/);
  });
  it('refuses a reference named in SKILL.md but missing', () => {
    assert.match(heavyBase({ '.agents/skills/read-big/references/formats.md': undefined }), /names a missing reference: references\/formats\.md/);
  });
  it('refuses a reference without its header or its sources', () => {
    assert.match(heavyBase({ '.agents/skills/read-big/references/formats.md': '# Formats\n\nNo header.\n' }), /missing YAML header/);
  });
  it('refuses a plain JavaScript script and a script never named', () => {
    const result = heavyBase({ '.agents/skills/read-big/scripts/helper.js': 'export {};\n' });

    assert.match(result, /plain JavaScript/);
    assert.match(heavyBase({ '.agents/skills/read-big/scripts/unused.ts': 'export {};\n' }), /script never named/);
  });
  it('refuses a chat block whose id has no files block', () => {
    const chat = HEAVY_CHAT.replace('id=extract', 'id=convert');

    assert.match(heavyBase({ '.agents/skills/read-big/chat.md': chat }), /chat block id=convert has no <!-- files:begin id=convert --> block/);
  });
  it('refuses text outside a chat block and a chat block not closed', () => {
    const chat = `Intro line.\n${HEAVY_CHAT.replace('<!-- chat:end -->', '')}`;
    const result = heavyBase({ '.agents/skills/read-big/chat.md': chat });

    assert.match(result, /text outside a chat block/);
    assert.match(result, /chat block not closed/);
  });
  it('refuses a files block id used twice', () => {
    const skill = HEAVY_SKILL.replace('4. Answer from the extract only.', '<!-- files:begin id=extract -->\n4. Run `ls`.\n<!-- files:end -->');

    assert.match(heavyBase({ '.agents/skills/read-big/SKILL.md': skill }), /files block id=extract appears twice/);
  });
});
describe('heavy file extensions', () => {
  it('refuses AGENTS.md and a skill that list different extensions', () => {
    const agents = HEAVY_AGENTS.replace('Heavy files: .xd .pdf', 'Heavy files: .xd .docx');

    assert.match(heavyBase({ 'AGENTS.md': agents }), /heavy files differ from the skill "read-big": only in the skill: \.pdf; only in AGENTS\.md: \.docx/);
  });
  it('refuses a skill that lists heavy files when AGENTS.md has no "Heavy files:" line', () => {
    const agents = HEAVY_AGENTS.replace('\n   Heavy files: .xd .pdf', '');

    assert.match(heavyBase({ 'AGENTS.md': agents }), /no "Heavy files:" line/);
  });
});
describe('checkBase', () => {
  it('accepts a small correct base', () => {
    const root = mkdtempSync(join(tmpdir(), 'check-base-'));

    writeTree(root, {
      'AGENTS.md': VALID_AGENTS,
      '.agents/skills/write-test/SKILL.md': VALID_SKILL,
      'docs/README.fr.md': FRENCH_TEXT,
      'docs/typescript/README.fr.md': FRENCH_TEXT,
      'docs/typescript/strict-null-checks.md': VALID_DOCUMENT,
    });
    assert.deepEqual(checkBase(root).findings, []);
  });
  it('refuses a topic without its French summary', () => {
    const root = mkdtempSync(join(tmpdir(), 'check-base-'));

    writeTree(root, {
      'AGENTS.md': VALID_AGENTS,
      '.agents/skills/write-test/SKILL.md': VALID_SKILL,
      'docs/README.fr.md': FRENCH_TEXT,
      'docs/typescript/strict-null-checks.md': VALID_DOCUMENT,
    });
    assert.match(messages(checkBase(root).findings), /missing French summary of the topic/);
  });
  it('passes on the base of this repository', () => {
    const base = join(dirname(fileURLToPath(import.meta.url)), '..', 'code');
    const chatModels = join(dirname(fileURLToPath(import.meta.url)), '..', 'chat', 'models');

    assert.deepEqual(checkBase(base, chatModels).findings, []);
  });
});

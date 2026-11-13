import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
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
import { importBase } from '../import.ts';
import { checkChatProfile } from './check-base.ts';
import {
  baseFiles,
  chatProfile,
  chatSkill,
  exportBase,
  openWebUiManifest,
  trialFiles,
} from './export.ts';

const NEWLINE = '\n';
const WORK = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = [
  '---',
  'name: do-thing',
  'description: Do the thing. Use when the user asks for the thing.',
  'license: MIT',
  'metadata:',
  '  variant: files',
  '  version: "0.1.0"',
  '---',
  '',
  '# Do the thing',
  '',
  '## Steps',
  '',
  '1. Ask what the thing is.',
  '<!-- files:begin id=run -->',
  '2. Run `make thing`.',
  '<!-- files:end -->',
  '<!-- files:begin -->',
  '3. Write the result to `thing.txt`.',
  '<!-- files:end -->',
  '4. Give the result.',
  '',
  '```markdown',
  '<!-- files:begin -->',
  'An example kept as it is.',
  '<!-- files:end -->',
  '```',
  '',
  '## Final check',
  '',
  '- Is the thing done?',
  '',
].join(NEWLINE);
const CHAT = [
  '<!-- chat:begin id=run -->',
  '2. Give the user the command `make thing`. Ask for its output.',
  '<!-- chat:end -->',
  '',
].join(NEWLINE);
const DOCUMENT = '---\nid: demo-doc\nvariant: files\n---\n\n# Demo\n\n## Sources\n\n- [S1] Test.\n';

function writeTree(root: string, files: Record<string, string>): void {
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
}

function testBase(extra: Record<string, string> = {}): string {
  const root = mkdtempSync(join(tmpdir(), 'export-base-'));

  writeTree(root, {
    'code/AGENTS.md': '# AGENTS.md\n',
    'code/.agents/skills/do-thing/SKILL.md': SKILL,
    'code/.agents/skills/do-thing/chat.md': CHAT,
    'code/docs/README.fr.md': 'Aperçu en français.\n',
    'code/docs/demo/README.fr.md': 'Résumé en français.\n',
    'code/docs/demo/doc.md': DOCUMENT,
    'code/docs/other/doc.md': DOCUMENT,
    'chat/models/demo.md': '---\nid: demo\nknowledge: demo\nskills: do-thing\n---\n\n# Demo\n',
    'adapters/open-webui/state.local.json': '{}',
    'scripts/check-base.ts': 'export {};\n',
    'import.ts': readFileSync(join(WORK, 'import.ts'), 'utf8'),
    'README.md': '# Base\n',
    'LICENSE': 'MIT\n',
    ...extra,
  });
  return root;
}

// Every file under root, as paths with forward slashes.
function tree(root: string): string[] {
  return readdirSync(root, {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name).slice(root.length + 1).split('\\').join('/'));
}

describe('chat variant of a skill', () => {
  const text = chatSkill(SKILL, CHAT);

  it('replaces the files block by its chat block and drops the one without chat text', () => {
    assert.doesNotMatch(text, /Run `make thing`/);
    assert.doesNotMatch(text, /thing\.txt/);
    assert.match(text, /^2\. Give the user the command `make thing`\. Ask for its output\.$/m);
    assert.match(text, /^3\. Give the result\.$/m);
  });
  it('keeps the markers of a code example and marks the variant chat', () => {
    assert.match(text, /```markdown\n<!-- files:begin -->\nAn example kept as it is\./);
    assert.match(text, /^ {2}variant: chat$/m);
  });
  it('adds the Limits block before the final check', () => {
    assert.match(text, /## Limits\n\n- You cannot read or write files\. You cannot run commands\.[\s\S]*## Final check/);
  });
});
describe('chat profile', () => {
  const files = chatProfile(testBase());
  const paths = files.map((file) => file.path);

  it('writes one chat skill, the knowledge of the subjects the models name, and the Open WebUI manifest', () => {
    assert.deepEqual(paths, [
      'chat/skills/do-thing/SKILL.md',
      'chat/knowledge/demo/doc.md',
      'adapters/open-webui/manifest.json',
    ]);
  });
  it('leaves out every French summary and marks documents as chat', () => {
    assert.ok(!paths.some((path) => path.endsWith('.fr.md')));
    assert.match(files[1].content, /^variant: chat$/m);
  });
});
describe('export and import', () => {
  it('rebuilds the same tree in an empty folder, file by file', () => {
    const root = testBase();
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const expected = [
      ...baseFiles(root),
      ...chatProfile(root),
    ];

    importBase(exportBase(root).map((part) => part), target, {
      project: false,
      force: false,
    });
    assert.deepEqual(
      tree(target).toSorted(),
      expected
        .map((file) => file.path)
        .toSorted(),
    );
    for (const file of expected) {
      assert.equal(readFileSync(join(target, file.path), 'utf8'), file.content, file.path);
    }
    assert.ok(!existsSync(join(target, 'adapters/open-webui/state.local.json')));
  });
  it('keeps each part at 500 KB by default, and at 100 KB with --max-kb 100, in more parts', () => {
    const big = Array
      .from({ length: 9000 }, (_, index) => `Line ${index} of a long document about pumps, valves and tanks.`)
      .join(NEWLINE);
    const root = testBase({
      'code/docs/demo/big-1.md': big,
      'code/docs/demo/big-2.md': big,
    });
    const normal = exportBase(root);
    const small = exportBase(root, 100);

    assert.ok(normal.every((part) => Buffer.byteLength(part.text) <= 500_000));
    assert.ok(small.every((part) => Buffer.byteLength(part.text) <= 100_000));
    assert.ok(small.length > normal.length);
    const target = mkdtempSync(join(tmpdir(), 'import-'));

    importBase(small, target, {
      project: false,
      force: false,
    });
    assert.equal(readFileSync(join(target, 'code/docs/demo/big-1.md'), 'utf8'), big);
  });
  it('accepts parts whose line ends were changed to CRLF by the copy', () => {
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const parts = exportBase(testBase()).map((part) => {
      return {
        name: part.name,
        text: part.text.replaceAll(NEWLINE, '\r\n'),
      };
    });

    assert.ok(importBase(parts, target, {
      project: false,
      force: false,
    }).length > 0);
  });
  it('writes only what a project needs with --project', () => {
    const target = mkdtempSync(join(tmpdir(), 'import-'));

    importBase(exportBase(testBase()), target, {
      project: true,
      force: false,
    });
    assert.ok(existsSync(join(target, 'AGENTS.md')));
    assert.ok(existsSync(join(target, '.agents/skills/do-thing/SKILL.md')));
    assert.ok(existsSync(join(target, 'scripts/check-base.ts')));
    assert.ok(!existsSync(join(target, 'chat')));
  });
  it('writes opencode.json at the root of a project with --opencode, and takes the adapters', () => {
    const adapter = readFileSync(join(WORK, 'adapters/opencode/v2/opencode.json'), 'utf8');
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const root = testBase({
      'adapters/opencode/v2/opencode.json': adapter,
      'adapters/mcp/docs-server.ts': 'export {};\n',
    });

    importBase(exportBase(root), target, {
      project: true,
      force: false,
      opencode: '2',
    });
    assert.equal(readFileSync(join(target, 'opencode.json'), 'utf8'), adapter);
    assert.ok(existsSync(join(target, 'adapters/mcp/docs-server.ts')));
    assert.ok(!existsSync(join(target, 'adapters/open-webui')));
    assert.throws(() => importBase(exportBase(root), mkdtempSync(join(tmpdir(), 'import-')), {
      project: true,
      force: false,
      opencode: '3',
    }), /--opencode takes 1 or 2/);
  });
});
describe('trial export', () => {
  it('adds the trial guides, samples and evaluation that Git tracks, and nothing else', () => {
    const root = testBase({
      'trials/README.md': '# Trials\n',
      'trials/f03-base.md': '# F3 trial\n',
      'f3-base/notes.md': 'Not a trial guide.\n',
      'samples/demo/app.ts': 'export {};\n',
      'samples/demo/bin/out.txt': 'build output\n',
      'evaluation/README.md': '# Evaluation\n',
    });

    spawnSync(
      'git',
      [
        'init',
        '--quiet',
      ],
      { cwd: root },
    );
    spawnSync(
      'git',
      [
        'add',
        '--',
        'trials/README.md',
        'trials/f03-base.md',
        'f3-base/notes.md',
        'samples/demo/app.ts',
        'evaluation/README.md',
      ],
      { cwd: root },
    );
    assert.deepEqual(
      trialFiles(root)
        .map((file) => file.path)
        .toSorted(),
      [
        'evaluation/README.md',
        'samples/demo/app.ts',
        'trials/README.md',
        'trials/f03-base.md',
      ],
    );
    const target = mkdtempSync(join(tmpdir(), 'import-'));

    importBase(exportBase(root, 500, true), target, {
      project: false,
      force: false,
    });
    assert.equal(readFileSync(join(target, 'trials/f03-base.md'), 'utf8'), '# F3 trial\n');
  });
});
describe('import refusals', () => {
  it('refuses a part with a changed line, names it and writes nothing', () => {
    const parts = exportBase(testBase(), 10);
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const index = parts.findIndex((part) => part.text.includes('Do the thing'));
    const damaged = parts.map((part, position) => {
      return {
        name: part.name,
        text: position === index ? part.text.replace('Do the thing', 'Do the thinq') : part.text,
      };
    });

    assert.ok(parts.length > 1 && index >= 0);
    assert.throws(() => importBase(damaged, target, {
      project: false,
      force: false,
    }), new RegExp(`base-${index + 1}\\.txt: part ${index + 1} of \\d+ was damaged by the copy`));
    assert.deepEqual(readdirSync(target), []);
  });
  it('refuses a part with a removed line, and a missing part', () => {
    const parts = exportBase(testBase(), 10);
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const shortened = parts.map((part) => {
      return {
        name: part.name,
        text: part.name === 'base-1.txt' ? part.text.replace(/\n[^\n]+\n/, NEWLINE) : part.text,
      };
    });

    assert.throws(() => importBase(shortened, target, {
      project: false,
      force: false,
    }), /base-1\.txt: part 1 of/);
    assert.throws(() => importBase(parts.slice(1), target, {
      project: false,
      force: false,
    }), /Missing parts: base-1\.txt/);
    assert.deepEqual(readdirSync(target), []);
  });
  it('refuses to replace a file that differs, unless forced', () => {
    const target = mkdtempSync(join(tmpdir(), 'import-'));

    writeTree(target, { 'README.md': 'Mine.\n' });
    assert.throws(() => importBase(exportBase(testBase()), target, {
      project: false,
      force: false,
    }), /exist and differ; nothing was written[\s\S]*README\.md/);
    assert.equal(readFileSync(join(target, 'README.md'), 'utf8'), 'Mine.\n');
  });
});

interface ManifestModel {
  id: string;
  knowledge: string[];
  skills: string[];
}

interface Manifest {
  knowledge: {
    key: string;
    dir: string;
  }[];
  skills: {
    id: string;
    description: string;
  }[];
  models: ManifestModel[];
}

describe('Open WebUI manifest', () => {
  const manifest = JSON.parse(openWebUiManifest(WORK).content) as Manifest;
  const byId = new Map(manifest.models.map((model) => [
    model.id,
    model,
  ]));

  it('gives each model of the base only its own knowledge and skills', () => {
    assert.deepEqual(byId.get('commit-assistant'), {
      ...byId.get('commit-assistant'),
      knowledge: [],
      skills: ['write-commit-message'],
    });
    assert.deepEqual(byId.get('containers-kubernetes')?.knowledge, [
      'containers',
      'kubernetes',
    ]);
    assert.deepEqual(byId.get('csharp-dotnet')?.skills, [
      'analyze-csharp',
      'look-up-api',
      'architecture-review',
      'code-review',
      'explain-code',
    ]);
    assert.equal(manifest.models.length, 5);
  });
  it('lists each knowledge base and skill that a model uses, and nothing else', () => {
    const usedKnowledge = new Set(manifest.models.flatMap((model) => model.knowledge));
    const usedSkills = new Set(manifest.models.flatMap((model) => model.skills));

    assert.deepEqual(
      manifest.knowledge
        .map((item) => item.key)
        .toSorted(),
      [...usedKnowledge].toSorted(),
    );
    assert.deepEqual(
      manifest.skills
        .map((item) => item.id)
        .toSorted(),
      [...usedSkills].toSorted(),
    );
    for (const skill of manifest.skills) {
      assert.match(skill.description, /Use when/, skill.id);
    }
  });
  it('points each knowledge base to its folder of the generated chat profile', () => {
    const paths = new Set(chatProfile(WORK).map((file) => file.path));

    for (const knowledge of manifest.knowledge) {
      assert.ok([...paths].some((path) => path.startsWith(`${knowledge.dir}/`)), knowledge.key);
    }
  });
});
describe('check of the chat profile', () => {
  it('passes on the chat profile generated from the real base', () => {
    const target = mkdtempSync(join(tmpdir(), 'chat-profile-'));

    writeTree(target, Object.fromEntries(chatProfile(WORK).map((file) => [
      file.path,
      file.content,
    ])));
    assert.deepEqual(checkChatProfile(join(target, 'chat')).findings, []);
  });
  it('refuses a chat skill with an action block left, without Limits, and a French summary', () => {
    const target = mkdtempSync(join(tmpdir(), 'chat-profile-'));

    writeTree(target, {
      'chat/skills/do-thing/SKILL.md': SKILL,
      'chat/knowledge/demo/README.fr.md': 'Résumé.\n',
    });
    const result = checkChatProfile(join(target, 'chat')).findings
      .map((item) => item.message)
      .join(NEWLINE);

    assert.match(result, /action block left in the chat variant/);
    assert.match(result, /missing ## Limits section/);
    assert.match(result, /metadata\.variant must be "chat"/);
    assert.match(result, /French summaries stay out of the chat profile/);
  });
});
describe('command line', () => {
  it('runs export.ts then import.ts from the files written on disk', () => {
    const out = mkdtempSync(join(tmpdir(), 'export-out-'));
    const target = mkdtempSync(join(tmpdir(), 'import-'));
    const exported = spawnSync(
      process.execPath,
      [
        join(WORK, 'scripts', 'export.ts'),
        '--out',
        out,
      ],
      { encoding: 'utf8' },
    );
    const imported = spawnSync(
      process.execPath,
      [
        join(out, 'import.ts'),
        '--from',
        out,
        '--to',
        target,
      ],
      { encoding: 'utf8' },
    );

    assert.equal(exported.status, 0, exported.stdout);
    assert.equal(imported.status, 0, imported.stdout);
    assert.match(imported.stdout, /Import done: \d+ files written\./);
    assert.equal(readFileSync(join(target, 'code/AGENTS.md'), 'utf8'), readFileSync(join(WORK, 'code/AGENTS.md'), 'utf8'));
  });
});

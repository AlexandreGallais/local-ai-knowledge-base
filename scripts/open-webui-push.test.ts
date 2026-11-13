// Tests of adapters/open-webui/push.ts against a fake server that imitates the API of Open WebUI 0.13.3.
import assert from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
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
import { fileURLToPath } from 'node:url';
import {
  push,
  type PushConfig,
} from '../adapters/open-webui/push.ts';
import {
  FAKE_BASE_MODEL,
  FAKE_GROUP,
  FAKE_TOKEN,
  startFakeOpenWebUi,
} from './open-webui-fake.ts';

const WORK = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = {
  mode: 'native',
  toolsBlock: 'adapters/open-webui/knowledge-tools.md',
  knowledge: [
    {
      key: 'topic-a',
      name: 'topic-a',
      description: 'Topic A.',
      dir: 'chat/knowledge/topic-a',
    },
  ],
  skills: [
    {
      id: 'write-thing',
      name: 'write-thing',
      description: 'Write a thing. Use when asked.',
      dir: 'chat/skills/write-thing',
    },
  ],
  models: [
    {
      id: 'model-a',
      name: 'Model A',
      description: 'Answers on topic A.',
      prompt: 'chat/models/model-a.md',
      knowledge: ['topic-a'],
      skills: ['write-thing'],
    },
    {
      id: 'model-b',
      name: 'Model B',
      description: 'Restricted.',
      prompt: 'chat/models/model-b.md',
      knowledge: [],
      skills: ['write-thing'],
    },
  ],
};

function write(root: string, path: string, content: string): void {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), content);
}

function profile(): string {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'push-')));

  write(root, 'adapters/open-webui/manifest.json', JSON.stringify(MANIFEST));
  write(root, 'adapters/open-webui/knowledge-tools.md', readFileSync(join(WORK, 'adapters/open-webui/knowledge-tools.md'), 'utf8'));
  write(root, 'chat/skills/write-thing/SKILL.md', '---\nname: write-thing\n---\n\n# Write a thing\n');
  write(root, 'chat/knowledge/topic-a/one.md', '# One\n');
  write(root, 'chat/knowledge/topic-a/sub/two.md', '# Two\n');
  write(root, 'chat/models/model-a.md', '---\nid: model-a\n---\n\n# Model A\n\n1. Before you answer, search your knowledge.\n');
  write(root, 'chat/models/model-b.md', '---\nid: model-b\n---\n\n# Model B\n');
  return root;
}

function config(url: string, root: string, changes: Partial<PushConfig> = {}): PushConfig {
  return {
    url,
    token: FAKE_TOKEN,
    baseModel: FAKE_BASE_MODEL,
    share: `group:${FAKE_GROUP.name}`,
    root,
    dryRun: false,
    log: () => undefined,
    pollMs: 1,
    ...changes,
  };
}

function count(calls: string[], pattern: RegExp): number {
  return calls.filter((call) => pattern.test(call)).length;
}

const READ_GRANT = [
  {
    principal_type: 'group',
    principal_id: FAKE_GROUP.id,
    permission: 'read',
  },
];

describe('push to Open WebUI', () => {
  it('creates the skills, knowledge bases and models, each readable by the group', async () => {
    const fake = await startFakeOpenWebUi();
    const root = profile();

    await push(config(fake.url, root));
    const knowledge = [...fake.state.knowledge.values()];
    const modelA = fake.state.models.get('model-a') ?? {};

    assert.deepEqual(fake.state.skills.get('write-thing')?.grants, READ_GRANT);
    assert.equal(knowledge.length, 1);
    assert.deepEqual(knowledge[0]?.grants, READ_GRANT);
    assert.deepEqual(
      [...knowledge[0]?.files.values() ?? []]
        .map((file) => `${file.path}/${file.filename}`)
        .toSorted(),
      [
        '/one.md',
        'sub/two.md',
      ],
    );
    assert.deepEqual([...fake.state.models.keys()].toSorted(), [
      'model-a',
      'model-b',
    ]);
    assert.deepEqual(fake.state.modelGrants.get('model-b'), READ_GRANT);
    assert.match(JSON.stringify(modelA), /query_knowledge_files/);
    assert.match(JSON.stringify(modelA), new RegExp(`"knowledge":\\[\\{"id":"${[...fake.state.knowledge.keys()][0] ?? ''}"`));
    await fake.close();
  });
  it('updates without duplicating anything on a second run, and sends only changed files', async () => {
    const fake = await startFakeOpenWebUi();
    const root = profile();

    await push(config(fake.url, root));
    write(root, 'chat/knowledge/topic-a/one.md', '# One, changed\n');
    rmSync(join(root, 'chat/knowledge/topic-a/sub/two.md'));
    await push(config(fake.url, root));
    assert.equal(count(fake.state.calls, /^POST \/api\/v1\/skills\/create$/), 1);
    assert.equal(count(fake.state.calls, /^POST \/api\/v1\/skills\/id\/write-thing\/update$/), 1);
    assert.equal(count(fake.state.calls, /^POST \/api\/v1\/knowledge\/create$/), 1);
    assert.equal(count(fake.state.calls, /^POST \/api\/v1\/files\//), 3);
    assert.equal(fake.state.knowledge.size, 1);
    assert.equal([...fake.state.knowledge.values()][0]?.files.size, 1);
    assert.equal(fake.state.models.size, 2);
    await fake.close();
  });
  it('gives a model only its own knowledge, and no knowledge tools in legacy mode', async () => {
    const fake = await startFakeOpenWebUi();

    await push(config(fake.url, profile(), { mode: 'legacy' }));
    const modelA = JSON.stringify(fake.state.models.get('model-a'));
    const modelB = JSON.stringify(fake.state.models.get('model-b'));

    assert.match(modelA, /"function_calling":"legacy"/);
    assert.doesNotMatch(modelA, /query_knowledge_files/);
    assert.match(modelB, /"knowledge":\[\]/);
    await fake.close();
  });
  it('sends no write in a dry run', async () => {
    const fake = await startFakeOpenWebUi();

    await push(config(fake.url, profile(), { dryRun: true }));
    assert.equal(count(fake.state.calls, /^POST /), 0);
    await fake.close();
  });
  it('stops with a clear message on a wrong token or a missing base model', async () => {
    const fake = await startFakeOpenWebUi();
    const root = profile();

    await assert.rejects(push(config(fake.url, root, { token: 'wrong' })), /401/);
    await assert.rejects(push(config(fake.url, root, { baseModel: 'missing' })), /Base model not found/);
    await assert.rejects(push(config(fake.url, root, { share: 'group:nobody' })), /Group not found: nobody/);
    await fake.close();
  });
});

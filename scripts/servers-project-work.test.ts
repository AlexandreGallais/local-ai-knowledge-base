import assert from 'node:assert/strict';
import {
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
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  checkReport,
  parseTasks,
} from '../global/tools/work-files.ts';
import {
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const SERVERS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers');
const folders: string[] = [];
const clients: Client[] = [];
let project = '';
const TASKS = `# Tasks: user-list

Brief: .agents/work/user-list/brief.md

## T01 · Write the user type
- State: todo
- Agent: ts-function
- Files: src/user.ts (create)
- Depends: none
- Consumes: none
- Do: Write the User type.
- Check: \`npm run lint\`
- Done when: The type compiles.

## T02 · Write the user list
- State: todo
- Agent: component
- Files: src/user-list.ts (create)
- Depends: T01
- Consumes: User from T01
- Do: Write the list component.
- Check: \`npm run lint\`
- Done when: The list shows the users.
`;
const BRIEF = '# Brief: user-list\n\n## Request\n\nA list.\n\n## Summary for sub-agents\n\nAngular 22 app; users come from UserApi.\n';
const REPORT = '# Report T01\n\nSTATUS: DONE\nTASK: T01 · Write the user type\nFILES:\n- src/user.ts (created)\nCHECK: `npm run lint` -> exit 0, 0 errors\nEVIDENCE:\nok\nNOTES:\n- none\nBLOCKER: none';

function folder(prefix: string, files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), prefix));

  folders.push(root);
  for (const [
    path,
    content,
  ] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

let work: Client;
let info: Client;

before(() => {
  const base = folder('base-', { 'VERSION': '0.2.0\n' });

  project = folder('project-', {
    '.agents/profile.json': JSON.stringify({
      profile: 'angular-app',
      subject: 'Invented demo app',
      baseVersion: '0.2.0',
      checks: {
        format: 'npm run format',
        lint: 'npm run lint',
      },
    }),
    'package.json': JSON.stringify({ dependencies: { '@angular/core': '^22.2.0' } }),
    '.agents/work/user-list/tasks.md': TASKS,
    '.agents/work/user-list/brief.md': BRIEF,
  });
  const env = {
    BASE_ROOT: base,
    PROJECT_ROOT: project,
  };

  work = startServer(join(SERVERS, 'work.ts'), env);
  info = startServer(join(SERVERS, 'project.ts'), env);
  clients.push(work, info);
});
after(() => {
  clients.forEach((client) => client.close());
  for (const root of folders) {
    rmSync(root, {
      recursive: true,
      force: true,
    });
  }
});
describe('the project server', () => {
  it('gives the profile, the versions and the check commands', async () => {
    const result = await info.call('info', {});

    assert.match(result.text, /Profile: angular-app/);
    assert.match(result.text, /@angular\/core \^22\.2\.0/);
    assert.match(result.text, /- format: `npm run format`\n- lint: `npm run lint`/);
  });
});
describe('the work server', () => {
  it('gives the next task with its message, never the whole file', async () => {
    const result = await work.call('next_task', { subject: 'user-list' });

    assert.match(result.text, /Agent: ts-function/);
    assert.match(result.text, /Task T01 · Write the user type/);
    assert.match(result.text, /users come from UserApi/);
    assert.doesNotMatch(result.text, /T02/);
  });
  it('refuses a second task while the first runs, and a report out of form', async () => {
    const second = await work.call('next_task', { subject: 'user-list' });
    const bad = await work.call('write_report', {
      subject: 'user-list',
      task: 'T01',
      report: 'done',
    });

    assert.equal(second.isError, true);
    assert.equal(bad.isError, true);
  });
  it('saves the report, then marks the task done', async () => {
    await work.call('write_report', {
      subject: 'user-list',
      task: 'T01',
      report: REPORT,
    });
    const result = await work.call('finish_task', {
      subject: 'user-list',
      task: 'T01',
    });

    assert.equal(result.text, 'T01 done. 1/2 tasks done.');
    assert.match(readFileSync(join(project, '.agents/work/user-list/tasks.md'), 'utf8'), /## T01 · Write the user type\n- State: done/);
  });
  it('marks a task done by the user, with a report in the form that quotes their words', async () => {
    const result = await work.call('finish_by_user', {
      subject: 'user-list',
      task: 'T02',
      note: 'I installed the packages myself.',
    });
    const report = readFileSync(join(project, '.agents/work/user-list/reports/T02.md'), 'utf8');

    assert.equal(result.text, 'T02 done by the user. 2/2 tasks done.');
    assert.match(readFileSync(join(project, '.agents/work/user-list/tasks.md'), 'utf8'), /## T02 · Write the user list\n- State: done/);
    assert.match(report, /^STATUS: DONE$/m);
    assert.match(report, /^The user said: I installed the packages myself\.$/m);
    assert.deepEqual(checkReport(report, parseTasks(TASKS).find((task) => task.id === 'T02')), []);
  });
  it('refuses to mark a task done by the user without their words', async () => {
    const result = await work.call('finish_by_user', {
      subject: 'user-list',
      task: 'T02',
    });

    assert.equal(result.isError, true);
  });
  it('refuses a subject name that leaves the work folder', async () => {
    const result = await work.call('next_task', { subject: '../escape' });

    assert.equal(result.isError, true);
  });
});

// The work server through a whole subject: brief questions and answers, the plan and its agents,
// a report out of the task, and the resume of a fresh session after a break.
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
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const SERVERS = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers');
const BRIEF = '# Brief: user-list\n\n## Request\nA list.\n\n## Goal\nA list page.\n\n## Requirements\n- R1: rows.\n\n## Out of scope\n- paging\n\n## Assumptions\n- A1 [OPEN]: 50 users at most.\n\n## Questions\n- Q1: Sort?\n  - a) By name (recommended)\n  - b) No sort\n\n## Answers\n\n## Acceptance\n- tests at 0 errors\n\n## Summary for sub-agents\nAngular 22 app.\n';
const TASKS = `# Tasks: user-list

## T01 · Write the store
- State: done
- Agent: store
- Files: src/user.store.ts (create)
- Depends: none
- Consumes: none
- Do: Write the store.
- Check: \`npm run lint\`
- Done when: The lint ends with 0 errors.

## T02 · Write the list
- State: todo
- Agent: component
- Files: src/user-list.ts (create)
- Depends: T01
- Consumes: UserStore from T01
- Do: Write the list component.
- Check: \`npm run lint\`
- Done when: The lint ends with 0 errors.

## T03 · Final check
- State: todo
- Agent: checker
- Files: none
- Depends: all
- Consumes: none
- Do: Run the four checks.
- Check: the four check commands
- Done when: The four commands end with 0 errors.
`;
const folders: string[] = [];
let work: Client;
let project = '';

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

before(() => {
  const base = folder('base-', {
    'VERSION': '0.2.0\n',
    'agents/profiles.json': JSON.stringify({
      component: ['angular-app'],
      store: ['angular-app'],
    }),
  });

  project = folder('project-', {
    '.agents/profile.json': JSON.stringify({ profile: 'angular-app' }),
    '.agents/work/user-list/brief.md': BRIEF,
    '.agents/work/user-list/tasks.md': TASKS,
  });
  work = startServer(join(SERVERS, 'work.ts'), {
    BASE_ROOT: base,
    PROJECT_ROOT: project,
  });
});
after(() => {
  work.close();
  for (const root of folders) {
    rmSync(root, {
      recursive: true,
      force: true,
    });
  }
});
describe('the work server through a subject', () => {
  it('gives the questions of the brief, then saves the answers', async () => {
    const questions = await work.call('get_questions', { subject: 'user-list' });

    await work.call('save_answers', {
      subject: 'user-list',
      answers: '- Q1: a',
    });
    assert.match(questions.text, /Q1: Sort\?/);
    assert.match(readFileSync(join(project, '.agents/work/user-list/brief.md'), 'utf8'), /## Answers\n\n- Q1: a\n/);
  });
  it('checks the brief and the tasks with the agents of the profile', async () => {
    const brief = await work.call('check_brief', { subject: 'user-list' });
    const tasks = await work.call('check_tasks', { subject: 'user-list' });

    assert.equal(brief.text, 'brief.md is well formed.');
    assert.equal(tasks.text, 'tasks.md is well formed.');
  });
  it('gives a fresh session the subject and the task to go on with', async () => {
    const first = await work.call('resume', {});

    await work.call('next_task', { subject: 'user-list' });
    const second = await work.call('resume', {});

    assert.equal(first.text, 'user-list: 1/3 tasks done; next: T02 · Write the list');
    assert.match(second.text, /running: T02 · Write the list, read its report with read_status/);
  });
  it('refuses a report that changed a file the task does not own', async () => {
    const report = await work.call('write_report', {
      subject: 'user-list',
      task: 'T02',
      report: 'STATUS: DONE\nTASK: T02 · Write the list\nFILES:\n- src/other.ts (changed)\nCHECK: `npm run lint` -> exit 0, 0 errors\nEVIDENCE:\n0 errors\nBLOCKER: none',
    });

    assert.equal(report.isError, true);
    assert.match(report.text, /src\/other\.ts is not a file of task T02/);
  });
});

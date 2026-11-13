// The forms of brief.md, tasks.md and a sub-agent report (research R6), and their checks.
import assert from 'node:assert/strict';
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
  agentsOfProfile,
  briefQuestions,
  checkBrief,
  checkReport,
  checkTasks,
  parseTasks,
  setAnswers,
} from '../global/tools/work-files.ts';

const BASE = join(dirname(fileURLToPath(import.meta.url)), '..', 'global');
const BRIEF = `# Brief: user-list

## Request
Show the users in a list.

## Goal
A page lists the users of the invented demo API.

## Facts found
- The app uses Angular 22. (\`package.json\`)

## Requirements
- R1: The page shows one row per user. Check: the component test.

## Out of scope
- No paging.

## Assumptions
- A1 [CONFIRMED]: The API gives at most 50 users.

## Questions
- Q1: Sort the users?
  - a) By name (recommended)
  - b) No sort

## Answers
- Q1: a

## Acceptance
- \`npm run test\` ends with 0 errors.

## Summary for sub-agents
Angular 22 app, zoneless. Users come from UserApi.getUsers(). Sort by name.
`;
const TASK = (id: string, agent: string, extra = ''): string => `## ${id} · Task ${id}
- State: todo
- Agent: ${agent}
- Files: src/${id}.ts (create)
- Depends: none
- Consumes: none
- Do: Write the code of ${id}.${extra}
- Check: \`npm run lint\`
- Done when: The lint ends with 0 errors.
`;
const FINAL = `## T99 · Final check
- State: todo
- Agent: checker
- Files: none
- Depends: all
- Consumes: none
- Do: Run format, lint, build and tests.
- Check: the four check commands
- Done when: The four commands end with 0 errors.
`;
const TASKS = `# Tasks: user-list\n\n${TASK('T01', 'component')}\n${FINAL}`;
const REPORT = `# Report T01

STATUS: DONE
TASK: T01 · Task T01
FILES:
- src/T01.ts (created)
CHECK: \`npm run lint\` -> exit 0, 0 errors
EVIDENCE:
0 errors
NOTES:
- none
BLOCKER: none`;

describe('the check of brief.md', () => {
  it('accepts a well-formed brief', () => {
    assert.deepEqual(checkBrief(BRIEF), []);
  });
  it('refuses a missing section, an unmarked assumption and a long summary', () => {
    const brief = BRIEF
      .replace('## Out of scope\n- No paging.\n', '')
      .replace('[CONFIRMED]', '')
      .replace('Sort by name.', `Sort by name.\n${'More.\n'.repeat(12)}`);

    assert.deepEqual(checkBrief(brief), [
      'missing section "## Out of scope"',
      'assumption without [OPEN] or [CONFIRMED]: A1 : The API gives at most 50 users.',
      'the summary for sub-agents has 13 lines; keep 12 at most',
    ]);
  });
  it('gives the questions and writes the answers', () => {
    assert.match(briefQuestions(BRIEF), /^- Q1: Sort the users\?\n {2}- a\) By name \(recommended\)/);
    assert.match(setAnswers(BRIEF, '- Q1: b'), /## Answers\n\n- Q1: b\n\n## Acceptance/);
  });
});
describe('the check of tasks.md', () => {
  it('accepts well-formed tasks that end with the final check', () => {
    assert.deepEqual(checkTasks(TASKS, ['component']), []);
  });
  it('refuses a task without files, without agent or without check command', () => {
    const tasks = TASKS
      .replace('- Files: src/T01.ts (create)', '- Files: ')
      .replace('- Agent: component', '- Agent: ')
      .replace('- Check: `npm run lint`', '- Check: ');

    assert.deepEqual(checkTasks(tasks), [
      'T01: missing "- Agent: "',
      'T01: missing "- Files: "',
      'T01: missing "- Check: "',
    ]);
  });
  it('refuses an agent outside the profile, vague words, a later dependency and no final check', () => {
    const tasks = `# Tasks\n\n${TASK('T01', 'store', ' Then the rest, etc.').replace('Depends: none', 'Depends: T02')}\n${TASK('T02', 'component')}`;

    assert.deepEqual(checkTasks(tasks, ['component']), [
      'T01: agent "store" is not an agent of this profile: component',
      'T01: vague words "etc.": write what to do exactly',
      'T01: depends on T02, which is not an earlier task',
      'the last task must be the final check, with "- Agent: checker"',
    ]);
  });
  it('asks one check command between backquotes, and accepts any command', () => {
    const check = (command: string): string[] => checkTasks(TASKS.replace('- Check: `npm run lint`', `- Check: ${command}`), ['component']);

    assert.deepEqual(check('`npm run lint`, `npm run test`'), ['T01: one check command only']);
    assert.deepEqual(check('run the lint'), ['T01: the check must be one command between backquotes']);
    for (const command of [
      'npx --no -- tsc -p tsconfig.json',
      'cd src && npx --no -- tsc',
      'node -e "JSON.parse(1)"',
      'grep -c "<symbol id=" src/symbols/symbols.svg',
    ]) {
      assert.deepEqual(check(`\`${command}\``), [], command);
    }
  });
  it('knows the agents of each profile', () => {
    assert.ok(agentsOfProfile(BASE, 'angular-app')?.includes('store'));
    assert.equal(agentsOfProfile(BASE, 'ts-pure-lib')?.includes('component'), false);
  });
});
describe('the check of a sub-agent report', () => {
  const task = parseTasks(TASKS)[0];

  it('accepts a DONE report with its check at 0 errors, its evidence and its files', () => {
    assert.deepEqual(checkReport(REPORT, task), []);
  });
  it('refuses a status out of the form, a DONE without evidence and a file the task does not own', () => {
    assert.deepEqual(checkReport(REPORT.replace('STATUS: DONE', 'STATUS: FINISHED'), task), ['STATUS must be one of DONE, DONE_WITH_CONCERNS, NEEDS_CONTEXT, BLOCKED']);
    assert.deepEqual(checkReport(REPORT.replace('EVIDENCE:\n0 errors', 'EVIDENCE:'), task), ['a DONE report needs EVIDENCE: the last lines of the check output']);
    assert.deepEqual(checkReport(REPORT.replace('- src/T01.ts (created)', '- src/other.ts (changed)'), task), ['src/other.ts is not a file of task T01']);
  });
  it('refuses a BLOCKED report without its blocker', () => {
    const blocked = REPORT
      .replace('STATUS: DONE', 'STATUS: BLOCKED')
      .replace(', 0 errors', ', 2 errors');

    assert.deepEqual(checkReport(blocked, task), ['a BLOCKED report needs a BLOCKER that says what is missing or fails']);
  });
});

// The evaluation of the base: ten front-end tasks, each with a proof that fails on the starting project
// and passes on a reference solution; the token count of a run; and the summary of the results.
import assert from 'node:assert/strict';
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  proveTask,
  readTasks,
  sumTokens,
} from '../global/evaluation/run.ts';
import {
  formatSummary,
  readRecords,
  summarize,
} from '../global/evaluation/summary.ts';
import {
  ROOT,
  SAMPLES,
  SKIP,
} from './lib/samples.ts';
import { checkEvaluationTask } from './check-base.ts';
import { projectFiles } from './sync-evaluation-projects.ts';

const EVALUATION = join(ROOT, 'global', 'evaluation');
const PROJECTS = join(EVALUATION, 'projects');
const REFERENCES = join(ROOT, 'scripts', 'evaluation-references');
const TASKS = readTasks(join(EVALUATION, 'tasks'));
const OPTIONS = {
  base: join(ROOT, 'global'),
  projects: PROJECTS,
  binDir: join(SAMPLES, 'node_modules', '.bin'),
};
const folders: string[] = [];

// The starting project of a task, inside the samples folder so that it finds the packages.
function startingProject(task: (typeof TASKS)[number], label: string): string {
  const folder = join(SAMPLES, `zz-eval-${task.id}-${label}`);

  rmSync(folder, {
    recursive: true,
    force: true,
  });
  cpSync(join(PROJECTS, task.project), folder, { recursive: true });
  folders.push(folder);
  return folder;
}

function referenceCopies(reference: string): [string, string][] {
  const path = join(reference, 'copy.json');

  return existsSync(path) ? Object.entries(JSON.parse(readFileSync(path, 'utf8')) as Record<string, string>) : [];
}

// The reference solution of a task: base files from copy.json, then the files written for it.
function applyReference(task: (typeof TASKS)[number], project: string): void {
  const reference = join(REFERENCES, task.folder.split('/').at(-1) ?? '');

  for (const [
    target,
    source,
  ] of referenceCopies(reference)) {
    cpSync(join(ROOT, source), join(project, target));
  }
  if (existsSync(join(reference, 'files'))) {
    cpSync(join(reference, 'files'), project, { recursive: true });
  }
}

after(() => {
  for (const folder of folders) {
    rmSync(folder, {
      recursive: true,
      force: true,
    });
  }
});
describe('the tasks of the evaluation', () => {
  it('are ten, from a small function to a page, each with its request, its project and its proof', () => {
    assert.deepEqual(TASKS.map((task) => task.id), Array.from({ length: 10 }, (_unused, index) => `t${String(index + 1).padStart(2, '0')}`));
    assert.deepEqual([...new Set(TASKS.map((task) => task.size))].sort(), [
      'large',
      'medium',
      'small',
    ]);
    for (const task of TASKS) {
      assert.ok(task.request.length > 80, `${task.id}: request too short`);
      assert.ok(existsSync(join(PROJECTS, task.project, 'package.json')), `${task.id}: no project ${task.project}`);
      assert.ok(existsSync(join(task.folder, 'proof.spec.ts')), `${task.id}: no proof.spec.ts`);
      assert.match(task.test, task.project === 'angular-app' ? /^npx --no ng test --watch=false --include / : /^npx --no vitest run /, task.id);
      assert.ok(task.test.endsWith(task.proof), `${task.id}: the test runs another file than the proof`);
      assert.ok(existsSync(join(REFERENCES, task.folder.split('/').at(-1) ?? '')), `${task.id}: no reference solution`);
    }
  });
  it('are checked by the base check: header, sections and proof file', () => {
    const text = '---\nid: t99\ntitle: "A task"\nproject: ts-lib\nsize: small\nproof: src/a.proof.spec.ts\n---\n\n# T99\n\n## Request\n\nDo it.\n';

    assert.deepEqual(checkEvaluationTask(text, 'task.md', false).map((item) => item.message), [
      'missing "test" in the header',
      'missing ## Proof of success section',
      'missing proof.spec.ts next to task.md',
    ]);
  });
  it('start from projects that are the samples of the base', () => {
    const files = projectFiles();

    assert.equal(readdirSync(PROJECTS).length, 4);
    for (const [
      target,
      source,
    ] of files) {
      assert.equal(readFileSync(join(PROJECTS, target), 'utf8'), readFileSync(source, 'utf8'), `${target}: run node scripts/sync-evaluation-projects.ts`);
    }
  });
});
describe('the record of a run', () => {
  it('sums the tokens of the steps and counts the sub-agents', () => {
    const events = [
      '{"type":"step_start"}',
      '{"type":"step_finish","part":{"tokens":{"input":1200,"output":300,"reasoning":100,"cache":{"read":5000}}}}',
      '{"type":"tool_use","part":{"tool":"subagent"}}',
      '{"type":"step_finish","part":{"tokens":{"input":800,"output":200}}}',
      'not json',
    ].join('\n');

    assert.deepEqual(sumTokens(events), {
      tokens: 2600,
      steps: 2,
      subagents: 1,
    });
  });
});
describe('the summary of the results', () => {
  // "t01 0.2 1 8000": task, condition, success (1 or 0), tokens.
  const record = (line: string): string => {
    const [
      task,
      condition,
      success,
      tokens,
    ] = line.split(' ');

    return JSON.stringify({
      task,
      condition,
      success: success === '1',
      tokens: Number(tokens),
    });
  };

  it('passes when the base 0.2 succeeds more often than the others, with no more tokens per run', () => {
    const summary = summarize(readRecords([
      record('t01 none 0 9000'),
      record('t02 none 1 11000'),
      record('t01 0.1 1 10000'),
      record('t02 0.1 0 10000'),
      record('t01 0.2 1 8000'),
      record('t02 0.2 1 9000'),
    ].join('\n')));

    assert.equal(summary.passes, true);
    assert.deepEqual(
      summary.conditions.map((item) => [
        item.condition,
        item.successes,
        item.tokensPerRun,
      ]),
      [
        ['none', 1, 10_000],
        ['0.1', 1, 10_000],
        ['0.2', 2, 8500],
      ],
    );
    assert.match(formatSummary(summary), /\| t01 \| 0\/1 \| 1\/1 \| 1\/1 \|/);
  });
  it('fails when the base 0.2 uses more tokens per run, even with more successes', () => {
    const summary = summarize(readRecords([
      record('t01 none 0 5000'),
      record('t01 0.2 1 9000'),
    ].join('\n')));

    assert.equal(summary.passes, false);
    assert.match(formatSummary(summary), /^Verdict: the base 0\.2 does not succeed/m);
  });
});
describe('the proof of each task', { skip: SKIP }, () => {
  for (const task of TASKS) {
    it(`${task.id}: fails on the starting project, passes on the reference solution`, () => {
      const start = proveTask(startingProject(task, 'start'), task, OPTIONS);
      const solved = startingProject(task, 'reference');

      applyReference(task, solved);
      const proof = proveTask(solved, task, OPTIONS);

      assert.equal(start.passed, false, `${task.id}: the proof passes without any work`);
      assert.equal(proof.passed, true, `${task.id}: ${proof.failedStep}\n${proof.output}`);
    });
  }
});

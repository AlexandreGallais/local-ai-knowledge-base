// Reads and checks the work files of a subject, in .agents/work/<subject>/: brief.md, tasks.md and
// reports/<task>.md. The forms follow the research R6 of the base. No package; Node 22.18 or later.
//   node work-files.ts <subject-folder>     checks the brief, the tasks and the reports
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Task {
  id: string;
  title: string;
  fields: Map<string, string>;
}

export interface Report {
  status: string;
  check: string;
  blocker: string;
}

export const TASK_STATES = [
  'todo',
  'doing',
  'done',
  'blocked',
];

export const REPORT_STATUSES = [
  'DONE',
  'DONE_WITH_CONCERNS',
  'NEEDS_CONTEXT',
  'BLOCKED',
];

const TASK_FIELDS = [
  'State',
  'Agent',
  'Files',
  'Depends',
  'Do',
  'Check',
  'Done when',
];
const BRIEF_SECTIONS = [
  'Request',
  'Goal',
  'Requirements',
  'Out of scope',
  'Acceptance',
  'Summary for sub-agents',
];
const TASK_HEADING = /^## (T\d{2,}) · (.+)$/;
const FIELD = /^- ([A-Za-z ]+): (.*)$/;
const SUBJECT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSubject(name: string): boolean {
  return SUBJECT.test(name);
}

export function parseTasks(text: string): Task[] {
  const tasks: Task[] = [];

  for (const line of text
    .replaceAll('\r\n', '\n')
    .split('\n')) {
    const heading = TASK_HEADING.exec(line);
    const field = FIELD.exec(line);

    if (heading !== null) {
      tasks.push({
        id: heading[1] ?? '',
        title: (heading[2] ?? '').trim(),
        fields: new Map(),
      });
    } else if (field !== null && tasks.length > 0) {
      tasks
        .at(-1)?.fields
        .set(field[1] ?? '', (field[2] ?? '').trim());
    }
  }
  return tasks;
}

// One line per defect of tasks.md; an empty list when it is well formed.
export function checkTasks(text: string): string[] {
  const tasks = parseTasks(text);
  const ids = new Set(tasks.map((task) => task.id));
  const problems: string[] = [];

  if (tasks.length === 0) {
    problems.push('no task: each task starts with "## T01 · <title>"');
  }
  for (const task of tasks) {
    for (const field of TASK_FIELDS.filter((name) => (task.fields.get(name) ?? '') === '')) {
      problems.push(`${task.id}: missing "- ${field}: "`);
    }
    const state = task.fields.get('State') ?? '';

    if (state !== '' && !TASK_STATES.includes(state)) {
      problems.push(`${task.id}: state "${state}" is not one of ${TASK_STATES.join(', ')}`);
    }
    for (const needed of (task.fields.get('Depends') ?? '')
      .split(/[,\s]+/)
      .filter((item) => /^T\d+$/.test(item))) {
      if (!ids.has(needed)) {
        problems.push(`${task.id}: depends on ${needed}, which does not exist`);
      }
    }
  }
  if (ids.size !== tasks.length) {
    problems.push('two tasks have the same id');
  }
  return problems;
}

export function checkBrief(text: string): string[] {
  const headings = new Set(text
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).trim()));

  return BRIEF_SECTIONS
    .filter((name) => !headings.has(name))
    .map((name) => `missing section "## ${name}"`);
}

export function briefSummary(text: string): string {
  const lines = text.split('\n');
  const start = lines.indexOf('## Summary for sub-agents');

  if (start < 0) {
    return '';
  }
  const end = lines.findIndex((line, position) => position > start && line.startsWith('## '));

  return lines
    .slice(start + 1, end < 0 ? undefined : end)
    .join('\n')
    .trim();
}

export function setState(text: string, id: string, state: string): string {
  const lines = text.split('\n');
  const start = lines.findIndex((line) => line.startsWith(`## ${id} · `));
  const field = lines.findIndex((line, position) => position > start && line.startsWith('- State: '));
  const next = lines.findIndex((line, position) => position > start && line.startsWith('## '));

  if (start < 0 || field < 0 || (next >= 0 && field > next)) {
    throw new Error(`no task ${id} with a State line`);
  }
  lines[field] = `- State: ${state}`;
  return lines.join('\n');
}

export function parseReport(text: string): Report {
  const value = (name: string): string => new RegExp(`^${name}: (.*)$`, 'm')
    .exec(text)?.[1]
    ?.trim() ?? '';

  return {
    status: value('STATUS'),
    check: value('CHECK'),
    blocker: value('BLOCKER'),
  };
}

export function checkReport(text: string): string[] {
  const report = parseReport(text);
  const problems: string[] = [];

  if (!REPORT_STATUSES.includes(report.status)) {
    problems.push(`STATUS must be one of ${REPORT_STATUSES.join(', ')}`);
  }
  for (const name of [
    'TASK',
    'FILES',
    'CHECK',
    'BLOCKER',
  ].filter((label) => !new RegExp(`^${label}:`, 'm').test(text))) {
    problems.push(`missing line "${name}:"`);
  }
  if (report.status.startsWith('DONE') && !/\b0 errors?\b/.test(report.check)) {
    problems.push('a DONE report needs a CHECK line that ends with "0 errors"');
  }
  return problems;
}

// Every defect of the work files of one subject folder, "file: problem" each.
export function checkSubject(folder: string): string[] {
  const read = (name: string): string | undefined => existsSync(join(folder, name)) ? readFileSync(join(folder, name), 'utf8') : undefined;
  const brief = read('brief.md');
  const tasks = read('tasks.md');
  const reports = existsSync(join(folder, 'reports')) ? readdirSync(join(folder, 'reports')).filter((name) => name.endsWith('.md')) : [];

  return [
    ...brief === undefined ? ['brief.md: missing'] : checkBrief(brief).map((problem) => `brief.md: ${problem}`),
    ...tasks === undefined ? ['tasks.md: missing'] : checkTasks(tasks).map((problem) => `tasks.md: ${problem}`),
    ...reports.flatMap((name) => checkReport(readFileSync(join(folder, 'reports', name), 'utf8')).map((problem) => `reports/${name}: ${problem}`)),
  ];
}

// The first task to do: not done, not blocked, every task it depends on done.
export function nextTask(tasks: Task[]): Task | undefined {
  const done = new Set(tasks
    .filter((task) => task.fields.get('State') === 'done')
    .map((task) => task.id));

  return tasks.find((task) => {
    const depends = task.fields.get('Depends') ?? '';
    const needed = depends === 'all' ? tasks
      .filter((other) => other.id !== task.id)
      .map((other) => other.id) : depends
      .split(/[,\s]+/)
      .filter((item) => /^T\d+$/.test(item));

    return task.fields.get('State') === 'todo' && needed.every((id) => done.has(id));
  });
}

function main(): void {
  const folder = process.argv[2];

  if (folder === undefined) {
    console.log('Usage: node work-files.ts .agents/work/<subject>');
    process.exitCode = 2;
    return;
  }
  const problems = checkSubject(folder);

  for (const problem of problems) {
    console.log(problem);
  }
  console.log(problems.length === 0 ? 'Work files are well formed.' : `${problems.length} problem(s) in the work files.`);
  process.exitCode = problems.length === 0 ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

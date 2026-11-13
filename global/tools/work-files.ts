// Reads and checks the work files of a subject, in .agents/work/<subject>/: brief.md, tasks.md and
// reports/<task>.md. The forms follow the research R6 of the base. No package; Node 22.18 or later.
//   node work-files.ts <subject-folder>     checks the brief, the tasks and the reports
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
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
  'Consumes',
  'Do',
  'Check',
  'Done when',
];
const BRIEF_SECTIONS = [
  'Request',
  'Goal',
  'Requirements',
  'Out of scope',
  'Assumptions',
  'Acceptance',
  'Summary for sub-agents',
];
const CHECKER = 'checker';
const REPORT_LINES = [
  'TASK',
  'FILES',
  'CHECK',
  'EVIDENCE',
  'BLOCKER',
];
const VAGUE_WORDS = /\betc\.|\bas needed\b|\bif necessary\b|\bsimilar to\b|\bTBD\b/i;
const MAX_SUMMARY_LINES = 12;
const MAX_BRIEF_LINES = 150;
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

function dependencies(task: Task): string[] {
  return (task.fields.get('Depends') ?? '')
    .split(/[,\s]+/)
    .filter((item) => /^T\d+$/.test(item));
}

// The form of the check of a task: one command between backquotes. The final check may name several
// commands, or none ("the four check commands of the profile").
export function checkCommandProblems(id: string, check: string, isChecker: boolean): string[] {
  const commands = [...check.matchAll(/`([^`]+)`/g)];

  if (commands.length === 0) {
    return isChecker ? [] : [`${id}: the check must be one command between backquotes`];
  }
  return !isChecker && commands.length > 1 ? [`${id}: one check command only`] : [];
}

// The defects of one task: missing fields, state, files, agent, vague words, dependencies, the form
// of its check.
function checkTask(task: Task, earlier: ReadonlySet<string>, agents: readonly string[] | undefined): string[] {
  const field = (name: string): string => task.fields.get(name) ?? '';
  const isChecker = field('Agent') === CHECKER;
  const state = field('State');
  const vague = [...task.fields.values()]
    .join(' ')
    .match(VAGUE_WORDS);

  return [
    ...field('Check') === '' ? [] : checkCommandProblems(task.id, field('Check'), isChecker),
    ...TASK_FIELDS
      .filter((name) => field(name) === '')
      .map((name) => `${task.id}: missing "- ${name}: "`),
    ...state !== '' && !TASK_STATES.includes(state) ? [`${task.id}: state "${state}" is not one of ${TASK_STATES.join(', ')}`] : [],
    ...field('Files') === 'none' && !isChecker ? [`${task.id}: only the final check may have "Files: none"`] : [],
    ...agents !== undefined && field('Agent') !== '' && !isChecker && !agents.includes(field('Agent')) ? [`${task.id}: agent "${field('Agent')}" is not an agent of this profile: ${agents.join(', ')}`] : [],
    ...vague === null ? [] : [`${task.id}: vague words "${vague[0]}": write what to do exactly`],
    ...dependencies(task)
      .filter((needed) => !earlier.has(needed))
      .map((needed) => `${task.id}: depends on ${needed}, which is not an earlier task`),
  ];
}

// One line per defect of tasks.md; an empty list when it is well formed. With the agents of the
// profile, an agent outside that list is a defect too.
export function checkTasks(text: string, agents?: readonly string[]): string[] {
  const tasks = parseTasks(text);
  const ids = new Set(tasks.map((task) => task.id));
  const last = tasks.at(-1);

  return [
    ...tasks.length === 0 ? ['no task: each task starts with "## T01 · <title>"'] : [],
    ...tasks.flatMap((task, index) => checkTask(
      task,
      new Set(tasks
        .slice(0, index)
        .map((item) => item.id)),
      agents,
    )),
    ...ids.size === tasks.length ? [] : ['two tasks have the same id'],
    ...last === undefined || last.fields.get('Agent') === CHECKER ? [] : [`the last task must be the final check, with "- Agent: ${CHECKER}"`],
    ...tasks
      .slice(0, -1)
      .filter((task) => task.fields.get('Agent') === CHECKER)
      .map((task) => `${task.id}: the final check must be the last task`),
  ];
}

function sectionLines(text: string, name: string): string[] {
  const lines = text.split('\n');
  const start = lines.indexOf(`## ${name}`);
  const end = lines.findIndex((line, position) => position > start && line.startsWith('## '));

  return start < 0 ? [] : lines
    .slice(start + 1, end < 0 ? undefined : end)
    .filter((line) => line.trim() !== '');
}

export function checkBrief(text: string): string[] {
  const headings = new Set(text
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).trim()));
  const summary = sectionLines(text, 'Summary for sub-agents');
  const lineCount = text
    .trimEnd()
    .split('\n').length;

  return [
    ...BRIEF_SECTIONS
      .filter((name) => !headings.has(name))
      .map((name) => `missing section "## ${name}"`),
    ...sectionLines(text, 'Assumptions')
      .filter((line) => line.startsWith('- ') && !/\[(?:OPEN|CONFIRMED)\]/.test(line))
      .map((line) => `assumption without [OPEN] or [CONFIRMED]: ${line.slice(2, 60)}`),
    ...headings.has('Summary for sub-agents') && summary.length === 0 ? ['the summary for sub-agents is empty'] : [],
    ...summary.length > MAX_SUMMARY_LINES ? [`the summary for sub-agents has ${summary.length} lines; keep ${MAX_SUMMARY_LINES} at most`] : [],
    ...lineCount > MAX_BRIEF_LINES ? [`the brief has ${lineCount} lines; keep ${MAX_BRIEF_LINES} at most`] : [],
  ];
}

// The questions of a brief, as written in its section "Questions".
export function briefQuestions(text: string): string {
  return sectionLines(text, 'Questions').join('\n');
}

// The brief with its section "Answers" replaced by the given lines.
export function setAnswers(text: string, answers: string): string {
  const lines = text.split('\n');
  const start = lines.indexOf('## Answers');

  if (start < 0) {
    throw new Error('the brief has no "## Answers" section');
  }
  const end = lines.findIndex((line, position) => position > start && line.startsWith('## '));

  return [
    ...lines.slice(0, start + 1),
    '',
    answers.trim(),
    '',
    ...end < 0 ? [] : lines.slice(end),
  ].join('\n');
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

// The paths of a "Files:" field of a task: "src/a.ts (create), src/b.ts (change)".
export function taskFiles(task: Task): string[] {
  return (task.fields.get('Files') ?? '')
    .split(',')
    .map((item) => item.replaceAll(/\([^)]*\)/g, '').replaceAll('`', '').trim())
    .filter((item) => item !== '' && item !== 'none');
}

// The paths of the FILES lines of a report: "- src/a.ts (created)".
export function reportFiles(text: string): string[] {
  const lines = text.split('\n');
  const start = lines.findIndex((line) => line.startsWith('FILES:'));
  const end = lines.findIndex((line, position) => position > start && /^[A-Z]+:/.test(line));

  return start < 0 ? [] : lines
    .slice(start + 1, end < 0 ? undefined : end)
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).replaceAll(/\([^)]*\)/g, '').replaceAll('`', '').trim())
    .filter((path) => path !== '' && path !== 'none');
}

function evidence(text: string): string {
  const lines = text.split('\n');
  const start = lines.findIndex((line) => line.startsWith('EVIDENCE:'));
  const end = lines.findIndex((line, position) => position > start && /^[A-Z]+:/.test(line));

  return start < 0 ? '' : [
    lines[start]?.slice(9) ?? '',
    ...lines.slice(start + 1, end < 0 ? undefined : end),
  ]
    .join('\n')
    .trim();
}

// One line per defect of a report. With its task, a file the task does not own is a defect too.
export function checkReport(text: string, task?: Task): string[] {
  const report = parseReport(text);
  const isDone = report.status.startsWith('DONE');
  const owned = task === undefined ? undefined : taskFiles(task);

  return [
    ...REPORT_STATUSES.includes(report.status) ? [] : [`STATUS must be one of ${REPORT_STATUSES.join(', ')}`],
    ...REPORT_LINES
      .filter((label) => !new RegExp(`^${label}:`, 'm').test(text))
      .map((name) => `missing line "${name}:"`),
    ...isDone && !/\b0 errors?\b/.test(report.check) ? ['a DONE report needs a CHECK line that ends with "0 errors"'] : [],
    ...isDone && evidence(text) === '' ? ['a DONE report needs EVIDENCE: the last lines of the check output'] : [],
    ...[
      'BLOCKED',
      'NEEDS_CONTEXT',
    ].includes(report.status) && /^none\b/i.test(report.blocker) ? [`a ${report.status} report needs a BLOCKER that says what is missing or fails`] : [],
    ...owned === undefined ? [] : reportFiles(text)
      .filter((path) => !owned.includes(path))
      .map((path) => `${path} is not a file of task ${task?.id ?? ''}`),
  ];
}

// Every defect of the work files of one subject folder, "file: problem" each.
export function checkSubject(folder: string, agents?: readonly string[]): string[] {
  const read = (name: string): string | undefined => existsSync(join(folder, name)) ? readFileSync(join(folder, name), 'utf8') : undefined;
  const brief = read('brief.md');
  const tasks = read('tasks.md');
  const parsed = parseTasks(tasks ?? '');
  const reports = existsSync(join(folder, 'reports')) ? readdirSync(join(folder, 'reports')).filter((name) => name.endsWith('.md')) : [];

  return [
    ...brief === undefined ? ['brief.md: missing'] : checkBrief(brief).map((problem) => `brief.md: ${problem}`),
    ...tasks === undefined ? ['tasks.md: missing'] : checkTasks(tasks, agents).map((problem) => `tasks.md: ${problem}`),
    ...reports.flatMap((name) => checkReport(readFileSync(join(folder, 'reports', name), 'utf8'), parsed.find((task) => `${task.id}.md` === name)).map((problem) => `reports/${name}: ${problem}`)),
  ];
}

// The agents a profile may use, from global/agents/profiles.json: agent name -> profiles.
export function agentsOfProfile(base: string, profile: string | undefined): string[] | undefined {
  const path = join(base, 'agents', 'profiles.json');

  if (profile === undefined || !existsSync(path)) {
    return undefined;
  }
  const map = JSON.parse(readFileSync(path, 'utf8')) as Record<string, string[]>;

  return Object
    .entries(map)
    .filter(([, profiles]) => profiles.includes(profile))
    .map(([agent]) => agent);
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
  const project = resolve(folder, '..', '..', '..');
  const profilePath = join(project, '.agents', 'profile.json');
  const profile = existsSync(profilePath) ? (JSON.parse(readFileSync(profilePath, 'utf8')) as { profile?: string }).profile : undefined;
  const problems = checkSubject(folder, agentsOfProfile(join(dirname(fileURLToPath(import.meta.url)), '..'), profile));

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

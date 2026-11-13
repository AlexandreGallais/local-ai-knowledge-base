// MCP server "work": the task list of a subject, one task at a time, without reading tasks.md whole.
// Run by OpenCode in the project folder: node /opt/local-ai-base/servers/work.ts
// It reads and writes only .agents/work/<subject>/: tasks.md and reports/<task>.md.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  briefSummary,
  checkReport,
  checkTasks,
  isSubject,
  nextTask,
  parseReport,
  parseTasks,
  setState,
  type Task,
} from '../tools/work-files.ts';
import { projectRoot } from './lib/base.ts';
import {
  type Arguments,
  requiredText,
  serve,
  type Server,
  ToolError,
} from './lib/mcp.ts';

function subjectFolder(args: Arguments): string {
  const subject = requiredText(args, 'subject');

  if (!isSubject(subject)) {
    throw new ToolError(`"${subject}" is not a subject name: lower-case words joined by hyphens.`);
  }
  return join(projectRoot(), '.agents', 'work', subject);
}

function readFile(folder: string, name: string): string {
  const path = join(folder, name);

  if (!existsSync(path)) {
    throw new ToolError(`${name} is missing in ${folder}. Write it first.`);
  }
  return readFileSync(path, 'utf8');
}

function findTask(tasks: Task[], id: string): Task {
  const task = tasks.find((item) => item.id === id);

  if (task === undefined) {
    throw new ToolError(`No task ${id}. Tasks: ${tasks.map((item) => item.id).join(', ')}.`);
  }
  return task;
}

function progress(tasks: Task[]): string {
  const done = tasks.filter((task) => task.fields.get('State') === 'done').length;

  return `${done}/${tasks.length} tasks done`;
}

function message(task: Task, summary: string): string {
  const field = (name: string): string => task.fields.get(name) ?? '';

  return [
    `Task ${task.id} · ${task.title}`,
    `Files: ${field('Files')}`,
    `Uses: ${task.fields.get('Consumes') ?? 'none'}`,
    `Do: ${field('Do')}`,
    `Check: ${field('Check')}`,
    `Done when: ${field('Done when')}`,
    '',
    'Context:',
    summary === '' ? '(no summary in the brief)' : summary,
    '',
    `End with the report form of the base: STATUS, TASK, FILES, CHECK, EVIDENCE, NOTES, BLOCKER.`,
  ].join('\n');
}

export function next(args: Arguments): string {
  const folder = subjectFolder(args);
  const text = readFile(folder, 'tasks.md');
  const tasks = parseTasks(text);
  const doing = tasks.find((item) => item.fields.get('State') === 'doing');

  if (doing !== undefined) {
    throw new ToolError(`Task ${doing.id} is still running. Read its report with read_status, then finish or block it.`);
  }
  const chosen = nextTask(tasks);

  if (chosen === undefined) {
    return `No task left to start (${progress(tasks)}).`;
  }
  writeFileSync(join(folder, 'tasks.md'), setState(text, chosen.id, 'doing'));
  const summary = existsSync(join(folder, 'brief.md')) ? briefSummary(readFileSync(join(folder, 'brief.md'), 'utf8')) : '';

  return [
    `Agent: ${chosen.fields.get('Agent') ?? ''}`,
    `Progress: ${progress(tasks)}`,
    '',
    'Message to send to the agent:',
    message(chosen, summary),
  ].join('\n');
}

export function writeReport(args: Arguments): string {
  const folder = subjectFolder(args);
  const id = requiredText(args, 'task');
  const report = requiredText(args, 'report');
  const problems = checkReport(report);

  findTask(parseTasks(readFile(folder, 'tasks.md')), id);
  if (problems.length > 0) {
    throw new ToolError(`The report is not in the form of the base: ${problems.join('; ')}.`);
  }
  mkdirSync(join(folder, 'reports'), { recursive: true });
  writeFileSync(join(folder, 'reports', `${id}.md`), `${report}\n`);
  return `Report of ${id} saved.`;
}

export function readStatus(args: Arguments): string {
  const folder = subjectFolder(args);
  const id = requiredText(args, 'task');
  const path = join(folder, 'reports', `${id}.md`);

  if (!existsSync(path)) {
    return `${id}: no report`;
  }
  const report = parseReport(readFileSync(path, 'utf8'));

  return [
    `STATUS: ${report.status}`,
    `CHECK: ${report.check}`,
    `BLOCKER: ${report.blocker}`,
  ].join('\n');
}

export function finish(args: Arguments): string {
  const folder = subjectFolder(args);
  const id = requiredText(args, 'task');
  const text = readFile(folder, 'tasks.md');
  const path = join(folder, 'reports', `${id}.md`);

  findTask(parseTasks(text), id);
  if (!existsSync(path)) {
    throw new ToolError(`${id} has no report. The agent must write it first.`);
  }
  const report = readFileSync(path, 'utf8');
  const problems = checkReport(report);

  if (!parseReport(report).status.startsWith('DONE') || problems.length > 0) {
    const defects = problems.length > 0 ? '; '.concat(problems.join('; ')) : '';

    throw new ToolError(`${id} cannot be done: the report says ${parseReport(report).status || 'nothing'}${defects}. Block it instead.`);
  }
  const updated = setState(text, id, 'done');

  writeFileSync(join(folder, 'tasks.md'), updated);
  return `${id} done. ${progress(parseTasks(updated))}.`;
}

export function block(args: Arguments): string {
  const folder = subjectFolder(args);
  const id = requiredText(args, 'task');
  const text = readFile(folder, 'tasks.md');

  findTask(parseTasks(text), id);
  writeFileSync(join(folder, 'tasks.md'), setState(text, id, 'blocked'));
  return `${id} blocked. Show its report to the user, or ask the planner to split it.`;
}

export function check(args: Arguments): string {
  const problems = checkTasks(readFile(subjectFolder(args), 'tasks.md'));

  return problems.length === 0 ? 'tasks.md is well formed.' : problems.join('\n');
}

const SUBJECT = {
  type: 'string' as const,
  description: 'The subject: the folder name in .agents/work/, as "user-list-page".',
};
const TASK = {
  type: 'string' as const,
  description: 'The task id, as "T03".',
};

export const server: Server = {
  name: 'work',
  version: '0.2.0',
  instructions: 'The task list of a subject. Call next_task, give its message to the agent it names, save the report, then finish_task or block_task. Never read tasks.md whole.',
  tools: [
    {
      name: 'next_task',
      description: 'Start the next task: its agent, the progress, and the message to send to that agent. Refused while a task is still running.',
      properties: { subject: SUBJECT },
      required: ['subject'],
      run: next,
    },
    {
      name: 'write_report',
      description: 'Save the report of a task, in the form of the base. Refused when the form is wrong.',
      properties: {
        subject: SUBJECT,
        task: TASK,
        report: {
          type: 'string',
          description: 'The whole report, from "# Report" to the BLOCKER line.',
        },
      },
      required: [
        'subject',
        'task',
        'report',
      ],
      run: writeReport,
    },
    {
      name: 'read_status',
      description: 'The STATUS, CHECK and BLOCKER lines of the report of a task.',
      properties: {
        subject: SUBJECT,
        task: TASK,
      },
      required: [
        'subject',
        'task',
      ],
      run: readStatus,
    },
    {
      name: 'finish_task',
      description: 'Mark a task done. Refused unless its report is DONE with a check at 0 errors.',
      properties: {
        subject: SUBJECT,
        task: TASK,
      },
      required: [
        'subject',
        'task',
      ],
      run: finish,
    },
    {
      name: 'block_task',
      description: 'Mark a task blocked.',
      properties: {
        subject: SUBJECT,
        task: TASK,
      },
      required: [
        'subject',
        'task',
      ],
      run: block,
    },
    {
      name: 'check_tasks',
      description: 'Check the form of tasks.md: one line per defect.',
      properties: { subject: SUBJECT },
      required: ['subject'],
      run: check,
    },
  ],
};

// Run the server only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  serve(server);
}

// Plays the evaluation tasks with OpenCode, without interaction, and records for each run whether it
// succeeded and how many tokens it used. One condition per call: "none" (no base), "0.1" or "0.2".
// No package; Node 22.18 or later. See README.md of this folder.
//   node run.ts --condition <none|0.1|0.2> [--runs 1] [--tasks t01,t02] [--kit <folder>]
//     [--projects <folder>] [--out results.jsonl] [--timeout-min 30] [--opencode-arg <arg>]...
import { spawnSync } from 'node:child_process';
import {
  appendFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
} from 'node:fs';
import {
  delimiter,
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface EvaluationTask {
  id: string;
  title: string;
  project: string;
  size: string;
  proof: string;
  test: string;
  request: string;
  folder: string;
}

export interface Usage {
  tokens: number;
  steps: number;
  subagents: number;
}

export interface Proof {
  passed: boolean;
  failedStep: string;
  output: string;
}

export interface ProofOptions {
  base: string;
  projects: string;
  binDir: string;
}

interface RunOptions extends ProofOptions {
  condition: string;
  out: string;
  timeoutMs: number;
  opencodeArgs: string[];
  kit?: string;
}

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = join(HERE, '..');
const CONDITIONS = [
  'none',
  '0.1',
  '0.2',
];
const MINUTE_MS = 60_000;

function headerOf(text: string): Map<string, string> {
  const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n');
  const end = lines[0] === '---' ? lines.indexOf('---', 1) : -1;

  return new Map(lines
    .slice(1, Math.max(end, 1))
    .map((line) => /^(\w+): (.*)$/.exec(line))
    .filter((match) => match !== null)
    .map((match) => [
      match[1] ?? '',
      (match[2] ?? '').replace(/^"(.*)"$/, '$1'),
    ]));
}

function section(text: string, name: string): string {
  const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n');
  const start = lines.indexOf(`## ${name}`);
  const end = lines.findIndex((line, position) => position > start && line.startsWith('## '));

  return start < 0 ? '' : lines
    .slice(start + 1, end < 0 ? undefined : end)
    .join('\n')
    .trim();
}

export function readTask(folder: string): EvaluationTask {
  const text = readFileSync(join(folder, 'task.md'), 'utf8');
  const header = headerOf(text);
  const field = (name: string): string => header.get(name) ?? '';

  return {
    id: field('id'),
    title: field('title'),
    project: field('project'),
    size: field('size'),
    proof: field('proof'),
    test: field('test'),
    request: section(text, 'Request'),
    folder,
  };
}

export function readTasks(tasks: string = join(HERE, 'tasks')): EvaluationTask[] {
  return readdirSync(tasks, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .map((name) => readTask(join(tasks, name)));
}

// The tokens of a run, from the JSON lines of "opencode run --format json": the input, output and
// reasoning tokens of every step_finish event, and the number of sub-agents started.
export function sumTokens(jsonLines: string): Usage {
  const usage: Usage = {
    tokens: 0,
    steps: 0,
    subagents: 0,
  };

  for (const line of jsonLines
    .split('\n')
    .filter((item) => item.trim().startsWith('{'))) {
    const event = JSON.parse(line) as {
      type?: string;
      part?: {
        tool?: string;
        tokens?: Record<string, number>;
      };
    };
    const tokens = event.part?.tokens ?? {};

    if (event.type === 'step_finish') {
      usage.steps += 1;
      usage.tokens += (tokens['input'] ?? 0) + (tokens['output'] ?? 0) + (tokens['reasoning'] ?? 0);
    } else if (event.type === 'tool_use' && event.part?.tool === 'subagent') {
      usage.subagents += 1;
    }
  }
  return usage;
}

// A command of a task, run with the packages of the evaluation projects: "npx --no -- tsc" runs the tsc
// of their node_modules, never a download.
function run(command: string, cwd: string, options: ProofOptions): {
  status: number;
  output: string;
} {
  const result = spawnSync(command.replace(/^npx --no (?:-- )?/, ''), {
    cwd,
    encoding: 'utf8',
    shell: true,
    env: {
      ...process.env,
      PATH: `${options.binDir}${delimiter}${process.env['PATH'] ?? ''}`,
      NG_CLI_ANALYTICS: 'false',
      CI: '1',
    },
  });

  return {
    status: result.status ?? 1,
    output: `${result.stdout}${result.stderr}`,
  };
}

type Step = [
  string,
  () => {
    status: number;
    output: string;
  },
];

function copyProof(project: string, task: EvaluationTask): {
  status: number;
  output: string;
} {
  mkdirSync(dirname(join(project, task.proof)), { recursive: true });
  cpSync(join(task.folder, 'proof.spec.ts'), join(project, task.proof));
  return {
    status: 0,
    output: '',
  };
}

function proofSteps(project: string, task: EvaluationTask, options: ProofOptions): Step[] {
  const tool = (name: string): string => `node "${join(options.base, 'tools', name)}"`;

  return [
    ['lint config', () => run(`${tool('install-lint.ts')} .`, project, options)],
    ['format', () => run(`${tool('format-file.ts')} --all`, project, options)],
    ['lint', () => run(`${tool('lint-file.ts')} --all`, project, options)],
    ['proof copy', () => copyProof(project, task)],
    ['build', () => run('npx --no -- tsc -p tsconfig.json', project, options)],
    ['test', () => run(task.test, project, options)],
  ];
}

// Proves a task in a project: the format and lint passes of its profile, then the proof test copied
// in, the build and the test. The first step that fails is the answer.
export function proveTask(project: string, task: EvaluationTask, options: ProofOptions): Proof {
  const profile = join(project, '.agents', 'profile.json');

  if (!existsSync(profile)) {
    mkdirSync(dirname(profile), { recursive: true });
    cpSync(join(options.projects, task.project, '.agents', 'profile.json'), profile);
  }
  for (const [
    name,
    step,
  ] of proofSteps(project, task, options)) {
    const result = step();

    if (result.status !== 0) {
      return {
        passed: false,
        failedStep: name,
        output: result.output.slice(-2000),
      };
    }
  }
  return {
    passed: true,
    failedStep: '',
    output: '',
  };
}

// The project of a run: the starting project, then the files of the condition.
function prepareProject(task: EvaluationTask, condition: string, folder: string, options: RunOptions): void {
  rmSync(folder, {
    recursive: true,
    force: true,
  });
  cpSync(join(options.projects, task.project), folder, { recursive: true });
  if (condition !== '0.2') {
    rmSync(join(folder, '.agents'), {
      recursive: true,
      force: true,
    });
  }
  if (options.kit !== undefined) {
    cpSync(options.kit, folder, {
      recursive: true,
      force: false,
    });
  }
  run('git init -q && git add -A && git -c user.name=evaluation -c user.email=evaluation@example.invalid commit -q -m start', folder, options);
}

function option(args: readonly string[], name: string): string[] {
  return args.flatMap((arg, index) => (arg === name && args[index + 1] !== undefined ? [args[index + 1] ?? ''] : []));
}

// One run of one task: prepare the project, let OpenCode work, prove the result, record it.
function playRun(task: EvaluationTask, index: number, options: RunOptions): void {
  const folder = join(options.projects, `zz-run-${task.id}-${options.condition}-${String(index)}`);
  const started = Date.now();

  prepareProject(task, options.condition, folder, options);
  const session = spawnSync(
    'opencode',
    [
      'run',
      '--format',
      'json',
      ...options.opencodeArgs,
      task.request,
    ],
    {
      cwd: folder,
      encoding: 'utf8',
      timeout: options.timeoutMs,
      maxBuffer: 256 * 1024 * 1024,
    },
  );
  const usage = sumTokens(session.stdout);
  const proof = proveTask(folder, task, options);
  const outcome = proof.passed ? 'success' : `failed at ${proof.failedStep}`;

  appendFileSync(options.out, `${JSON.stringify({
    task: task.id,
    size: task.size,
    condition: options.condition,
    run: index,
    success: proof.passed,
    failedStep: proof.failedStep,
    seconds: Math.round((Date.now() - started) / 1000),
    ...usage,
  })}\n`);
  process.stdout.write(`${task.id} run ${String(index)}: ${outcome}, ${String(usage.tokens)} tokens\n`);
}

function readOptions(args: readonly string[]): RunOptions {
  const projects = resolve(option(args, '--projects')[0] ?? join(HERE, 'projects'));
  const [kit] = option(args, '--kit');

  return {
    base: BASE,
    projects,
    binDir: join(projects, 'node_modules', '.bin'),
    condition: option(args, '--condition')[0] ?? '',
    out: resolve(option(args, '--out')[0] ?? 'results.jsonl'),
    timeoutMs: Number(option(args, '--timeout-min')[0] ?? '30') * MINUTE_MS,
    opencodeArgs: option(args, '--opencode-arg'),
    ...kit === undefined ? {} : { kit: resolve(kit) },
  };
}

function main(): void {
  const args = process.argv.slice(2);
  const options = readOptions(args);
  const wanted = new Set((option(args, '--tasks')[0] ?? '')
    .split(',')
    .filter((id) => id !== ''));
  const runs = Number(option(args, '--runs')[0] ?? '1');

  if (!CONDITIONS.includes(options.condition)) {
    process.stdout.write(`Usage: node run.ts --condition <${CONDITIONS.join('|')}> [--runs 1] [--tasks t01,t02] [--kit <folder>] [--out results.jsonl]\n`);
    process.exitCode = 2;
    return;
  }
  for (const task of readTasks().filter((item) => wanted.size === 0 || wanted.has(item.id))) {
    for (let index = 1; index <= runs; index += 1) {
      playRun(task, index, options);
    }
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

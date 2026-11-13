// Sums up the results of the evaluation: per condition, the share of successful runs and the tokens
// per run; per task, the successes of each condition. The base 0.2 passes when it succeeds more often
// than the base 0.1 and than no base, with no more tokens per run. No package; Node 22.18 or later.
//   node summary.ts results.jsonl [more-results.jsonl]...
import {
  readFileSync,
  realpathSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface RunRecord {
  task: string;
  condition: string;
  success: boolean;
  tokens: number;
}

export interface ConditionSummary {
  condition: string;
  runs: number;
  successes: number;
  successRate: number;
  tokensPerRun: number;
}

export interface Summary {
  conditions: ConditionSummary[];
  tasks: Map<string, Map<string, string>>;
  passes: boolean;
}

const ORDER = [
  'none',
  '0.1',
  '0.2',
];

export function readRecords(jsonLines: string): RunRecord[] {
  return jsonLines
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const record = JSON.parse(line) as Partial<RunRecord>;

      if (typeof record.task !== 'string' || typeof record.condition !== 'string' || typeof record.success !== 'boolean' || typeof record.tokens !== 'number') {
        throw new TypeError(`Bad record: ${line}`);
      }
      return record as RunRecord;
    });
}

function summarizeCondition(condition: string, records: readonly RunRecord[]): ConditionSummary {
  const runs = records.filter((record) => record.condition === condition);
  const successes = runs.filter((record) => record.success).length;
  const tokens = runs.reduce((sum, record) => sum + record.tokens, 0);

  return {
    condition,
    runs: runs.length,
    successes,
    successRate: runs.length === 0 ? 0 : successes / runs.length,
    tokensPerRun: runs.length === 0 ? 0 : Math.round(tokens / runs.length),
  };
}

export function summarize(records: readonly RunRecord[]): Summary {
  const conditions = ORDER
    .filter((condition) => records.some((record) => record.condition === condition))
    .map((condition) => summarizeCondition(condition, records));
  const tasks = new Map([...new Set(records.map((record) => record.task))]
    .sort()
    .map((task) => [
      task,
      new Map(conditions.map((item) => {
        const runs = records.filter((record) => record.task === task && record.condition === item.condition);

        return [
          item.condition,
          `${String(runs.filter((record) => record.success).length)}/${String(runs.length)}`,
        ];
      })),
    ]));
  const latest = conditions.find((item) => item.condition === '0.2');
  const others = conditions.filter((item) => item.condition !== '0.2');

  return {
    conditions,
    tasks,
    passes: latest !== undefined && others.length > 0 && others.every((item) => latest.successRate > item.successRate && latest.tokensPerRun <= item.tokensPerRun),
  };
}

// The summary as a short Markdown text, to read in two minutes.
export function formatSummary(summary: Summary): string {
  const names = summary.conditions.map((item) => item.condition);

  return [
    '| Condition | Runs | Successes | Tokens per run |',
    '| --- | --- | --- | --- |',
    ...summary.conditions.map((item) => `| ${item.condition} | ${String(item.runs)} | ${String(item.successes)} (${(item.successRate * 100).toFixed(0)} %) | ${String(item.tokensPerRun)} |`),
    '',
    `| Task | ${names.join(' | ')} |`,
    `| --- | ${names.map(() => '---').join(' | ')} |`,
    ...[...summary.tasks].map(([
      task,
      cells,
    ]) => `| ${task} | ${names.map((name) => cells.get(name) ?? '-').join(' | ')} |`),
    '',
    summary.passes ? 'Verdict: the base 0.2 succeeds more often than the others, with no more tokens per run.' : 'Verdict: the base 0.2 does not succeed more often than every other condition with no more tokens per run.',
  ].join('\n');
}

function main(): void {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    process.stdout.write('Usage: node summary.ts results.jsonl [more-results.jsonl]...\n');
    process.exitCode = 2;
    return;
  }
  const summary = summarize(files.flatMap((file) => readRecords(readFileSync(file, 'utf8'))));

  process.stdout.write(`${formatSummary(summary)}\n`);
  process.exitCode = summary.passes ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

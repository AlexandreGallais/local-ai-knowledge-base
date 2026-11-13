// Sums up an evaluation of the base: the same tasks played with and without the base, several runs
// each. It reads a CSV file with the header "task,condition,run,success,tokens", where condition is
// "with" or "without", success is 1 or 0, and tokens is the total used by the run.
//
// Usage: node scripts/evaluation-summary.ts <results.csv>
// The base passes when it succeeds more often with the base than without, with no more tokens in total.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export interface ConditionSummary {
  runs: number;
  successes: number;
  successRate: number;
  tokens: number;
}

export interface EvaluationSummary {
  with: ConditionSummary;
  without: ConditionSummary;
  passes: boolean;
}

function summarize(rows: string[][]): ConditionSummary {
  const successes = rows.filter((row) => row[3] === '1').length;

  return {
    runs: rows.length,
    successes,
    successRate: rows.length === 0 ? 0 : successes / rows.length,
    tokens: rows.reduce((total, row) => total + Number(row[4] ?? 0), 0),
  };
}

export function summarizeEvaluation(csv: string): EvaluationSummary {
  const rows = csv
    .split('\n')
    .map((text) => text.trim())
    .filter((text) => text !== '' && !text.startsWith('task,'))
    .map((text) => text.split(',').map((cell) => cell.trim()));

  for (const row of rows) {
    if (row.length !== 5 || ![
      'with',
      'without',
    ].includes(row[1] ?? '') || ![
      '0',
      '1',
    ].includes(row[3] ?? '') || Number.isNaN(Number(row[4]))) {
      throw new Error(`Bad row: ${row.join(',')}`);
    }
  }
  const withBase = summarize(rows.filter((row) => row[1] === 'with'));
  const withoutBase = summarize(rows.filter((row) => row[1] === 'without'));

  return {
    with: withBase,
    without: withoutBase,
    passes: withBase.successRate > withoutBase.successRate && withBase.tokens <= withoutBase.tokens,
  };
}

function line(name: string, summary: ConditionSummary): string {
  return `${name}: ${String(summary.successes)}/${String(summary.runs)} successes (${(summary.successRate * 100).toFixed(0)} %), ${String(summary.tokens)} tokens\n`;
}

function main(): void {
  const file = process.argv[2];

  if (file === undefined) {
    process.stderr.write('Usage: node scripts/evaluation-summary.ts <results.csv>\n');
    process.exitCode = 2;
    return;
  }
  const summary = summarizeEvaluation(readFileSync(file, 'utf8'));

  process.stdout.write(line('With the base', summary.with));
  process.stdout.write(line('Without the base', summary.without));
  process.stdout.write(summary.passes ? 'Evaluation passed: better with the base, with no more tokens.\n' : 'Evaluation failed: not better with the base, or more tokens.\n');
  process.exitCode = summary.passes ? 0 : 1;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main();
}

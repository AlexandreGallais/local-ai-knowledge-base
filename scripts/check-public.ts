// Checks that a repository can be made public: it holds only the base (no spec/ folder, no file of the
// project tool, no research report, no work note of a feature), and none of the forbidden terms appears in its
// files or in its history (contents and commit messages).
//
// Usage: node scripts/check-public.ts [repository] [--terms-file <file>]
// The forbidden terms come from PUBLIC_FORBIDDEN_TERMS (separated by ";") or from a local file, one
// term per line. They are never written in the repository; the report names them by number only.
// Exit code: 0 clean, 1 findings, 2 usage error.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

export interface PublicFinding {
  where: string;
  message: string;
}

const FORBIDDEN_PATHS: [RegExp, string][] = [
  [/^spec\//, 'file of the private specification'],
  [/^private\//, 'private file of the project'],
  [/(?:^|\/)\.opencode\//, 'generated OpenCode config of a project'],
  [/(?:^|\/)\.agents\/work\//, 'work file of a session'],
  [/(?:^|\/)results[^/]*\.jsonl$/, 'measures of an evaluation on the workstation'],
  [/^\.arsenal\//, 'file of the project tool'],
  [/(?:^|\/)CLAUDE\.md$/, 'file of the project tool'],
  [/^research\/(?!\.gitignore$)/, 'research report or annex'],
  [/^t\d+-[^/]+\/(?!\.gitignore$)/, 'research report or annex'],
  [/^f\d+-[^/]+\/(?!\.gitignore$)/, 'work note of a feature'],
];

function git(repository: string, args: string[]): string {
  const result = spawnSync('git', args, {
    cwd: repository,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${result.stderr}`);
  }
  return result.stdout;
}

function lines(text: string): string[] {
  return text
    .split('\n')
    .filter((line) => line !== '');
}

function termFindings(text: string, where: string, terms: string[]): PublicFinding[] {
  const lower = text.toLowerCase();

  return terms
    .map((term, index) => {
      return {
        term,
        index,
      };
    })
    .filter(({ term }) => lower.includes(term.toLowerCase()))
    .map(({ index }) => {
      return {
        where,
        message: `forbidden term #${String(index + 1)}`,
      };
    });
}

function pathFindings(files: string[]): PublicFinding[] {
  return files.flatMap((file) => FORBIDDEN_PATHS
    .filter(([pattern]) => pattern.test(file))
    .map(([, message]) => {
      return {
        where: file,
        message,
      };
    }));
}

function historyFindings(repository: string, terms: string[]): PublicFinding[] {
  return lines(git(repository, [
    'rev-list',
    '--all',
  ])).flatMap((commit) => {
    const changed = lines(git(repository, [
      'show',
      '--name-only',
      '--format=',
      commit,
    ]));

    return [
      ...termFindings(
        git(repository, [
          'show',
          '--format=%B%n%an',
          '--no-color',
          commit,
        ]),
        `commit ${commit.slice(0, 7)}`,
        terms,
      ),
      ...pathFindings(changed).map((item) => {
        return {
          ...item,
          where: `commit ${commit.slice(0, 7)}: ${item.where}`,
        };
      }),
    ];
  });
}

export function checkPublic(repository: string, terms: string[]): PublicFinding[] {
  const files = lines(git(repository, ['ls-files']));
  const contents = files.flatMap((file) => termFindings(readFileSync(resolve(repository, file), 'latin1'), file, terms));

  return [
    ...pathFindings(files),
    ...contents,
    ...historyFindings(repository, terms),
  ];
}

export function readTerms(environment: string | undefined, file: string | undefined): string[] {
  const text = file === undefined ? (environment ?? '')
    .split(';')
    .join('\n') : readFileSync(file, 'utf8');

  return lines(text)
    .map((term) => term.trim())
    .filter((term) => term !== '' && !term.startsWith('#'));
}

function main(): void {
  const {
    values,
    positionals,
  } = parseArgs({
    allowPositionals: true,
    options: { 'terms-file': { type: 'string' } },
  });
  const terms = readTerms(process.env['PUBLIC_FORBIDDEN_TERMS'], values['terms-file']);

  if (terms.length === 0) {
    process.stderr.write('No forbidden term: set PUBLIC_FORBIDDEN_TERMS or give --terms-file.\n');
    process.exitCode = 2;
    return;
  }
  const findings = checkPublic(resolve(positionals[0] ?? '.'), terms);

  for (const item of findings) {
    process.stdout.write(`${item.where}: ${item.message}\n`);
  }
  process.stdout.write(findings.length === 0 ? `Public check passed: ${String(terms.length)} term(s), files and history clean.\n` : `Public check failed: ${String(findings.length)} finding(s).\n`);
  process.exitCode = findings.length === 0 ? 0 : 1;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main();
}

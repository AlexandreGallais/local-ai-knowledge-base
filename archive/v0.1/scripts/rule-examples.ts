// Reads the wrong and right examples of the rule documents of code/docs/typescript-lint/, writes
// each one as a file of a copy of the example Angular project, then runs ESLint and TypeScript on
// them. A section heading names its rule: "## 1. Title (typescript-eslint no-floating-promises)".
import { spawnSync } from 'node:child_process';
import {
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  relative,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeSource } from './lint-sample.ts';

export interface Example {
  document: string;
  section: string;
  rule: string;
  kind: 'wrong' | 'right';
  language: 'ts' | 'html';
  code: string;
  file: string;
}

export interface Report {
  ruleIds: string[];
  compileErrors: string[];
}

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', 'docs', 'typescript-lint');
const WINDOWS = process.platform === 'win32';
const RULE_PREFIXES: Record<string, string> = {
  'typescript-eslint': '@typescript-eslint/',
  'angular-eslint template': '@angular-eslint/template/',
  'angular-eslint': '@angular-eslint/',
  'ESLint': '',
  'TypeScript': 'TypeScript ',
};
const HEADING = /^## \d+\. .+ \((typescript-eslint|angular-eslint template|angular-eslint|ESLint|TypeScript) ([\w-]+)\)$/;
const BLOCK = /^(Wrong|Right)\b[^\n]*:\n\n```(ts|html)\n([\s\S]*?)\n```$/gm;

export const PRELUDE = [
  'import { HttpClient } from \'@angular/common/http\';',
  'import { Component, EventEmitter, HostListener, Injectable, Input, inject, input, OnInit, Output, output, Service, signal } from \'@angular/core\';',
  'import { takeUntilDestroyed, toSignal } from \'@angular/core/rxjs-interop\';',
  'import { Router } from \'@angular/router\';',
  'import { Observable } from \'rxjs\';',
  '',
  'import { isValve, type Valve, type ValveState } from \'../app/valves/valve\';',
  'import { ValveApi } from \'../app/valves/valve-api\';',
  'import { AlarmFeed } from \'./prelude\';',
  '',
];

// The prelude ends with an empty item: joined by line breaks, it fills PRELUDE.length - 1 lines,
// and the example starts on the next one.
const PRELUDE_LINES = PRELUDE.length - 1;
const PRELUDE_FILE = [
  'import { Injectable } from \'@angular/core\';',
  'import { type Observable, of } from \'rxjs\';',
  '',
  '@Injectable({ providedIn: \'root\' })',
  'export class AlarmFeed {',
  '  public readonly messages$: Observable<string> = of(\'\');',
  '}',
  '',
].join('\n');

function sections(text: string): {
  heading: string;
  body: string;
}[] {
  return text
    .split(/^(?=## )/m)
    .map((part) => {
      const end = part.indexOf('\n');

      return {
        heading: part.slice(0, end),
        body: part.slice(end + 1),
      };
    });
}

export function readExamples(): Example[] {
  return readdirSync(DOCS)
    .filter((name) => name.endsWith('.md') && !name.endsWith('.fr.md'))
    .flatMap((name) => sections(readFileSync(join(DOCS, name), 'utf8')).flatMap((section, index) => {
      const heading = HEADING.exec(section.heading);
      const rule = heading === null ? '' : `${RULE_PREFIXES[heading[1]] ?? ''}${heading[2]}`;

      return [...section.body.matchAll(BLOCK)].map((match, position) => {
        const kind = match[1] === 'Wrong' ? 'wrong' : 'right';
        const language = match[2] === 'html' ? 'html' : 'ts';

        return {
          document: name,
          section: section.heading,
          rule,
          kind,
          language,
          code: match[3],
          file: `src/examples/${name.replace('.md', '')}-${index}-${kind}-${position}.${language}`,
        };
      });
    }));
}

export function writeExamples(project: string, examples: Example[]): void {
  writeSource(project, 'src/examples/prelude.ts', PRELUDE_FILE);
  for (const example of examples) {
    writeSource(project, example.file, example.language === 'ts' ? `${PRELUDE.join('\n')}${example.code}\n` : `${example.code}\n`);
  }
}

function runTool(project: string, name: string, args: string[]): ReturnType<typeof spawnSync> & { stdout: string } {
  return spawnSync(join(project, 'node_modules', '.bin', WINDOWS ? `${name}.cmd` : name), args, {
    cwd: project,
    encoding: 'utf8',
    shell: WINDOWS,
    maxBuffer: 64 * 1024 * 1024,
  });
}

function eslintResults(stdout: string): {
  filePath: string;
  messages: {
    ruleId: string | null;
    line: number;
    message: string;
  }[];
}[] {
  return JSON.parse(stdout) as ReturnType<typeof eslintResults>;
}

function reportOf(reports: Map<string, Report>, file: string): Report {
  const found = reports.get(file) ?? {
    ruleIds: [],
    compileErrors: [],
  };

  reports.set(file, found);
  return found;
}

// ESLint messages and TypeScript errors per example file, without those of the prelude lines.
export function lintExamples(project: string): Map<string, Report> {
  const eslint = runTool(project, 'eslint', [
    'src/examples',
    '--format',
    'json',
  ]);
  const tsc = runTool(project, 'tsc', [
    '--noEmit',
    '--pretty',
    'false',
    '-p',
    'tsconfig.json',
  ]);
  const reports = new Map<string, Report>();
  const report = (file: string): Report => reportOf(reports, file);

  if (eslint.status === null || eslint.status > 1 || eslint.stdout.trim() === '') {
    throw new Error(`ESLint did not run on the examples (exit ${String(eslint.status)}): ${String(eslint.stderr)}${String(eslint.error ?? '')}`);
  }
  for (const result of eslintResults(eslint.stdout)) {
    const file = relative(project, result.filePath)
      .split('\\')
      .join('/');
    const offset = file.endsWith('.ts') ? PRELUDE_LINES : 0;

    // report() also records a file linted without any message.
    report(file).ruleIds.push(...result.messages
      .filter((message) => message.line > offset)
      .map((message) => message.ruleId ?? `parse error: ${message.message}`));
  }
  for (const match of tsc.stdout.matchAll(/^(src\/examples\/[^(]+)\((\d+),\d+\): error (TS\d+): (.*)$/gm)) {
    if (Number(match[2]) > PRELUDE_LINES) {
      report(match[1]).compileErrors.push(`${match[3]} ${match[4]}`);
    }
  }
  return reports;
}

// Reads the wrong and right examples of the rule documents of code/docs/csharp-analysis/, writes
// each one as a C# file of a copy of the example .NET project, then builds it once. A section
// heading names its rule IDs: "## 1. Title (CA2016)" or "## 4. Title (project check async-void)".
import {
  readdirSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  sample,
  writeCode,
} from './csharp-sample.ts';

export interface CsharpExample {
  document: string;
  section: string;
  ids: string[];
  check: string;
  kind: 'wrong' | 'right';
  code: string;
  file: string;
}

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', 'docs', 'csharp-analysis');
const HEADING = /^## \d+\. .+ \(([^)]+)\)$/;
const RULE_ID = /^(?:CA|CS|IDE)\d{4}$/;
const BLOCK = /^(Wrong|Right)\b[^\n]*:\n\n```csharp\n([\s\S]*?)\n```$/gm;
const PRELUDE = [
  'using System.Globalization;',
  'using System.Text.Json;',
  'using Microsoft.Extensions.Logging;',
  'using Sample.Domain;',
  '',
];

function pascal(text: string): string {
  return text
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');
}

function headingTags(heading: string): {
  ids: string[];
  check: string;
} {
  const tags = HEADING.exec(heading)?.[1] ?? '';

  if (tags.startsWith('project check ')) {
    return {
      ids: [],
      check: tags.slice('project check '.length),
    };
  }
  const ids = tags.split(/,\s*/);

  return {
    ids: ids.every((id) => RULE_ID.test(id)) ? ids : [],
    check: '',
  };
}

export function readCsharpExamples(): CsharpExample[] {
  return readdirSync(DOCS)
    .filter((name) => name.endsWith('.md') && !name.endsWith('.fr.md'))
    .flatMap((name) => readFileSync(join(DOCS, name), 'utf8')
      .split(/^(?=## )/m)
      .flatMap((part, index) => {
        const heading = part.slice(0, part.indexOf('\n'));

        return [...part.matchAll(BLOCK)].map((match, position) => {
          const kind = match[1] === 'Wrong' ? 'wrong' : 'right';
          const id = pascal(`${name.replace('.md', '')} ${index} ${kind} ${position}`);

          return {
            document: name,
            section: heading,
            ...headingTags(heading),
            kind,
            code: match[2],
            file: `Examples/${id}.cs`,
          };
        });
      }));
}

// The namespace line comes right after the prelude: the example starts two lines below it.
export const PRELUDE_LINES = PRELUDE.length + 1;

export function writeCsharpExamples(project: string, examples: CsharpExample[]): void {
  for (const example of examples) {
    const namespace = `namespace Sample.Examples.${example.file.slice('Examples/'.length, -'.cs'.length)};`;

    writeCode(project, example.file, `${PRELUDE.join('\n')}${namespace}\n\n${example.code}\n`);
  }
}

// The rule IDs reported per example file, without those of the prelude lines.
export function buildCsharpExamples(project: string): Map<string, string[]> {
  sample('build', project);
  const log = readFileSync(join(project, 'build.log'), 'utf8');
  const reports = new Map<string, string[]>();

  for (const match of log.matchAll(/\/(Examples\/[A-Za-z0-9]+\.cs)\((\d+),\d+\): (?:error|warning) ([A-Z]+\d+):/g)) {
    if (Number(match[2]) > PRELUDE_LINES) {
      reports.set(match[1], [
        ...(reports.get(match[1]) ?? []),
        match[3],
      ]);
    }
  }
  return reports;
}

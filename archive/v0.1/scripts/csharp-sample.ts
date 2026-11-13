// Prepares a copy of the example .NET project with the C# configuration of the base, for the
// tests. Needs a .NET SDK, and the NuGet registry once for the packages and CSharpier.
import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Result {
  status: number | null;
  output: string;
}

const WORK = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPT = join(WORK, 'scripts', 'dotnet-sample.sh');

export function sample(command: string, ...args: string[]): Result {
  const result = spawnSync(
    'bash',
    [
      SCRIPT,
      command,
      ...args,
    ],
    { encoding: 'utf8' },
  );

  return {
    status: result.status,
    output: result.stdout + result.stderr,
  };
}

// Exit code 3 of the script: no .NET SDK on this machine.
export const HAS_DOTNET = sample('version').status === 0;

// A fresh copy of the example project, restored and formatted with the standard formatter.
export function prepareCsharp(): string {
  const project = realpathSync(mkdtempSync(join(tmpdir(), 'csharp-sample-')));

  sample('prepare', project);
  sample('restore', project);
  sample('format', project);
  return project;
}

export function writeCode(project: string, path: string, content: string): void {
  mkdirSync(dirname(join(project, path)), { recursive: true });
  writeFileSync(join(project, path), content);
}

export function setStrictFormatting(project: string, value: boolean): void {
  const path = join(project, 'Directory.Build.props');
  const text = readFileSync(path, 'utf8').replace(/<StrictFormatting>(true|false)<\/StrictFormatting>/, `<StrictFormatting>${String(value)}</StrictFormatting>`);

  writeFileSync(path, text);
}

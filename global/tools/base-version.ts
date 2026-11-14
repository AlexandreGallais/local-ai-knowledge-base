// Says whether the global base is there and recent enough for the project.
// Run from the project root, with Node 22.18 or later, no build step, no package:
//   node /opt/local-ai-base/tools/base-version.ts [base-folder] [project-folder]
// Prints one line. Exit code 0 when the AI can work, 1 when it must warn the user first.
import {
  existsSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface VersionCheck {
  ok: boolean;
  message: string;
}

function parts(version: string): number[] {
  return version
    .trim()
    .split('.')
    .map((part) => Number.parseInt(part, 10))
    .map((part) => Number.isNaN(part) ? 0 : part);
}

// Negative when a is older than b, 0 when equal, positive when newer.
export function compareVersions(a: string, b: string): number {
  const left = parts(a);
  const right = parts(b);
  const length = Math.max(left.length, right.length);

  for (let position = 0; position < length; position += 1) {
    const difference = (left[position] ?? 0) - (right[position] ?? 0);

    if (difference !== 0) {
      return difference;
    }
  }
  return 0;
}

function readExpected(projectFolder: string): string | undefined {
  const path = join(projectFolder, '.agents', 'profile.json');

  if (!existsSync(path)) {
    return undefined;
  }
  const profile = JSON.parse(readFileSync(path, 'utf8')) as { baseVersion?: unknown };

  return typeof profile.baseVersion === 'string' ? profile.baseVersion : undefined;
}

export function checkBaseVersion(baseFolder: string, projectFolder: string): VersionCheck {
  const versionPath = join(baseFolder, 'VERSION');

  if (!existsSync(versionPath)) {
    return {
      ok: false,
      message: `The global base is not installed: ${versionPath} is missing. Tell the user to install it, then stop.`,
    };
  }
  const installed = readFileSync(versionPath, 'utf8').trim();
  const expected = readExpected(projectFolder);

  if (expected === undefined) {
    return {
      ok: true,
      message: `Global base ${installed}. This project notes no version of the base: that is fine.`,
    };
  }
  if (compareVersions(installed, expected) < 0) {
    return {
      ok: false,
      message: `The global base is ${installed}; this project expects ${expected} or later. Tell the user to update the global base before you work.`,
    };
  }
  return {
    ok: true,
    message: `Global base ${installed}: up to date for this project (${expected}).`,
  };
}

function main(): void {
  const baseFolder = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
  const result = checkBaseVersion(baseFolder, resolve(process.argv[3] ?? '.'));

  console.log(result.message);
  process.exitCode = result.ok ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

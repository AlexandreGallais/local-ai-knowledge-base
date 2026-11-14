// Where the servers find the global base and the project.
import {
  existsSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { ToolError } from './mcp.ts';

export interface Profile {
  profile?: string;
  baseVersion?: string;
  checks?: Record<string, string>;
  copyright?: string;
}

// The global base: two folders above this file. BASE_ROOT in the environment overrides it (tests).
export function baseRoot(): string {
  return resolve(process.env['BASE_ROOT'] ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
}

// The project: the working folder OpenCode starts the server in. PROJECT_ROOT overrides it.
export function projectRoot(): string {
  return resolve(process.env['PROJECT_ROOT'] ?? process.cwd());
}

export function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) {
    return fallback;
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export function readProfile(project: string): Profile {
  return readJson<Profile>(join(project, '.agents', 'profile.json'), {});
}

// A path given by the model, resolved inside a folder; refused when it leaves the folder.
export function inside(folder: string, path: string): string {
  const full = resolve(folder, path);
  const way = relative(folder, full);

  if (way === '' || way.startsWith(`..${sep}`) || way === '..' || resolve(way) === way) {
    throw new ToolError(`"${path}" is outside ${folder}. Give a path inside it.`);
  }
  return full;
}

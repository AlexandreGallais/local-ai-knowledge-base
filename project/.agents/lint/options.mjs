// What the format and lint passes of this project need to know: what package.json lists (Angular,
// the JSDoc plugin) and the settings of .agents/profile.json (copyright line, selector prefix).
// A project lints more or less according to what it installs: nothing to choose by hand.
import {
  existsSync,
  readFileSync,
} from 'node:fs';
import { join } from 'node:path';

// This file is in <project>/.agents/lint/.
const PROJECT = join(import.meta.dirname, '..', '..');

function readJson(path) {
  try {
    return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
  } catch {
    return {};
  }
}

function escapeRegExp(value) {
  return value.replaceAll(/[$()*+.?[\\\]^{|}]/g, '\\$&');
}

/**
 * "Copyright (c) 2026 Example Corp." gives the comment to insert and the pattern that finds it, the
 * year matching any year.
 * @param {string | undefined} line The copyright line of the project.
 */
export function copyrightOptions(line) {
  if (typeof line !== 'string' || line.trim() === '') {
    return undefined;
  }
  const words = line
    .trim()
    .replace(/\b\d{4}\b/, '\u0000')
    .split('\u0000')
    .map((part) => escapeRegExp(part));

  return {
    pattern: words.join('\\d{4}'),
    text: `/*\n * ${line.trim()}\n */`,
  };
}

/**
 * The options of the passes for a project.
 * @param {string} project The project folder.
 */
export function projectOptions(project = PROJECT) {
  const settings = readJson(join(project, '.agents', 'profile.json'));
  const manifest = readJson(join(project, 'package.json'));
  const packages = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.peerDependencies,
  };

  return {
    angular: '@angular/core' in packages,
    jsdoc: 'eslint-plugin-jsdoc' in packages,
    ...typeof settings.prefix === 'string' ? { prefix: settings.prefix } : {},
    ...settings.copyright === undefined ? {} : { copyright: copyrightOptions(settings.copyright) },
  };
}

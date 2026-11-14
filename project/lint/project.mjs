// What the format and the lint read from this project: lint/settings.mjs (the copyright line, the
// selector prefix, the folders left out) and package.json (Angular rules with @angular/core, JSDoc
// rules with eslint-plugin-jsdoc). A project lints more or less according to what it installs.
import {
  existsSync,
  readFileSync,
} from 'node:fs';
import { join } from 'node:path';
import {
  COPYRIGHT,
  IGNORES,
  SELECTOR_PREFIX,
} from './settings.mjs';

// This file is in <project>/lint/.
const ROOT = join(import.meta.dirname, '..');
const SETTINGS = {
  copyright: COPYRIGHT,
  prefix: SELECTOR_PREFIX,
  ignores: IGNORES,
};

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
 * The options of the format and the lint of a project.
 * @param {string} root The project folder.
 * @param {{ copyright?: string, prefix?: string, ignores?: string[] }} settings The settings.
 */
export function projectOptions(root = ROOT, settings = SETTINGS) {
  const manifest = readJson(join(root, 'package.json'));
  const packages = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.peerDependencies,
  };

  return {
    angular: '@angular/core' in packages,
    jsdoc: 'eslint-plugin-jsdoc' in packages,
    prefix: settings.prefix ?? 'app',
    ignores: settings.ignores ?? [],
    copyright: copyrightOptions(settings.copyright),
  };
}

export const project = projectOptions();

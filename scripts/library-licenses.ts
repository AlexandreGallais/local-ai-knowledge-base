// The license files of the documentation sources, copied unchanged at the commit of the library into
// <base>/licenses/<tool>/, and the copyright lines they state. MIT, BSD, Apache and Artistic licenses
// ask that their text and the copyright notice travel with every copy; Creative Commons licenses ask
// for the license or its address. Used by scripts/fetch-library.ts, scripts/fetch-licenses.ts and
// scripts/check-library.ts; needs git, no package.
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { git } from './library-sources.ts';

export interface LicenseRecord {
  files: string[];
  copyright: string[];
}

export type Licenses = Record<string, LicenseRecord>;
// LICENSE, LICENSE.md, LICENSE.txt, LICENSE-CODE, LICENSE-MIT, license, COPYING, COPYRIGHT, NOTICE.
export const LICENSE_FILE = /^(?:licen[cs]e|copying|copyright|notice)(?:[-.][\w.-]+)?$/i;
const LICENSE_URLS: Record<string, string> = {
  'Apache-2.0': 'https://www.apache.org/licenses/LICENSE-2.0',
  'Artistic-2.0': 'https://opensource.org/license/artistic-2-0',
  'BSD-3-Clause': 'https://opensource.org/license/bsd-3-clause',
  'CC-BY-4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC-BY-SA-2.5': 'https://creativecommons.org/licenses/by-sa/2.5/',
  'MIT': 'https://opensource.org/license/mit',
};
// "Copyright" capitalised: the lower-case word starts sentences of license clauses, not notices.
const COPYRIGHT_LINE = /^(?:Copyright\b|COPYRIGHT\b|©)/;
// Template lines, clauses of the license text itself, and the copyright of the license document.
const NOT_A_HOLDER = /<(?:year|copyright holder|date|name)[^>]*>|\[(?:yyyy|name)[^\]]*\]|copyright (?:notice|holder|owner|and related|law|license|statement)|creative commons|perl foundation|free software foundation/i;
// An e-mail address after the name: the license file keeps it; the notice names the holder only.
const EMAIL = /\s*<[^<>\s]+@[^<>\s]+>/g;
// Node.js lists the licenses of its dependencies after its own: those are not the documentation's.
const DEPENDENCIES = /externally maintained libraries/i;

// The address of each license of an SPDX expression such as "MIT OR Apache-2.0".
export function licenseUrls(license: string): string[] {
  return license
    .split(/\s+(?:OR|AND)\s+/)
    .flatMap((id) => {
      const url = LICENSE_URLS[id.replaceAll(/[()]/g, '')];

      return url === undefined ? [] : [url];
    });
}

// The copyright lines a license file states for its own work, without the clauses of the license.
export function copyrightLines(text: string): string[] {
  const lines = text.split(/\r?\n/);
  const end = lines.findIndex((line) => DEPENDENCIES.test(line));
  const own = end === -1 ? lines : lines.slice(0, end);

  return [
    ...new Set(own
      .map((line) => line.trim().replace(/^#+\s*/, ''))
      .filter((line) => COPYRIGHT_LINE.test(line) && !NOT_A_HOLDER.test(line))
      .map((line) => line.replaceAll(EMAIL, ''))),
  ];
}

// The license files at the root of a clone, at a commit: name and text, unchanged.
export function licenseFiles(folder: string, commit: string): Record<string, string> {
  const names = git(folder, [
    'ls-tree',
    '--name-only',
    commit,
  ])
    .split('\n')
    .filter((name) => LICENSE_FILE.test(name));

  return Object.fromEntries(names.map((name) => [
    name,
    git(folder, [
      'show',
      `${commit}:${name}`,
    ]),
  ]));
}

// The license files of a repository at a commit, fetched without its other files.
export function remoteLicenseFiles(repository: string, commit: string): Record<string, string> {
  const folder = mkdtempSync(join(tmpdir(), 'licenses-'));

  try {
    for (const args of [
      ['init', '--quiet'],
      ['remote', 'add', 'origin', repository],
      ['config', 'remote.origin.promisor', 'true'],
      ['config', 'remote.origin.partialclonefilter', 'blob:none'],
      ['fetch', '--quiet', '--depth', '1', '--filter=blob:none', 'origin', commit],
    ]) {
      git(folder, args);
    }
    return licenseFiles(folder, commit);
  } finally {
    rmSync(folder, {
      recursive: true,
      force: true,
    });
  }
}

// Replaces <licensesRoot>/<tool>/ with the given files.
export function writeLicenses(licensesRoot: string, tool: string, files: Record<string, string>): void {
  const folder = join(licensesRoot, tool);

  rmSync(folder, {
    recursive: true,
    force: true,
  });
  mkdirSync(folder, { recursive: true });
  for (const [
    name,
    text,
  ] of Object.entries(files)) {
    writeFileSync(join(folder, name), text);
  }
}

// What <licensesRoot>/ holds: per tool, its license files and the copyright lines they state.
export function readLicenses(licensesRoot: string): Licenses {
  if (!existsSync(licensesRoot)) {
    return {};
  }
  return Object.fromEntries(readdirSync(licensesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const files = readdirSync(join(licensesRoot, entry.name))
        .filter((name) => LICENSE_FILE.test(name))
        .sort();

      return [
        entry.name,
        {
          files,
          copyright: [...new Set(files.flatMap((name) => copyrightLines(readFileSync(join(licensesRoot, entry.name, name), 'utf8'))))],
        },
      ];
    }));
}

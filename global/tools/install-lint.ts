// Writes the format and lint configs of a profile into a project, in .agents/lint/. The packages
// they import come from the project's node_modules, which the team installs once.
// Run with Node 22.18 or later, no package:
//   node /opt/local-ai-base/tools/install-lint.ts [project-folder]
// The profile, the copyright comment and the selector prefix come from .agents/profile.json.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface LintProfile {
  profile: string;
  prefix?: string;
  copyright?: string;
}

const LINT = join(dirname(fileURLToPath(import.meta.url)), '..', 'lint');

export const ANGULAR_PROFILES = new Set([
  'angular-app',
  'angular-lib',
]);

export const PROFILES = [
  'angular-app',
  'angular-lib',
  'ts-lib',
  'ts-pure-lib',
];

function escapeRegExp(value: string): string {
  return value.replaceAll(/[$()*+.?[\\\]^{|}]/g, '\\$&');
}

// "Copyright (c) 2026 Example Corp." gives the comment to insert and the pattern that finds it.
export function copyrightOptions(line: string | undefined): {
  pattern: string;
  text: string;
} | undefined {
  if (line === undefined || line.trim() === '') {
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

export function entryFiles(profile: LintProfile): Record<string, string> {
  const copyright = copyrightOptions(profile.copyright);
  const formatOptions = JSON.stringify({
    angular: ANGULAR_PROFILES.has(profile.profile),
    ...copyright === undefined ? {} : { copyright },
  });
  const lintOptions = JSON.stringify({
    ...profile.prefix === undefined ? {} : { prefix: profile.prefix },
    ...copyright === undefined ? {} : { copyright: { pattern: copyright.pattern } },
  });

  return {
    'format.config.mjs': `// Format pass of this project, written by install-lint.ts from .agents/profile.json.\nimport { formatConfig } from './format.mjs';\n\nexport default await formatConfig(${formatOptions});\n`,
    'lint.config.mjs': `// Lint pass of this project, written by install-lint.ts from .agents/profile.json.\nimport { lintConfig } from './profiles.mjs';\n\nexport default await lintConfig('${profile.profile}', ${lintOptions});\n`,
  };
}

export function installLint(project: string): string[] {
  const profilePath = join(project, '.agents', 'profile.json');

  if (!existsSync(profilePath)) {
    throw new Error('.agents/profile.json is missing: run apply-lint.ts with the profile the user wants first.');
  }
  const profile = JSON.parse(readFileSync(profilePath, 'utf8')) as LintProfile;

  if (!PROFILES.includes(profile.profile)) {
    throw new Error(`Unknown profile "${profile.profile}". Profiles: ${PROFILES.join(', ')}.`);
  }
  const target = join(project, '.agents', 'lint');
  const written: string[] = [];

  mkdirSync(target, { recursive: true });
  for (const name of readdirSync(LINT)) {
    copyFileSync(join(LINT, name), join(target, name));
    written.push(name);
  }
  for (const [
    name,
    content,
  ] of Object.entries(entryFiles(profile))) {
    writeFileSync(join(target, name), content);
    written.push(name);
  }
  return written.sort();
}

function main(): void {
  const project = resolve(process.argv[2] ?? '.');

  try {
    const written = installLint(project);

    console.log(`Lint and format configs written in ${join(project, '.agents', 'lint')}: ${written.join(', ')}.`);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

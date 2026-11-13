// Applies the profile the user confirmed at the welcome: .agents/profile.json, the format and lint
// configs of the profile, and the OpenCode config of the project (.opencode/opencode.json, kept out of
// Git by .git/info/exclude) that opens only the skills and agents of the profile. Running it again
// keeps what the team wrote: AGENTS.md, .agents/skills/ and the check commands of profile.json.
// No package; Node 22.18 or later.
//   node /opt/local-ai-base/tools/apply-profile.ts --profile <p> --subject "<s>" [--copyright "<c>"]
//     [--prefix <p>] [--convention "<rule>"]... [project-folder]
import {
  appendFileSync,
  existsSync,
  mkdirSync,
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
import { detectProject } from './detect-project.ts';
import {
  installLint,
  PROFILES,
} from './install-lint.ts';

export interface Answers {
  profile: string;
  subject: string;
  copyright?: string;
  prefix?: string;
  conventions?: string[];
}

interface ProfileFile {
  profile?: string;
  subject?: string;
  baseVersion?: string;
  copyright?: string;
  prefix?: string;
  checks?: Record<string, string>;
}

const BASE = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_MOUNT = '/opt/local-ai-base';
const SUBJECT_PLACEHOLDER = '- Subject: not set yet. The skill `welcome` writes it.';
const RULES_PLACEHOLDER = '- None yet. Add one line per rule that is true for this project only.';
const EXCLUDED = '.opencode/';

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as T : fallback;
}

// An Angular project tests with "ng test", even before "ng new" wrote angular.json.
function testCommand(project: string, profile: string): string {
  const runner = detectProject(project).testRunner;

  if (profile.startsWith('angular-') || runner.startsWith('ng test')) {
    return 'npx --no -- ng test --watch=false';
  }
  return runner === 'jest' ? 'npx --no -- jest' : 'npx --no -- vitest run';
}

export function defaultChecks(project: string, profile: string): Record<string, string> {
  return {
    format: `node ${BASE_MOUNT}/tools/format-file.ts --all`,
    lint: `node ${BASE_MOUNT}/tools/lint-file.ts --all`,
    build: 'npx --no -- tsc -p tsconfig.json',
    test: testCommand(project, profile),
  };
}

// The profiles each name of a map opens to: groups of skills, or specialised agents.
function namesFor(path: string, profile: string): {
  open: string[];
  closed: string[];
} {
  const map = readJson<Record<string, string[]>>(path, {});
  const names = Object
    .keys(map)
    .sort();

  return {
    open: names.filter((name) => map[name]?.includes(profile) === true),
    closed: names.filter((name) => map[name]?.includes(profile) !== true),
  };
}

// The OpenCode config of the project: the skills of the groups of the profile, and the specialised
// agents of the other profiles switched off.
export function projectConfig(profile: string, base: string = BASE): Record<string, unknown> {
  const groups = namesFor(join(base, 'skills', 'groups.json'), profile);
  const agents = namesFor(join(base, 'agents', 'profiles.json'), profile);

  return {
    $schema: 'https://opencode.ai/config.json',
    skills: groups.open.map((group) => `${BASE_MOUNT}/skills/${group}`),
    agents: Object.fromEntries(agents.closed.map((agent) => [
      agent,
      { disabled: true },
    ])),
  };
}

function writeProfile(project: string, answers: Answers): ProfileFile {
  const path = join(project, '.agents', 'profile.json');
  const before = readJson<ProfileFile>(path, {});
  const version = existsSync(join(BASE, 'VERSION')) ? readFileSync(join(BASE, 'VERSION'), 'utf8').trim() : undefined;
  const profile: ProfileFile = {
    ...before,
    profile: answers.profile,
    subject: answers.subject,
    ...version === undefined ? {} : { baseVersion: version },
    ...answers.copyright === undefined ? {} : { copyright: answers.copyright },
    ...answers.prefix === undefined ? {} : { prefix: answers.prefix },
    checks: before.checks ?? defaultChecks(project, answers.profile),
  };

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(profile, undefined, 2)}\n`);
  return profile;
}

// AGENTS.md belongs to the team: only its two placeholder lines are filled, the first time.
function fillAgentsFile(project: string, answers: Answers): void {
  const path = join(project, 'AGENTS.md');

  if (!existsSync(path)) {
    return;
  }
  const text = readFileSync(path, 'utf8');
  const rules = answers.conventions ?? [];
  const filled = text
    .replace(SUBJECT_PLACEHOLDER, `- Subject: ${answers.subject}`)
    .replace(RULES_PLACEHOLDER, rules.length === 0 ? RULES_PLACEHOLDER : rules.map((rule) => `- ${rule}`).join('\n'));

  if (filled !== text) {
    writeFileSync(path, filled);
  }
}

function excludeFromGit(project: string): void {
  const path = join(project, '.git', 'info', 'exclude');

  if (!existsSync(join(project, '.git'))) {
    return;
  }
  const text = existsSync(path) ? readFileSync(path, 'utf8') : '';

  if (!text
    .split('\n')
    .includes(EXCLUDED)) {
    mkdirSync(dirname(path), { recursive: true });
    appendFileSync(path, `${text === '' || text.endsWith('\n') ? '' : '\n'}${EXCLUDED}\n`);
  }
}

export function applyProfile(folder: string, answers: Answers): string[] {
  const project = resolve(folder);

  if (!PROFILES.includes(answers.profile)) {
    throw new Error(`Unknown profile "${answers.profile}". Profiles: ${PROFILES.join(', ')}.`);
  }
  writeProfile(project, answers);
  installLint(project);
  mkdirSync(join(project, '.opencode'), { recursive: true });
  writeFileSync(join(project, '.opencode', 'opencode.json'), `${JSON.stringify(projectConfig(answers.profile), undefined, 2)}\n`);
  excludeFromGit(project);
  fillAgentsFile(project, answers);
  return [
    '.agents/profile.json',
    '.agents/lint/',
    '.opencode/opencode.json',
  ];
}

function option(args: readonly string[], name: string): string[] {
  return args.flatMap((arg, index) => (arg === name && args[index + 1] !== undefined ? [args[index + 1] ?? ''] : []));
}

function main(): void {
  const args = process.argv.slice(2);
  const values = new Set(args.flatMap((arg, index) => (arg.startsWith('--') ? [index + 1] : [])));
  const folder = args.find((arg, index) => !arg.startsWith('--') && !values.has(index)) ?? '.';
  const [profile] = option(args, '--profile');
  const [subject] = option(args, '--subject');
  const [copyright] = option(args, '--copyright');
  const [prefix] = option(args, '--prefix');

  if (profile === undefined || subject === undefined) {
    console.log('Usage: node apply-profile.ts --profile <profile> --subject "<subject>" [--copyright "<line>"] [--prefix <prefix>] [--convention "<rule>"]... [project-folder]');
    process.exitCode = 2;
    return;
  }
  try {
    const written = applyProfile(folder, {
      profile,
      subject,
      ...copyright === undefined ? {} : { copyright },
      ...prefix === undefined ? {} : { prefix },
      conventions: option(args, '--convention'),
    });

    console.log(`Profile ${profile} applied: ${written.join(', ')}. Restart OpenCode so that it reads the skills and agents of the profile.`);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

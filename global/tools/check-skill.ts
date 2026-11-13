// Checks a skill of the project, in .agents/skills/<name>/SKILL.md: its header, its name, its
// sections and its size. No package; Node 22.18 or later.
//   node /opt/local-ai-base/tools/check-skill.ts .agents/skills/<name>
import {
  existsSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  basename,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_LINES = 150;
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRENCH = /\b(?:le|la|les|des|une|est|pour|avec|dans|qui|pas|cette|sont)\b/gi;
const WEB = /\b(?:search|look up|browse) (?:on |in )?the (?:web|internet)\b|\bgoogle it\b/i;

function headerField(lines: readonly string[], name: string): string {
  const line = lines.find((item) => item.startsWith(`${name}:`));

  return (line ?? '')
    .slice(name.length + 1)
    .trim();
}

// One line per defect of a skill; an empty list when it is well formed.
export function checkSkillText(folderName: string, text: string): string[] {
  const lines = text
    .replaceAll('\r\n', '\n')
    .trimEnd()
    .split('\n');
  const end = lines[0] === '---' ? lines.indexOf('---', 1) : -1;
  const header = end < 0 ? [] : lines.slice(1, end);
  const name = headerField(header, 'name');
  const sections = lines
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).trim());
  const frenchWords = text.match(FRENCH) ?? [];

  return [
    ...end < 0 ? ['missing YAML header between --- lines'] : [],
    ...name === folderName ? [] : [`name "${name}" differs from the folder "${folderName}"`],
    ...NAME.test(name) ? [] : ['name must use lower-case letters, digits and single hyphens'],
    ...headerField(header, 'description').startsWith('Use when') ? [] : ['description must start with "Use when"'],
    ...sections.some((section) => section.startsWith('Example')) ? [] : ['missing ## Example section'],
    ...sections.includes('Final check') ? [] : ['missing ## Final check section'],
    ...lines.length > MAX_LINES ? [`${lines.length} lines; keep a skill at ${MAX_LINES} lines or fewer`] : [],
    ...frenchWords.length >= 5 ? ['write the skill in English'] : [],
    ...WEB.test(text) ? ['never ask to search the web'] : [],
  ];
}

function main(): void {
  const folder = process.argv[2];

  if (folder === undefined) {
    console.log('Usage: node check-skill.ts .agents/skills/<name>');
    process.exitCode = 2;
    return;
  }
  const path = join(resolve(folder), 'SKILL.md');
  const problems = existsSync(path) ? checkSkillText(basename(resolve(folder)), readFileSync(path, 'utf8')) : [`${path} is missing`];

  for (const problem of problems) {
    console.log(`${path}: ${problem}`);
  }
  console.log(`${problems.length} findings.`);
  process.exitCode = problems.length === 0 ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

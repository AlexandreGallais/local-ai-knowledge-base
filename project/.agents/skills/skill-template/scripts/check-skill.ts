// Checks one skill folder against the rules of the skill catalogue (build guide, sections 5.4 to 5.11).
// A folder under .agents/skills/ must be a finished skill; a folder under .agents/skills-drafts/ must hold
// a skeleton SKILL.md with FILL markers, a BRIEF.md or a SEED.md. No package; Node 22.18 or later.
//   node .agents/skills/skill-template/scripts/check-skill.ts <skill-folder> [<skill-folder>...]
// Prints one line per finding, then "N findings."; exits 1 when there is any finding.
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_LINES = 500;
const MAX_GUARDRAIL_LINES = 60;
const MAX_DESCRIPTION = 1024;
const MAX_NAME = 64;
const CORE_RULE_WINDOW = 10;
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_SECTIONS = [
  'Stop and ask the human if',
  'Common mistakes',
  'Definition of done',
];
const NATURES = new Set([
  'guardrail',
  'process',
  'reference',
  'tooling',
  'template',
]);
const LOADS = new Set([
  'always',
  'auto',
  'manual',
  'auto+manual',
]);
const MODES = new Set([
  'R',
  'A',
  'B',
  'C',
  'D',
  'R+B',
  'R+C',
  'R+D',
]);
const BRIEF_SECTIONS = [
  'Final frontmatter (do not change)',
  'Goal',
  'Questions the skill must answer',
  'Where to look (files, commands, people)',
  'Required sections',
  'Acceptance tests',
  'Human input required (yes/no, what)',
];
const SEED_SECTIONS = [
  'Final frontmatter (do not change)',
  'Family template',
  'Topics checklist',
  'Known pitfalls to confirm or drop',
  'MCP servers and example queries',
];
const FILL = /<!-- FILL: what=[^;]+; find=[^;]+; verify=.+ -->/;
const FRENCH = /\b(?:le|la|les|des|une|est|pour|avec|dans|qui|pas|cette|sont|sur|aux)\b/gi;
const WEB = /\b(?:search|look up|browse) (?:on |in )?the (?:web|internet)\b|\bgoogle it\b/i;

export interface Header {
  fields: Map<string, string>;
  bodyStart: number;
}

function unquote(value: string): string {
  const trimmed = value.trim();

  return /^(["']).*\1$/.test(trimmed) ? trimmed.slice(1, -1) : trimmed;
}

// Reads the YAML header: top-level "key: value" lines and one level of nesting ("metadata.id").
export function readHeader(lines: readonly string[]): Header | undefined {
  if (lines[0] !== '---') {
    return undefined;
  }
  const end = lines.indexOf('---', 1);

  if (end < 0) {
    return undefined;
  }
  const fields = new Map<string, string>();
  let parent = '';

  for (const line of lines.slice(1, end)) {
    const match = /^(\s*)([A-Za-z_][\w-]*):(?:\s+(.*))?$/.exec(line);

    if (match === null) {
      continue;
    }
    const nested = (match[1] ?? '') !== '';
    const key = nested ? `${parent}.${match[2] ?? ''}` : match[2] ?? '';
    const value = match[3] ?? '';

    fields.set(key, unquote(value));
    if (!nested) {
      parent = value.trim() === '' ? match[2] ?? '' : '';
    }
  }
  return {
    fields,
    bodyStart: end + 1,
  };
}

// Each line with the H2 section it belongs to, and whether it sits in a fenced code block.
function sectionsOf(lines: readonly string[]): {
  text: string;
  section: string;
  inCode: boolean;
}[] {
  let fence = '';
  let section = '';

  return lines.map((text) => {
    const trimmed = text.trim();
    const opening = /^(`{3,}|~{3,})/.exec(trimmed);
    let inCode = fence !== '';

    if (inCode && trimmed.startsWith(fence) && trimmed
      .slice(fence.length)
      .trim() === '') {
      fence = '';
    } else if (!inCode && opening !== null) {
      fence = opening[1] ?? '';
      inCode = true;
    } else if (!inCode && /^##\s+/.test(trimmed)) {
      section = trimmed.replace(/^##\s+/, '');
    }
    return {
      text,
      section,
      inCode,
    };
  });
}

function prose(lines: readonly string[]): string {
  return sectionsOf(lines)
    .filter((line) => !line.inCode)
    .map((line) => line.text.replaceAll(/`[^`]*`/g, ' '))
    .join('\n');
}

function languageFindings(text: string, lines: readonly string[]): string[] {
  const french = prose(lines).match(FRENCH) ?? [];

  return [
    ...french.length >= 5 ? ['write the skill in English'] : [],
    ...WEB.test(text) ? ['never ask to search the web'] : [],
  ];
}

function headerFindings(folderName: string, header: Header): string[] {
  const name = header.fields.get('name') ?? '';
  const description = header.fields.get('description') ?? '';
  const nature = header.fields.get('metadata.nature') ?? '';
  const load = header.fields.get('metadata.load') ?? '';
  const mode = header.fields.get('metadata.mode') ?? '';
  const manual = `Manual: run only when the user explicitly asks for /${name}.`;

  return [
    ...name === folderName ? [] : [`name "${name}" differs from the folder "${folderName}"`],
    ...NAME.test(name) && name.length <= MAX_NAME ? [] : [`name must use lowercase letters, digits and single hyphens, ${MAX_NAME} characters at most`],
    ...description === '' ? ['missing description'] : [],
    ...description.length > MAX_DESCRIPTION ? [`description has ${description.length} characters; ${MAX_DESCRIPTION} at most`] : [],
    ...load === 'manual' && !description.startsWith(manual) ? [`a manual skill's description starts with "${manual}"`] : [],
    ...load !== 'manual' && !description.includes('Use when') ? ['description must say "Use when ..." with its triggers'] : [],
    ...(header.fields.get('metadata.id') ?? '') === '' ? ['missing metadata.id (the catalogue ID)'] : [],
    ...NATURES.has(nature) ? [] : [`metadata.nature "${nature}" is not one of ${[...NATURES].join(', ')}`],
    ...LOADS.has(load) ? [] : [`metadata.load "${load}" is not one of ${[...LOADS].join(', ')}`],
    ...MODES.has(mode) ? [] : [`metadata.mode "${mode}" is not one of ${[...MODES].join(', ')}`],
  ];
}

// The procedure: every numbered step carries its "- Check:" line.
function procedureFindings(lines: readonly string[]): string[] {
  const procedure = sectionsOf(lines).filter((line) => line.section === 'Procedure' && !line.inCode);
  const steps = procedure.filter((line) => /^\d+\.\s/.test(line.text)).length;
  const checks = procedure.filter((line) => /^\s+- Check:/.test(line.text)).length;

  return steps > checks ? [`${steps} steps in ## Procedure but ${checks} "- Check:" lines; every step needs its check`] : [];
}

function filesIn(folder: string): string[] {
  return existsSync(folder) ? readdirSync(folder) : [];
}

// A finished skill, in .agents/skills/<name>/.
export function checkFinished(folder: string): string[] {
  const path = join(folder, 'SKILL.md');

  if (!existsSync(path)) {
    return ['missing SKILL.md'];
  }
  const text = readFileSync(path, 'utf8');
  const lines = text
    .replaceAll('\r\n', '\n')
    .trimEnd()
    .split('\n');
  const header = readHeader(lines);

  if (header === undefined) {
    return ['missing YAML header between --- lines'];
  }
  const body = lines.slice(header.bodyStart);
  const sections = new Set(sectionsOf(body).map((line) => line.section));
  const nature = header.fields.get('metadata.nature') ?? '';
  const mode = header.fields.get('metadata.mode') ?? '';
  const coreWindow = body
    .filter((line) => line.trim() !== '')
    .slice(0, CORE_RULE_WINDOW);
  const references = filesIn(join(folder, 'references')).filter((file) => file !== 'SOURCE.md');

  return [
    ...headerFindings(basename(folder), header),
    ...REQUIRED_SECTIONS
      .filter((section) => !sections.has(section))
      .map((section) => `missing ## ${section} section`),
    ...coreWindow.some((line) => line.startsWith('**Core rule:**')) ? [] : [`the "**Core rule:**" line must be in the first ${CORE_RULE_WINDOW} lines of the body`],
    ...lines.length > MAX_LINES ? [`${lines.length} lines; ${MAX_LINES} at most`] : [],
    ...nature === 'guardrail' && lines.length > MAX_GUARDRAIL_LINES ? [`${lines.length} lines; a guardrail has ${MAX_GUARDRAIL_LINES} at most`] : [],
    ...procedureFindings(body),
    ...text.includes('<!-- FILL') ? ['FILL marker left: a finished skill has none'] : [],
    ...(/\bTODO\b/).test(prose(body)) ? ['TODO left in the prose of a finished skill'] : [],
    ...filesIn(folder)
      .filter((file) => file === 'BRIEF.md' || file === 'SEED.md')
      .map((file) => `${file} left in a finished skill`),
    ...mode.startsWith('R') && !existsSync(join(folder, 'references', 'SOURCE.md')) ? ['mode R needs references/SOURCE.md'] : [],
    ...references
      .filter((file) => !text.includes(`references/${file}`))
      .map((file) => `references/${file} is never cited in SKILL.md`),
    ...languageFindings(text, lines),
  ];
}

function headingsOf(text: string): Set<string> {
  return new Set(text
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).trim()));
}

// A draft, in .agents/skills-drafts/<name>/: a skeleton (mode B), a brief (mode C) or a seed (mode D).
export function checkDraft(folder: string): string[] {
  const files = filesIn(folder);
  const kinds = [
    'SKILL.md',
    'BRIEF.md',
    'SEED.md',
  ].filter((file) => files.includes(file));

  if (kinds.length !== 1) {
    return [`a draft holds exactly one of SKILL.md, BRIEF.md or SEED.md; found ${kinds.length}`];
  }
  const kind = kinds[0] ?? '';
  const text = readFileSync(join(folder, kind), 'utf8');
  const lines = text
    .replaceAll('\r\n', '\n')
    .trimEnd()
    .split('\n');
  const headings = headingsOf(text);

  if (kind === 'BRIEF.md') {
    return [
      ...lines[0]?.startsWith('# BRIEF: ') === true ? [] : ['a brief starts with "# BRIEF: <name>"'],
      ...BRIEF_SECTIONS
        .filter((section) => !headings.has(section))
        .map((section) => `missing ## ${section} section`),
      ...text.includes(`name: ${basename(folder)}`) ? [] : ['the final frontmatter must give the name of the folder'],
      ...languageFindings(text, lines),
    ];
  }
  if (kind === 'SEED.md') {
    return [
      ...lines[0]?.startsWith('# SEED: ') === true ? [] : ['a seed starts with "# SEED: <name>"'],
      ...SEED_SECTIONS
        .filter((section) => !headings.has(section))
        .map((section) => `missing ## ${section} section`),
      ...text.includes(`name: ${basename(folder)}`) ? [] : ['the final frontmatter must give the name of the folder'],
      ...languageFindings(text, lines),
    ];
  }
  const header = readHeader(lines);
  const markers = lines.filter((line) => line.includes('<!-- FILL'));

  return [
    ...header === undefined ? ['missing YAML header between --- lines'] : headerFindings(basename(folder), header),
    ...markers.length === 0 ? ['a skeleton holds at least one FILL marker'] : [],
    ...markers
      .filter((line) => !FILL.test(line))
      .map((line) => `malformed FILL marker: ${line.trim()}`),
    ...headings.has('Local completion checklist') ? [] : ['missing ## Local completion checklist section'],
    ...REQUIRED_SECTIONS
      .filter((section) => !headings.has(section))
      .map((section) => `missing ## ${section} section`),
    ...header !== undefined && (header.fields.get('metadata.mode') ?? '').startsWith('R') && !existsSync(join(folder, 'references', 'SOURCE.md')) ? ['mode R needs references/SOURCE.md'] : [],
    ...languageFindings(text, lines),
  ];
}

export function checkFolder(folder: string): string[] {
  return basename(dirname(resolve(folder))) === 'skills-drafts' ? checkDraft(folder) : checkFinished(folder);
}

function main(): void {
  const folders = process.argv.slice(2);

  if (folders.length === 0) {
    console.log('Usage: node check-skill.ts <skill-folder> [<skill-folder>...]');
    process.exitCode = 2;
    return;
  }
  let count = 0;

  for (const folder of folders) {
    for (const problem of checkFolder(folder)) {
      console.log(`${folder}: ${problem}`);
      count += 1;
    }
  }
  console.log(`${count} findings.`);
  process.exitCode = count === 0 ? 0 : 1;
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

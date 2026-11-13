// Checks the files of the knowledge base that the AI reads: common rules, skills, agents,
// documents and their indexes, the project kit, internal links and the OpenCode config.
// Run with Node 22.18 or later, no build step, no package:
//   node scripts/check-base.ts [repository-root]
import {
  existsSync,
  readFileSync,
  readdirSync,
  realpathSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkCards,
  checkPropertyNames,
  unitSuffixes,
} from './lib/catalog.ts';
import { parseJsonc } from './lib/jsonc.ts';
import {
  analyseLines,
  checkInstructionText,
  estimateTokens,
  type Finding,
  finding,
  parseHeader,
  splitLines,
} from './lib/markdown.ts';

export interface BaseResult {
  findings: Finding[];
  files: number;
}

// Where the global base is mounted in every dev container (decision 0019).
export const BASE_MOUNT = '/opt/local-ai-base';
const MAX_SKILL_LINES = 150;
const MAX_RULES_LINES = 80;
const MAX_AGENTS_MD_LINES = 60;
const MAX_DOCUMENT_TOKENS = 4000;
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DOCUMENT_FIELDS = [
  'id',
  'title',
  'topic',
  'summary',
  'sources',
  'license',
];
const AGENT_MODES = new Set([
  'primary',
  'subagent',
]);
const INDEX_LINE = /^- \[([^\]]+)\]\(([^)]+)\): (.+)$/;
const MARKDOWN_LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;

function read(path: string): string {
  return readFileSync(path, 'utf8');
}

function folders(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function markdownFiles(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(path, entry.name))
    .sort();
}

function allMarkdown(path: string, skip: (folder: string) => boolean): string[] {
  if (!existsSync(path) || skip(path)) {
    return [];
  }
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);

    if (entry.isDirectory()) {
      return allMarkdown(child, skip);
    }
    return entry.name.endsWith('.md') ? [child] : [];
  });
}

// The folders that hold skills: common, per group of profiles (global/skills/<group>), and the
// project kit.
export function skillFolders(root: string): string[] {
  return [
    join(root, 'global', 'opencode', 'skills'),
    ...folders(join(root, 'global', 'skills')).map((group) => join(root, 'global', 'skills', group)),
    join(root, 'project', '.agents', 'skills'),
  ].filter((path) => existsSync(path));
}

export function checkSkill(folderName: string, text: string, file: string): Finding[] {
  const header = parseHeader(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const name = header.fields.get('name') ?? '';
  const description = header.fields.get('description') ?? '';
  const sections = new Set(analyseLines(text).map((line) => line.section));
  const lineCount = splitLines(text.trimEnd()).length;
  const findings = [
    ...header.errors.map((error) => finding(file, error)),
    ...checkInstructionText(text, file),
  ];

  if (name !== folderName) {
    findings.push(finding(file, `name "${name}" differs from the folder "${folderName}"`));
  }
  if (!NAME_PATTERN.test(name)) {
    findings.push(finding(file, 'name must use lowercase letters, digits and single hyphens'));
  }
  if (!description.startsWith('Use when')) {
    findings.push(finding(file, 'description must start with "Use when"'));
  }
  if (![...sections].some((section) => section.startsWith('Example'))) {
    findings.push(finding(file, 'missing ## Example section'));
  }
  if (!sections.has('Final check')) {
    findings.push(finding(file, 'missing ## Final check section'));
  }
  if (lineCount > MAX_SKILL_LINES) {
    findings.push(finding(file, `${lineCount} lines; keep a skill at 150 lines or fewer`));
  }
  return findings;
}

// An agent names its mode, says what it does, and opens at least one skill that exists.
export function checkAgent(text: string, file: string, skillNames: Set<string>): Finding[] {
  const header = parseHeader(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const mode = header.fields.get('mode') ?? '';
  const skills = (header.lists.get('permissions') ?? [])
    .filter((rule) => rule.get('action') === 'skill' && rule.get('effect') === 'allow')
    .map((rule) => rule.get('resource') ?? '');
  const findings = [
    ...header.errors.map((error) => finding(file, error)),
    ...checkInstructionText(text, file),
  ];

  if ((header.fields.get('description') ?? '') === '') {
    findings.push(finding(file, 'missing description'));
  }
  if (!AGENT_MODES.has(mode)) {
    findings.push(finding(file, `mode must be primary or subagent, not "${mode}"`));
  }
  if (skills.length === 0) {
    findings.push(finding(file, 'the agent allows no skill: open the skill that holds its procedure'));
  }
  for (const skill of skills.filter((name) => name !== '*' && !skillNames.has(name))) {
    findings.push(finding(file, `allows the skill "${skill}", which does not exist`));
  }
  return findings;
}

export function checkDocument(text: string, file: string, topic: string): Finding[] {
  const header = parseHeader(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const findings = [
    ...header.errors.map((error) => finding(file, error)),
    ...checkInstructionText(text, file),
  ];

  for (const field of DOCUMENT_FIELDS.filter((name) => (header.fields.get(name) ?? '') === '' && !header.lists.has(name))) {
    findings.push(finding(file, `missing header field "${field}"`));
  }
  if (header.fields.get('topic') !== topic) {
    findings.push(finding(file, `topic must be "${topic}", the name of its folder`));
  }
  if (header.fields.get('id') !== basename(file, '.md')) {
    findings.push(finding(file, 'id must be the file name without .md'));
  }
  if (estimateTokens(text) > MAX_DOCUMENT_TOKENS) {
    findings.push(finding(file, `about ${estimateTokens(text)} tokens; split documents above 4000`));
  }
  return [
    ...findings,
    ...checkSinceColumns(text, file),
    ...FORMULA_TOPICS.has(topic) ? checkFormulaSections(text, file) : [],
  ];
}

// The topics where every section is a calculation: its formula, an example, a pitfall, its sources.
const FORMULA_TOPICS = new Set([
  'math',
  'geometry',
]);
const FORMULA_PARTS = [
  'Formula:',
  'Example:',
  'Pitfall:',
];

export function checkFormulaSections(text: string, file: string): Finding[] {
  const sections = text
    .split(/^## /m)
    .slice(1);

  return sections
    .filter((section) => !section.startsWith('Sources'))
    .flatMap((section) => {
      const heading = section.split('\n')[0] ?? '';
      const missing = FORMULA_PARTS.filter((part) => !new RegExp(`^${part}`, 'm').test(section));
      // A numbered source of the document, a run [E], or another document of the base.
      const cites = /\[(?:S\d+|E\d*)\]|`[\w./-]+\.md`/.test(section);

      return [
        ...missing.map((part) => finding(file, `section "${heading}" has no "${part}" line`)),
        ...cites ? [] : [finding(file, `section "${heading}" cites no source`)],
      ];
    });
}

function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim());
}

// In a table with a "Since" column, every row gives the version that brought the new way.
export function checkSinceColumns(text: string, file: string): Finding[] {
  const lines = analyseLines(text).filter((line) => !line.inCode);
  const findings: Finding[] = [];
  let column = -1;

  for (const line of lines) {
    const row = line.text.trim();

    if (!row.startsWith('|')) {
      column = -1;
    } else if (column === -1 && /\bSince\b/.test(row)) {
      column = cells(row).indexOf('Since');
    } else if (column !== -1 && !/^\|[\s:|-]+\|$/.test(row) && !/\d/.test(cells(row)[column] ?? '')) {
      findings.push(finding(file, `a row of the "Since" table has no version: ${row.slice(0, 60)}`));
    }
  }
  return findings;
}

// The index of a topic has one line per document: "- [title](file.md): summary".
export function checkTopicIndex(indexText: string, file: string, documents: string[]): Finding[] {
  const listed = new Set(analyseLines(indexText)
    .filter((line) => !line.inCode)
    .map((line) => INDEX_LINE.exec(line.text.trim())?.[2])
    .filter((target) => target !== undefined));

  return documents
    .filter((name) => !listed.has(name))
    .map((name) => finding(file, `the index does not list ${name}`));
}

// GitHub's heading anchor: lower case, spaces to hyphens, punctuation removed.
export function slug(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}\s_-]/gu, '')
    .replaceAll(/\s/g, '-');
}

function anchors(text: string): Set<string> {
  return new Set(analyseLines(text)
    .filter((line) => !line.inCode)
    .map((line) => /^#{1,6}\s+(.+)$/.exec(line.text.trim())?.[1])
    .filter((heading) => heading !== undefined)
    .map((heading) => slug(heading)));
}

// Every relative Markdown link leads to a file that exists, and to a heading that exists.
export function checkLinks(text: string, file: string, readTarget: (path: string) => string | undefined): Finding[] {
  return analyseLines(text)
    .filter((line) => !line.inCode)
    .flatMap((line) => [...line.text.matchAll(MARKDOWN_LINK)].map((match) => match[1] ?? ''))
    .filter((target) => !/^[a-z]+:/i.test(target))
    .flatMap((target) => {
      const [
        path = '',
        anchor,
      ] = target.split('#');
      const targetText = path === '' ? text : readTarget(resolve(dirname(file), path));

      if (targetText === undefined) {
        return [finding(file, `links to a missing file: ${path}`)];
      }
      if (anchor !== undefined && anchor !== '' && (path === '' || path.endsWith('.md')) && !anchors(targetText).has(anchor)) {
        return [finding(file, `links to a missing heading: ${target}`)];
      }
      return [];
    });
}

function checkSkills(root: string): BaseResult & { names: Set<string> } {
  const names = new Set<string>();
  const findings: Finding[] = [];
  let files = 0;

  for (const skillsFolder of skillFolders(root)) {
    for (const name of folders(skillsFolder)) {
      const path = join(skillsFolder, name, 'SKILL.md');

      if (!existsSync(path)) {
        findings.push(finding(path, 'missing SKILL.md'));
        continue;
      }
      if (names.has(name)) {
        findings.push(finding(path, `a skill named "${name}" already exists`));
      }
      names.add(name);
      files += 1;
      findings.push(...checkSkill(name, read(path), path));
    }
  }
  return {
    findings,
    files,
    names,
  };
}

function checkAgents(root: string, skillNames: Set<string>): BaseResult {
  const paths = markdownFiles(join(root, 'global', 'opencode', 'agents'));

  return {
    findings: paths.flatMap((path) => checkAgent(read(path), path, skillNames)),
    files: paths.length,
  };
}

// The cards of the symbol catalog, and the property names of every synoptics document.
function checkCatalog(documents: readonly string[]): Finding[] {
  const naming = documents.find((path) => basename(path) === 'symbol-property-naming.md');
  const suffixes = naming === undefined ? [] : unitSuffixes(read(naming));
  const indexTexts = documents
    .filter((path) => basename(path).startsWith('index-fr-en'))
    .map((path) => read(path));

  return documents.flatMap((path) => {
    const text = read(path);
    const cards = basename(path).startsWith('catalog-') ? checkCards(text, path, suffixes, indexTexts) : [];

    return [
      ...cards,
      ...checkPropertyNames(text, path, suffixes),
    ].map((item) => finding(item.file, item.message));
  });
}

function checkDocs(root: string): BaseResult {
  const docs = join(root, 'global', 'docs');
  const findings: Finding[] = [];
  let files = 0;

  for (const topic of folders(docs)) {
    const paths = markdownFiles(join(docs, topic));
    const indexPath = join(docs, topic, 'index.md');
    const documents = paths.filter((path) => basename(path) !== 'index.md');

    files += paths.length;
    if (existsSync(indexPath)) {
      findings.push(...checkTopicIndex(read(indexPath), indexPath, documents.map((path) => basename(path))));
    } else {
      findings.push(finding(indexPath, 'missing index.md for this topic'));
    }
    findings.push(...documents.flatMap((path) => checkDocument(read(path), path, topic)));
    if (topic === 'synoptics') {
      findings.push(...checkCatalog(documents));
    }
  }
  return {
    findings,
    files,
  };
}

function checkRules(root: string): BaseResult {
  const paths = markdownFiles(join(root, 'global', 'rules'));
  const findings = paths.flatMap((path) => {
    const text = read(path);
    const lines = splitLines(text.trimEnd()).length;

    return [
      ...checkInstructionText(text, path),
      ...lines > MAX_RULES_LINES ? [finding(path, `${lines} lines; rules are loaded at every step, keep 80 or fewer`)] : [],
    ];
  });

  return {
    findings,
    files: paths.length,
  };
}

function checkProjectKit(root: string): BaseResult {
  const path = join(root, 'project', 'AGENTS.md');

  if (!existsSync(path)) {
    return {
      findings: [finding(path, 'missing AGENTS.md in the project kit')],
      files: 0,
    };
  }
  const text = read(path);
  const lines = splitLines(text.trimEnd()).length;
  const findings = checkInstructionText(text, path);

  if (lines >= MAX_AGENTS_MD_LINES) {
    findings.push(finding(path, `${lines} lines; keep AGENTS.md under 60`));
  }
  return {
    findings,
    files: 1,
  };
}

function expandMounted(root: string, pattern: string): string[] {
  if (!pattern.startsWith(`${BASE_MOUNT}/`)) {
    return [];
  }
  const local = join(root, 'global', pattern.slice(BASE_MOUNT.length + 1));

  if (!local.includes('*')) {
    return existsSync(local) ? [local] : [];
  }
  const folder = dirname(local);
  const match = new RegExp(`^${basename(local).replaceAll('.', '\\.').replaceAll('*', '.*')}$`);

  return existsSync(folder) ? readdirSync(folder).filter((name) => match.test(name)) : [];
}

function checkOpenCodeConfig(root: string): BaseResult {
  const path = join(root, 'global', 'opencode', 'opencode.jsonc');

  if (!existsSync(path)) {
    return {
      findings: [],
      files: 0,
    };
  }
  let config: unknown;

  try {
    config = parseJsonc(read(path));
  } catch (error) {
    return {
      findings: [finding(path, `invalid JSONC: ${(error as Error).message}`)],
      files: 1,
    };
  }
  const instructions = (config as { instructions?: unknown }).instructions;
  const findings = Array.isArray(instructions) ? instructions
    .filter((entry): entry is string => typeof entry === 'string')
    .filter((entry) => expandMounted(root, entry).length === 0)
    .map((entry) => finding(path, `instructions entry matches no file of the base: ${entry}`)) : [finding(path, 'missing "instructions": the common rules are never loaded')];

  return {
    findings,
    files: 1,
  };
}

function checkAllLinks(root: string): BaseResult {
  const skip = (folder: string): boolean => [
    'library',
    'node_modules',
  ].includes(basename(folder));
  const paths = [
    ...allMarkdown(join(root, 'global'), skip),
    ...allMarkdown(join(root, 'project'), skip),
  ];
  const readTarget = (target: string): string | undefined => {
    if (!existsSync(target)) {
      return undefined;
    }
    return target.endsWith('.md') ? read(target) : '';
  };

  return {
    findings: paths.flatMap((path) => checkLinks(read(path), path, readTarget)),
    files: paths.length,
  };
}

export function checkBase(root: string): BaseResult {
  const skills = checkSkills(root);
  const results = [
    skills,
    checkAgents(root, skills.names),
    checkDocs(root),
    checkRules(root),
    checkProjectKit(root),
    checkOpenCodeConfig(root),
    checkAllLinks(root),
  ];

  return {
    findings: results.flatMap((result) => result.findings),
    files: results.reduce((sum, result) => sum + result.files, 0),
  };
}

function main(): void {
  const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
  const result = checkBase(root);

  for (const item of result.findings) {
    console.log(`${relative(root, item.file)}: ${item.message}`);
  }
  if (result.findings.length > 0) {
    console.log(`Base check failed: ${result.findings.length} finding(s) in ${result.files} file(s).`);
    process.exitCode = 1;
    return;
  }
  console.log(`Base check passed: ${result.files} file(s), 0 findings.`);
}

// Run main only when this file is the command, whatever symbolic links lead to it.
if (realpathSync(process.argv[1] ?? '.') === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

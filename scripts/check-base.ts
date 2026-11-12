// Checks the knowledge base: AGENTS.md, skills, documents, French summaries and chat models.
// Run with Node 22.18 or later, no build step, no package:
//   node scripts/check-base.ts [base-folder]
// Without a folder, it checks `code/` next to `scripts/`, or the folder above `scripts/` when
// that folder holds AGENTS.md (the base copied into a project).
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Finding {
  file: string;
  message: string;
}

interface FrontMatter {
  fields: Map<string, string>;
  body: string;
  errors: string[];
}

interface Line {
  text: string;
  inCode: boolean;
  section: string;
}

interface AgentsContext {
  skillNames: string[];
  documentPaths: string[];
  exists: (path: string) => boolean;
}

interface BaseResult {
  findings: Finding[];
  files: number;
}

const NEWLINE = '\n';
const MAX_AGENTS_LINES = 60;
const MAX_AGENTS_RULES = 30;
const MAX_INDEX_TOKENS = 2000;
const MAX_SKILL_LINES = 150;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 1024;
const MAX_DOCUMENT_TOKENS = 4000;
const MAX_SECTION_TOKENS = 1000;
const MAX_SUMMARY_WORDS = 20;
const MAX_CHAT_PROMPT_LINES = 40;
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DOCUMENT_FIELDS = [
  'id',
  'title',
  'topic',
  'summary',
  'tool',
  'version',
  'checked',
  'sources',
  'license',
  'variant',
];
const CHAT_MODEL_FIELDS = [
  'id',
  'subject',
  'knowledge',
  'skills',
  'access',
];
const AGENTS_SECTIONS = [
  'Rules',
  'Skills',
  'Index',
  'Final check',
];
const INDEX_LINE = /^- \[([^\]]+)\]\(([^)]+)\): (.+)$/;
const LIST_ITEM = /^\s*(?:[-*]|\d+\.)\s+/;
const URL = /https?:\/\/\S+/i;
const WEB_REQUESTS = [
  /\b(search|look\s+up|browse|check)\b.*\b(web|internet|online)\b/i,
  /\bweb\s+search\b/i,
  /\bgoogle\b/i,
  /\b(open|visit|fetch|follow|click|go\s+to)\b.*\b(url|link|website|web\s+page)\b/i,
];
const NEGATION = /\b(never|not|no|don't|cannot|can't|without)\b/i;
const SOFTWARE_NAMES = /\b(opencode|open\s*webui)\b/i;
const ALWAYS_ACTION = /^(run|execute|save|create|delete|move|rename|commit|edit|install)\b/i;
const FILE_ACTION = /^(write|read|open|list|add|update|copy|append)\b/i;
const FILE_HINT = /\bfiles?\b|`[^`]*[./][^`]*`/i;
const FILES_BEGIN = /^<!--\s*files:begin(?:\s+id=[\w-]+)?\s*-->$/;
const FILES_END = /^<!--\s*files:end\s*-->$/;
const FRENCH_WORDS = new Set([
  'le',
  'la',
  'les',
  'des',
  'du',
  'une',
  'est',
  'et',
  'pour',
  'avec',
  'dans',
  'que',
  'qui',
  'pas',
  'sur',
  'ce',
  'cette',
  'sont',
  'aux',
  'vous',
  'nous',
  'ne',
  'se',
  'chaque',
  'fichier',
]);

function tokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function splitLines(text: string): string[] {
  return text
    .replaceAll('\r\n', NEWLINE)
    .split(NEWLINE);
}

function finding(file: string, message: string): Finding {
  return {
    file,
    message,
  };
}

function headerEnd(lines: string[]): number {
  if (lines[0]?.trim() !== '---') {
    return -1;
  }
  return lines.findIndex((line, index) => index > 0 && line.trim() === '---');
}

export function parseFrontMatter(text: string): FrontMatter | undefined {
  const lines = splitLines(text);
  const end = headerEnd(lines);

  if (end < 0) {
    return undefined;
  }
  const fields = new Map<string, string>();
  const errors: string[] = [];
  let parent = '';

  for (const line of lines
    .slice(1, end)
    .filter((item) => item.trim() !== '')) {
    const match = /^(\s*)([A-Za-z_][\w-]*):(?:\s+(.*))?$/.exec(line);

    if (match === null) {
      errors.push(`header line is not "key: value": ${line.trim()}`);
      continue;
    }
    const nested = match[1] !== '';
    const key = nested ? `${parent}.${match[2]}` : match[2];
    const raw = (match[3] ?? '').trim();
    const quoted = /^(["']).*\1$/.test(raw);

    if (!quoted && raw.includes(': ')) {
      errors.push(`a colon followed by a space in "${key}" breaks the YAML header: quote the value`);
    }
    fields.set(key, quoted ? raw.slice(1, -1) : raw);
    parent = !nested && raw === '' ? match[2] : parent;
  }
  return {
    fields,
    body: lines
      .slice(end + 1)
      .join(NEWLINE),
    errors,
  };
}

function isFenceEnd(trimmed: string, fence: string): boolean {
  return trimmed.startsWith(fence) && trimmed
    .slice(fence.length)
    .trim() === '';
}

export function analyseLines(text: string): Line[] {
  const result: Line[] = [];
  let fence = '';
  let section = '';

  for (const content of splitLines(text)) {
    const trimmed = content.trim();
    const opening = /^(`{3,}|~{3,})/.exec(trimmed);
    let inCode = fence !== '';

    if (inCode && isFenceEnd(trimmed, fence)) {
      fence = '';
    } else if (!inCode && opening !== null) {
      fence = opening[1];
      inCode = true;
    } else if (!inCode) {
      section = /^##\s+(.+)$/
        .exec(trimmed)?.[1]
        .trim() ?? section;
    }
    result.push({
      text: content,
      inCode,
      section,
    });
  }
  return result;
}

function prose(lines: Line[]): string {
  return lines
    .filter((line) => !line.inCode)
    .map((line) => line.text.replaceAll(/`[^`]*`/g, ' '))
    .join(NEWLINE);
}

export function looksFrench(text: string): boolean {
  const words = text
    .toLowerCase()
    .match(/[a-zàâçéèêëîïôûùüÿœ']+/g) ?? [];
  const french = words.filter((word) => FRENCH_WORDS.has(word)).length;

  return french >= 5 && french / Math.max(words.length, 1) > 0.08;
}

function lineFindings(line: Line, file: string, allowUrlsInSources: boolean): Finding[] {
  const findings: Finding[] = [];
  const urlAllowed = allowUrlsInSources && line.section === 'Sources';

  if (URL.test(line.text) && !urlAllowed) {
    findings.push(finding(file, `URL outside the Sources section; links only cite sources: ${line.text.trim()}`));
  }
  if (WEB_REQUESTS.some((pattern) => pattern.test(line.text)) && !NEGATION.test(line.text)) {
    findings.push(finding(file, `asks to use the web: ${line.text.trim()}`));
  }
  return findings;
}

export function findWebRequests(text: string, file: string, allowUrlsInSources: boolean): Finding[] {
  return analyseLines(text)
    .filter((line) => !line.inCode)
    .flatMap((line) => lineFindings(line, file, allowUrlsInSources));
}

function checkEnglish(text: string, file: string): Finding[] {
  if (looksFrench(prose(analyseLines(text)))) {
    return [finding(file, 'written in French; every file for the AI is in English')];
  }
  return [];
}

function checkSoftwareNames(text: string, file: string): Finding[] {
  const line = analyseLines(text).find((item) => SOFTWARE_NAMES.test(item.text));

  if (line === undefined) {
    return [];
  }
  return [finding(file, `names a software; keep the content neutral: ${line.text.trim()}`)];
}

function commonFindings(text: string, file: string): Finding[] {
  return [
    ...findWebRequests(text, file, false),
    ...checkEnglish(text, file),
    ...checkSoftwareNames(text, file),
  ];
}

function markerFinding(trimmed: string, open: boolean, file: string): Finding | undefined {
  if (FILES_BEGIN.test(trimmed)) {
    return open ? finding(file, 'files block opened inside another files block') : undefined;
  }
  if (FILES_END.test(trimmed)) {
    return open ? undefined : finding(file, 'files:end without files:begin');
  }
  return finding(file, `malformed files marker: ${trimmed}`);
}

function checkMarkers(lines: Line[], file: string): Finding[] {
  const findings: Finding[] = [];
  let open = false;

  for (const line of lines) {
    const trimmed = line.text.trim();

    if (line.inCode || !trimmed.startsWith('<!--') || !trimmed.includes('files:')) {
      continue;
    }
    const problem = markerFinding(trimmed, open, file);

    if (problem !== undefined) {
      findings.push(problem);
    }
    open = FILES_BEGIN.test(trimmed) || (open && !FILES_END.test(trimmed));
  }
  if (open) {
    findings.push(finding(file, 'files block not closed: add <!-- files:end -->'));
  }
  return findings;
}

function isUnmarkedAction(line: Line): boolean {
  if (line.section !== 'Steps' || !LIST_ITEM.test(line.text)) {
    return false;
  }
  const step = line.text.replace(LIST_ITEM, '');

  return ALWAYS_ACTION.test(step) || (FILE_ACTION.test(step) && FILE_HINT.test(step));
}

function checkActionSteps(lines: Line[], file: string): Finding[] {
  const findings: Finding[] = [];
  let open = false;

  for (const line of lines.filter((item) => !item.inCode)) {
    const trimmed = line.text.trim();

    open = FILES_BEGIN.test(trimmed) || (open && !FILES_END.test(trimmed));
    if (!open && isUnmarkedAction(line)) {
      findings.push(finding(file, `step writes a file or runs a command but is not between the files markers: ${trimmed}`));
    }
  }
  return findings;
}

function checkSkillName(name: string, folderName: string, file: string): Finding[] {
  const findings: Finding[] = [];

  if (name !== folderName) {
    findings.push(finding(file, `name "${name}" differs from the folder "${folderName}"`));
  }
  if (!NAME_PATTERN.test(name) || name.length > MAX_NAME_LENGTH) {
    findings.push(finding(file, 'name must use lowercase letters, digits and single hyphens, 64 characters at most'));
  }
  return findings;
}

function checkSkillHeader(header: FrontMatter, folderName: string, file: string): Finding[] {
  const description = header.fields.get('description') ?? '';
  const findings = [
    ...header.errors.map((error) => finding(file, error)),
    ...checkSkillName(header.fields.get('name') ?? '', folderName, file),
  ];

  if (!description.includes('Use when')) {
    findings.push(finding(file, 'description must say when to use the skill: "Use when ..."'));
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    findings.push(finding(file, 'description is longer than 1024 characters'));
  }
  if (header.fields.get('metadata.variant') !== 'files') {
    findings.push(finding(file, 'metadata.variant must be "files" in the source skill'));
  }
  return findings;
}

function checkSkillSections(lines: Line[], file: string): Finding[] {
  const sections = lines
    .filter((line) => !line.inCode)
    .map((line) => line.section);
  const findings: Finding[] = [];

  if (!sections.some((section) => section.startsWith('Example'))) {
    findings.push(finding(file, 'missing ## Example section'));
  }
  if (!sections.includes('Final check')) {
    findings.push(finding(file, 'missing ## Final check section'));
  }
  return findings;
}

export function checkSkill(folderName: string, text: string, file: string): Finding[] {
  const header = parseFrontMatter(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const lineCount = splitLines(text.trimEnd()).length;
  const lines = analyseLines(text);
  const findings = [
    ...checkSkillHeader(header, folderName, file),
    ...checkSkillSections(lines, file),
    ...checkMarkers(lines, file),
    ...checkActionSteps(lines, file),
    ...commonFindings(text, file),
  ];

  if (lineCount > MAX_SKILL_LINES) {
    findings.push(finding(file, `${lineCount} lines; keep a skill at 150 lines or fewer`));
  }
  return findings;
}

function checkAgentsSize(lines: Line[], file: string): Finding[] {
  const outsideIndex = lines.filter((line) => line.section !== 'Index');
  const lineCount = outsideIndex.length - (outsideIndex
    .at(-1)?.text
    .trim() === '' ? 1 : 0);
  const rules = outsideIndex.filter((line) => !line.inCode && LIST_ITEM.test(line.text)).length;
  const findings: Finding[] = [];

  if (lineCount >= MAX_AGENTS_LINES) {
    findings.push(finding(file, `${lineCount} lines outside the index; keep fewer than 60`));
  }
  if (rules >= MAX_AGENTS_RULES) {
    findings.push(finding(file, `${rules} rules; keep fewer than 30`));
  }
  return findings;
}

function checkAgentsSections(lines: Line[], file: string): Finding[] {
  const sections = new Set(lines.map((line) => line.section));

  return AGENTS_SECTIONS
    .filter((section) => !sections.has(section))
    .map((section) => {
      return finding(file, `missing ## ${section} section`);
    });
}

function checkIndex(lines: Line[], file: string, context: AgentsContext): Finding[] {
  const indexLines = lines.filter((line) => line.section === 'Index' && !line.inCode);
  const indexed = new Set<string>();
  const findings: Finding[] = [];

  for (const line of indexLines.filter((item) => item.text.startsWith('- '))) {
    const match = INDEX_LINE.exec(line.text.trim());

    if (match === null) {
      findings.push(finding(file, `index line is not "- [Title](path): summary": ${line.text}`));
      continue;
    }
    indexed.add(match[2]);
    if (!context.exists(match[2])) {
      findings.push(finding(file, `index line points to a missing file: ${match[2]}`));
    }
  }
  if (tokens(indexLines
    .map((line) => line.text)
    .join(NEWLINE)) > MAX_INDEX_TOKENS) {
    findings.push(finding(file, 'index is over 2,000 tokens: switch to a map of topics with one index per topic'));
  }
  const missing = context.documentPaths.filter((path) => !indexed.has(path));

  return [
    ...findings,
    ...missing.map((path) => finding(file, `document missing from the index: ${path}`)),
  ];
}

function checkTriggers(lines: Line[], file: string, skillNames: string[]): Finding[] {
  const skillLines = lines.filter((line) => line.section === 'Skills' && !line.inCode);
  const hasTrigger = (name: string): boolean => {
    return skillLines.some((line) => line.text.includes(`\`${name}\``) && /load the skill/i.test(line.text));
  };

  return skillNames
    .filter((name) => !hasTrigger(name))
    .map((name) => {
      return finding(file, `no trigger line for the skill "${name}": "To <task>: load the skill \`${name}\`."`);
    });
}

export function checkAgentsMd(text: string, file: string, context: AgentsContext): Finding[] {
  const lines = analyseLines(text);

  return [
    ...checkAgentsSize(lines, file),
    ...checkAgentsSections(lines, file),
    ...checkIndex(lines, file, context),
    ...checkTriggers(lines, file, context.skillNames),
    ...commonFindings(text, file),
  ];
}

function missingFields(header: FrontMatter, fields: string[], file: string): Finding[] {
  return fields
    .filter((field) => (header.fields.get(field) ?? '') === '')
    .map((field) => {
      return finding(file, `missing header field "${field}"`);
    });
}

function checkDocumentHeader(header: FrontMatter, file: string, topic: string): Finding[] {
  const findings = [
    ...header.errors.map((error) => finding(file, error)),
    ...missingFields(header, DOCUMENT_FIELDS, file),
  ];
  const summaryWords = (header.fields.get('summary') ?? '')
    .split(/\s+/)
    .filter(Boolean).length;

  if (header.fields.has('topic') && header.fields.get('topic') !== topic) {
    findings.push(finding(file, `topic "${header.fields.get('topic')}" differs from the folder "${topic}"`));
  }
  if (header.fields.has('variant') && header.fields.get('variant') !== 'files') {
    findings.push(finding(file, 'variant must be "files" in the source document'));
  }
  if (summaryWords > MAX_SUMMARY_WORDS) {
    findings.push(finding(file, `summary has ${summaryWords} words; keep 20 or fewer`));
  }
  return findings;
}

function checkDocumentSections(body: string, file: string): Finding[] {
  const sections = new Map<string, string[]>();

  for (const line of analyseLines(body).filter((item) => item.section !== '')) {
    sections.set(line.section, [
      ...(sections.get(line.section) ?? []),
      line.text,
    ]);
  }
  const findings = sections.has('Sources') ? [] : [finding(file, 'missing ## Sources section')];

  for (const [
    section,
    content,
  ] of sections) {
    if (section !== 'Sources' && tokens(content.join(NEWLINE)) > MAX_SECTION_TOKENS) {
      findings.push(finding(file, `section "${section}" is over 1,000 tokens: split it`));
    }
  }
  return findings;
}

export function checkDocument(text: string, file: string, topic: string): Finding[] {
  const header = parseFrontMatter(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const findings = [
    ...checkDocumentHeader(header, file, topic),
    ...checkDocumentSections(header.body, file),
    ...findWebRequests(text, file, true),
    ...checkEnglish(text, file),
  ];

  if (tokens(text) > MAX_DOCUMENT_TOKENS) {
    findings.push(finding(file, 'over 4,000 tokens: split the document in two'));
  }
  return findings;
}

function checkChatPrompt(body: string, file: string): Finding[] {
  const lines = splitLines(body.trim());
  const firstRule = lines.find((line) => /^1\.\s/.test(line.trim())) ?? '';
  const findings: Finding[] = [];

  if (lines.length > MAX_CHAT_PROMPT_LINES) {
    findings.push(finding(file, 'system prompt over 40 lines; it is sent with every message'));
  }
  if (!/\bsearch\b/i.test(firstRule) || !/\bknowledge\b/i.test(firstRule)) {
    findings.push(finding(file, 'the first rule must tell the model to search its knowledge'));
  }
  if (body.includes('{{')) {
    findings.push(finding(file, 'variables make the prompt change; keep it static'));
  }
  return findings;
}

export function checkChatModel(text: string, file: string): Finding[] {
  const header = parseFrontMatter(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  return [
    ...header.errors.map((error) => finding(file, error)),
    ...missingFields(header, CHAT_MODEL_FIELDS, file),
    ...checkChatPrompt(header.body, file),
    ...commonFindings(text, file),
  ];
}

function markdownFiles(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder)
    .map((entry) => join(folder, entry))
    .flatMap((path) => {
      if (statSync(path).isDirectory()) {
        return markdownFiles(path);
      }
      return path.endsWith('.md') ? [path] : [];
    })
    .toSorted();
}

function subfolders(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder)
    .filter((entry) => statSync(join(folder, entry)).isDirectory())
    .toSorted();
}

function shown(path: string): string {
  return relative(process.cwd(), path) || path;
}

function read(path: string): string {
  return readFileSync(path, 'utf8');
}

function checkOneSkill(skillsFolder: string, name: string): BaseResult {
  const skillPath = join(skillsFolder, name, 'SKILL.md');

  if (!existsSync(skillPath)) {
    return {
      findings: [finding(shown(skillPath), 'skill folder without SKILL.md')],
      files: 0,
    };
  }
  const extras = markdownFiles(join(skillsFolder, name)).filter((path) => path !== skillPath);
  const findings = [
    ...checkSkill(name, read(skillPath), shown(skillPath)),
    ...extras.flatMap((path) => commonFindings(read(path), shown(path))),
  ];

  return {
    findings,
    files: 1 + extras.length,
  };
}

function checkFrenchFile(path: string, docsFolder: string): Finding[] {
  const depth = relative(docsFolder, path).split(/[\\/]/).length;
  const findings: Finding[] = [];

  if (basename(path) !== 'README.fr.md' || depth > 2) {
    findings.push(finding(shown(path), 'French files are docs/README.fr.md and docs/<topic>/README.fr.md only'));
  }
  if (!looksFrench(prose(analyseLines(read(path))))) {
    findings.push(finding(shown(path), 'French summary is not in French'));
  }
  return findings;
}

function checkDocsFile(path: string, docsFolder: string, summaries: Map<string, string>): Finding[] {
  const parts = relative(docsFolder, path).split(/[\\/]/);
  const text = read(path);

  if (path.endsWith('.fr.md')) {
    return checkFrenchFile(path, docsFolder);
  }
  if (parts.length === 1) {
    return [
      ...findWebRequests(text, shown(path), true),
      ...checkEnglish(text, shown(path)),
    ];
  }
  summaries.set(`docs/${parts.join('/')}`, parseFrontMatter(text)?.fields.get('summary') ?? '');
  return checkDocument(text, shown(path), parts[0]);
}

function checkDocs(docsFolder: string, summaries: Map<string, string>): BaseResult {
  const files = markdownFiles(docsFolder);
  const overview = join(docsFolder, 'README.fr.md');
  const findings = files.flatMap((path) => checkDocsFile(path, docsFolder, summaries));
  const topicsWithoutSummary = subfolders(docsFolder).filter((topic) => {
    return !existsSync(join(docsFolder, topic, 'README.fr.md'));
  });

  if (!existsSync(overview)) {
    findings.push(finding(shown(overview), 'missing French overview of the base'));
  }
  for (const topic of topicsWithoutSummary) {
    findings.push(finding(shown(join(docsFolder, topic, 'README.fr.md')), 'missing French summary of the topic'));
  }
  return {
    findings,
    files: files.length,
  };
}

function checkIndexSummaries(text: string, file: string, summaries: Map<string, string>): Finding[] {
  return analyseLines(text)
    .filter((line) => line.section === 'Index')
    .map((line) => INDEX_LINE.exec(line.text.trim()))
    .filter((match) => match !== null)
    .filter((match) => summaries.has(match[2]) && summaries.get(match[2]) !== match[3])
    .map((match) => finding(file, `index line of ${match[2]} differs from the summary in its header`));
}

function checkFolder(paths: string[], check: (text: string, file: string) => Finding[]): BaseResult {
  return {
    findings: paths.flatMap((path) => check(read(path), shown(path))),
    files: paths.length,
  };
}

function merge(results: BaseResult[]): BaseResult {
  return {
    findings: results.flatMap((result) => result.findings),
    files: results.reduce((total, result) => total + result.files, 0),
  };
}

export function checkBase(base: string, chatModels?: string): BaseResult {
  const agentsPath = join(base, 'AGENTS.md');

  if (!existsSync(agentsPath)) {
    return {
      findings: [finding(shown(agentsPath), 'missing AGENTS.md')],
      files: 0,
    };
  }
  const skillsFolder = join(base, '.agents', 'skills');
  const skillNames = subfolders(skillsFolder);
  const summaries = new Map<string, string>();
  const docs = checkDocs(join(base, 'docs'), summaries);
  const agentsText = read(agentsPath);
  const agents = [
    ...checkAgentsMd(agentsText, shown(agentsPath), {
      skillNames,
      documentPaths: [...summaries.keys()],
      exists: (path) => existsSync(join(base, path)),
    }),
    ...checkIndexSummaries(agentsText, shown(agentsPath), summaries),
  ];

  return merge([
    ...skillNames.map((name) => checkOneSkill(skillsFolder, name)),
    docs,
    {
      findings: agents,
      files: 1,
    },
    checkFolder(markdownFiles(join(base, 'templates')), checkEnglish),
    checkFolder(chatModels === undefined ? [] : markdownFiles(chatModels), checkChatModel),
  ]);
}

export function resolveRoots(argument?: string): {
  base: string;
  chatModels?: string;
} {
  const scripts = dirname(fileURLToPath(import.meta.url));
  const inRepository = existsSync(join(scripts, '..', 'code', 'AGENTS.md'));
  const fallback = inRepository ? resolve(scripts, '..', 'code') : resolve(scripts, '..');
  const base = argument === undefined ? fallback : resolve(argument);
  const chatModels = basename(base) === 'code' ? join(dirname(base), 'chat', 'models') : join(base, 'chat', 'models');

  return {
    base,
    chatModels: existsSync(chatModels) ? chatModels : undefined,
  };
}

function main(): void {
  const roots = resolveRoots(process.argv[2]);
  const {
    findings,
    files,
  } = checkBase(roots.base, roots.chatModels);

  for (const item of findings) {
    console.log(`${item.file}: ${item.message}`);
  }
  if (findings.length > 0) {
    console.log(`Base check failed: ${findings.length} finding(s) in ${files} file(s).`);
    process.exitCode = 1;
    return;
  }
  console.log(`Base check passed: ${files} file(s), 0 findings.`);
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}

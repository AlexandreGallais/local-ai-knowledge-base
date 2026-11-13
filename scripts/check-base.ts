// Checks the knowledge base: AGENTS.md, skills, documents, French summaries and chat models.
// Run with Node 22.18 or later, no build step, no package:
//   node scripts/check-base.ts [base-folder]
// Without a folder, it checks `code/` next to `scripts/`, or the folder above `scripts/` when
// that folder holds AGENTS.md (the base copied into a project).
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
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
  // The text of a topic index (docs/<topic>/index.md), or undefined when it is missing.
  readIndex?: (path: string) => string | undefined;
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
  'name',
  'description',
  'subject',
  'scope',
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
const CHAT_SCOPES = new Set([
  'subject',
  'restricted',
]);
const SEARCH_KNOWLEDGE = /\bsearch\b.*\bknowledge\b/i;
const ANY_MARKER = /^<!--\s*(?:files|chat):/;
const SCOPE_RULE = /\brefuse\b.*\bone sentence\b/i;
const SOFTWARE_NAMES = /\b(opencode|open\s*webui)\b/i;
const ALWAYS_ACTION = /^(run|execute|save|create|delete|move|rename|commit|edit|install)\b/i;
const FILE_ACTION = /^(write|read|open|list|add|update|copy|append)\b/i;
const FILE_HINT = /\bfiles?\b|`[^`]*[./][^`]*`/i;
const FILES_BEGIN = /^<!--\s*files:begin(?:\s+id=[\w-]+)?\s*-->$/;
const FILES_END = /^<!--\s*files:end\s*-->$/;
const FILES_BEGIN_ID = /^<!--\s*files:begin\s+id=([\w-]+)\s*-->$/;
const CHAT_BEGIN = /^<!--\s*chat:begin\s+id=([\w-]+)\s*-->$/;
const CHAT_END = /^<!--\s*chat:end\s*-->$/;
const SKILL_ENTRIES = new Set([
  'SKILL.md',
  'chat.md',
  'references',
  'scripts',
  'assets',
]);
const PLAIN_JAVASCRIPT = /\.(?:js|mjs|cjs)$/;
const SCRIPT_FILE = /\.(?:ts|cs|sh)$/;
const HEAVY_LINE = /Heavy files:/i;
const HEAVY_SECTION = 'Heavy files';
const EXTENSION = /(?<![\w/.])\.[a-z\d]+\b/gi;
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
  // The Sources section of a document only cites: a publisher such as Google is no request.
  if (!urlAllowed && WEB_REQUESTS.some((pattern) => pattern.test(line.text)) && !NEGATION.test(line.text)) {
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

function checkMarkerIds(text: string, file: string): Finding[] {
  const ids = markerIds(text, FILES_BEGIN_ID);

  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))].map((id) => {
    return finding(file, `files block id=${id} appears twice`);
  });
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
    ...checkMarkerIds(text, file),
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

const TOPIC_INDEX = /^docs\/[^/]+\/index\.md$/;

// Reads index lines into `indexed`; a line that points to a topic index (docs/<topic>/index.md)
// adds the lines of that index instead.
function readIndexLines(lines: Line[], file: string, context: AgentsContext, indexed: Set<string>): Finding[] {
  const findings: Finding[] = [];

  for (const line of lines.filter((item) => !item.inCode && item.text.startsWith('- '))) {
    const match = INDEX_LINE.exec(line.text.trim());

    if (match === null) {
      findings.push(finding(file, `index line is not "- [Title](path): summary": ${line.text}`));
      continue;
    }
    if (!context.exists(match[2])) {
      findings.push(finding(file, `index line points to a missing file: ${match[2]}`));
      continue;
    }
    if (TOPIC_INDEX.test(match[2]) && context.readIndex !== undefined) {
      findings.push(...checkTopicIndex(match[2], context, indexed));
      continue;
    }
    indexed.add(match[2]);
  }
  return findings;
}

function checkTopicIndex(path: string, context: AgentsContext, indexed: Set<string>): Finding[] {
  const text = context.readIndex?.(path) ?? '';
  const lines = analyseLines(text);
  const findings = readIndexLines(lines, path, context, indexed);

  if (tokens(text) > MAX_INDEX_TOKENS) {
    findings.push(finding(path, 'topic index is over 2,000 tokens: split the topic in two'));
  }
  return findings;
}

function checkIndex(lines: Line[], file: string, context: AgentsContext): Finding[] {
  const indexLines = lines.filter((line) => line.section === 'Index' && !line.inCode);
  const indexed = new Set<string>();
  const findings = readIndexLines(indexLines, file, context, indexed);

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
      return finding(file, `no trigger line for the skill "${name}": "| To <task> | load the skill \`${name}\` |"`);
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

function listField(header: FrontMatter, name: string): string[] {
  const value = (header.fields.get(name) ?? '').trim();

  return value === 'none' || value === '' ? [] : value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function checkKnowledgeRule(lines: string[], hasKnowledge: boolean, file: string): Finding[] {
  const firstRule = lines.find((line) => /^1\.\s/.test(line.trim())) ?? '';
  const searchLine = lines.find((line) => SEARCH_KNOWLEDGE.test(line) && !NEGATION.test(line));

  if (hasKnowledge && !SEARCH_KNOWLEDGE.test(firstRule)) {
    return [finding(file, 'the first rule must tell the model to search its knowledge')];
  }
  if (!hasKnowledge && searchLine !== undefined) {
    return [finding(file, `knowledge: none, but the prompt asks to search a knowledge: ${searchLine.trim()}`)];
  }
  return [];
}

function checkChatHeader(header: FrontMatter, file: string): Finding[] {
  const id = header.fields.get('id') ?? '';
  const scope = header.fields.get('scope') ?? '';
  const findings: Finding[] = [];

  if (id !== '' && !NAME_PATTERN.test(id)) {
    findings.push(finding(file, `id "${id}" must use lowercase letters, digits and single hyphens, no space`));
  }
  if (scope !== '' && !CHAT_SCOPES.has(scope)) {
    findings.push(finding(file, `scope must be "subject" or "restricted": ${scope}`));
  }
  return findings;
}

function checkChatSize(header: FrontMatter, promptLines: number, skillLines: Map<string, number>, file: string): Finding[] {
  const skills = listField(header, 'skills');
  const missing = skills.filter((name) => !skillLines.has(name));
  const findings = missing.map((name) => finding(file, `attached skill not found in .agents/skills/: ${name}`));
  const total = promptLines + skills.reduce((sum, name) => sum + (skillLines.get(name) ?? 0), 0);

  if (listField(header, 'knowledge').length === 0 && total > MAX_SKILL_LINES) {
    findings.push(finding(file, `system prompt and attached skills make ${total} lines; without knowledge they are sent with every message: keep 150 or fewer`));
  }
  return findings;
}

function checkChatPrompt(header: FrontMatter, file: string): Finding[] {
  const lines = splitLines(header.body.trim());
  const findings = checkKnowledgeRule(lines, listField(header, 'knowledge').length > 0, file);

  if (lines.length > MAX_CHAT_PROMPT_LINES) {
    findings.push(finding(file, 'system prompt over 40 lines; it is sent with every message'));
  }
  if (header.fields.get('scope') === 'restricted' && !lines.some((line) => SCOPE_RULE.test(line))) {
    findings.push(finding(file, 'restricted model without its scope rule: "If the request is not about <subject>, refuse in one sentence and say what you can do."'));
  }
  if (header.body.includes('{{')) {
    findings.push(finding(file, 'variables make the prompt change; keep it static'));
  }
  return findings;
}

export function checkChatModel(text: string, file: string, skillLines?: Map<string, number>): Finding[] {
  const header = parseFrontMatter(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  return [
    ...header.errors.map((error) => finding(file, error)),
    ...missingFields(header, CHAT_MODEL_FIELDS, file),
    ...checkChatHeader(header, file),
    ...checkChatPrompt(header, file),
    ...(skillLines === undefined ? [] : checkChatSize(header, splitLines(header.body.trim()).length, skillLines, file)),
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

function filesIn(folder: string): string[] {
  if (!existsSync(folder)) {
    return [];
  }
  return readdirSync(folder)
    .filter((entry) => !statSync(join(folder, entry)).isDirectory())
    .toSorted();
}

function checkSkillLayout(folder: string): Finding[] {
  return readdirSync(folder)
    .filter((entry) => !SKILL_ENTRIES.has(entry))
    .map((entry) => {
      return finding(shown(join(folder, entry)), 'unexpected entry; a skill folder holds SKILL.md, chat.md, references/, scripts/ and assets/ only');
    });
}

function citedFiles(text: string, pattern: RegExp): Set<string> {
  return new Set([...text.matchAll(pattern)].map((match) => match[1]));
}

function checkReferences(folder: string, name: string, skillText: string): BaseResult {
  const referencesFolder = join(folder, 'references');
  const files = filesIn(referencesFolder);
  const cited = citedFiles(skillText, new RegExp(`(?:\\.agents/skills/${name}/)?references/([\\w.-]+)`, 'g'));
  const findings = files.flatMap((file) => {
    const path = join(referencesFolder, file);

    if (!file.endsWith('.md')) {
      return [finding(shown(path), 'a reference is a Markdown document (.md)')];
    }
    const text = read(path);

    return [
      ...checkDocument(text, shown(path), parseFrontMatter(text)?.fields.get('topic') ?? ''),
      ...checkSoftwareNames(text, shown(path)),
      ...(cited.has(file) ? [] : [finding(shown(path), 'reference not named in SKILL.md; the AI never finds it')]),
    ];
  });

  for (const file of [...cited].filter((item) => !files.includes(item))) {
    findings.push(finding(shown(join(folder, 'SKILL.md')), `names a missing reference: references/${file}`));
  }
  return {
    findings,
    files: files.length,
  };
}

function checkScripts(folder: string, name: string, citingText: string): BaseResult {
  const scriptsFolder = join(folder, 'scripts');
  const files = filesIn(scriptsFolder);
  const cited = citedFiles(citingText, new RegExp(`\\.agents/skills/${name}/scripts/([\\w.-]+)`, 'g'));
  const findings = files.flatMap((file) => {
    const path = shown(join(scriptsFolder, file));

    if (PLAIN_JAVASCRIPT.test(file)) {
      return [finding(path, 'plain JavaScript; write the script in TypeScript (.ts)')];
    }
    if (!SCRIPT_FILE.test(file)) {
      return [finding(path, 'a skill script is a .ts, .cs or .sh file')];
    }
    return cited.has(file) ? [] : [finding(path, `script never named with its path .agents/skills/${name}/scripts/${file}`)];
  });

  for (const file of [...cited].filter((item) => !files.includes(item))) {
    findings.push(finding(shown(join(folder, 'SKILL.md')), `names a missing script: scripts/${file}`));
  }
  return {
    findings,
    files: files.length,
  };
}

function markerIds(text: string, pattern: RegExp): string[] {
  return analyseLines(text)
    .filter((line) => !line.inCode)
    .map((line) => pattern.exec(line.text.trim())?.[1])
    .filter((id) => id !== undefined);
}

function chatLineFinding(trimmed: string, open: boolean, file: string): Finding | undefined {
  if (FILES_BEGIN.test(trimmed) || FILES_END.test(trimmed)) {
    return finding(file, 'files markers belong in SKILL.md, not in chat.md');
  }
  if (trimmed.startsWith('<!--') && trimmed.includes('chat:')) {
    return finding(file, `malformed chat marker: ${trimmed}`);
  }
  if (!open && trimmed !== '') {
    return finding(file, `text outside a chat block is never used: ${trimmed}`);
  }
  return undefined;
}

function checkChatBlock(id: string, seen: Set<string>, filesIds: string[], file: string): Finding[] {
  const findings: Finding[] = [];

  if (seen.has(id)) {
    findings.push(finding(file, `chat block id=${id} appears twice`));
  }
  if (!filesIds.includes(id)) {
    findings.push(finding(file, `chat block id=${id} has no <!-- files:begin id=${id} --> block in SKILL.md`));
  }
  seen.add(id);
  return findings;
}

export function checkChatVariant(chatText: string, skillText: string, file: string): Finding[] {
  const filesIds = markerIds(skillText, FILES_BEGIN_ID);
  const seen = new Set<string>();
  const findings: Finding[] = [];
  let open = false;

  for (const line of analyseLines(chatText).filter((item) => !item.inCode)) {
    const trimmed = line.text.trim();
    const begin = CHAT_BEGIN.exec(trimmed);

    if (begin !== null) {
      findings.push(...(open ? [finding(file, 'chat block opened inside another chat block')] : []), ...checkChatBlock(begin[1], seen, filesIds, file));
      open = true;
    } else if (CHAT_END.test(trimmed)) {
      findings.push(...(open ? [] : [finding(file, 'chat:end without chat:begin')]));
      open = false;
    } else {
      const problem = chatLineFinding(trimmed, open, file);

      findings.push(...(problem === undefined ? [] : [problem]));
    }
  }
  return open ? [
    ...findings,
    finding(file, 'chat block not closed: add <!-- chat:end -->'),
  ] : findings;
}

function checkOneSkill(skillsFolder: string, name: string): BaseResult {
  const folder = join(skillsFolder, name);
  const skillPath = join(folder, 'SKILL.md');
  const chatPath = join(folder, 'chat.md');

  if (!existsSync(skillPath)) {
    return {
      findings: [finding(shown(skillPath), 'skill folder without SKILL.md')],
      files: 0,
    };
  }
  const skillText = read(skillPath);
  const references = checkReferences(folder, name, skillText);
  const referencesText = filesIn(join(folder, 'references'))
    .map((file) => read(join(folder, 'references', file)))
    .join(NEWLINE);
  const chat: BaseResult = existsSync(chatPath) ? {
    findings: [
      ...commonFindings(read(chatPath), shown(chatPath)),
      ...checkChatVariant(read(chatPath), skillText, shown(chatPath)),
    ],
    files: 1,
  } : {
    findings: [],
    files: 0,
  };

  return merge([
    {
      findings: [
        ...checkSkill(name, skillText, shown(skillPath)),
        ...checkSkillLayout(folder),
      ],
      files: 1,
    },
    references,
    checkScripts(folder, name, skillText + NEWLINE + referencesText),
    chat,
  ]);
}

function extensionsIn(text: string): string[] {
  return (text.match(EXTENSION) ?? []).map((extension) => extension.toLowerCase());
}

function agentsHeavyExtensions(text: string): string[] | undefined {
  const lines = analyseLines(text).filter((line) => !line.inCode && HEAVY_LINE.test(line.text));

  if (lines.length === 0) {
    return undefined;
  }
  return lines.flatMap((line) => extensionsIn(line.text.slice(line.text.search(HEAVY_LINE))));
}

function skillHeavyExtensions(text: string): string[] | undefined {
  const lines = analyseLines(text).filter((line) => !line.inCode && line.section === HEAVY_SECTION);

  return lines.length === 0 ? undefined : lines.flatMap((line) => extensionsIn(line.text));
}

function differences(first: string[], second: string[]): string {
  return [...new Set(first)]
    .filter((item) => !second.includes(item))
    .join(' ');
}

export function checkHeavyFiles(
  agentsText: string,
  agentsFile: string,
  skills: {
    name: string;
    text: string;
  }[],
): Finding[] {
  const inAgents = agentsHeavyExtensions(agentsText);

  return skills.flatMap((skill) => {
    const inSkill = skillHeavyExtensions(skill.text);

    if (inSkill === undefined) {
      return [];
    }
    if (inAgents === undefined) {
      return [finding(agentsFile, `no "Heavy files:" line, but the skill "${skill.name}" lists heavy files`)];
    }
    const onlyInSkill = differences(inSkill, inAgents);
    const onlyInAgents = differences(inAgents, inSkill);

    if (onlyInSkill === '' && onlyInAgents === '') {
      return [];
    }
    return [finding(agentsFile, `heavy files differ from the skill "${skill.name}": only in the skill: ${onlyInSkill || 'none'}; only in AGENTS.md: ${onlyInAgents || 'none'}`)];
  });
}

export interface AdapterContext {
  // The heavy file extensions of AGENTS.md, or undefined when it lists none.
  heavy?: string[];
  skillNames: string[];
  // Whether a path, relative to the root that holds adapters/, exists.
  exists: (path: string) => boolean;
}

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function denyRule(value: unknown, action: string): string | undefined {
  if (!isObject(value) || value.action !== action || value.effect !== 'deny' || typeof value.resource !== 'string') {
    return undefined;
  }
  return value.resource;
}

function readDenied(config: JsonObject): string[] {
  const resources = Array.isArray(config.permissions) ? config.permissions.map((rule) => denyRule(rule, 'read')) : Object
    .entries(isObject(config.permission) && isObject(config.permission.read) ? config.permission.read : {})
    .map(([
      pattern,
      effect,
    ]) => effect === 'deny' ? pattern : undefined);

  return resources
    .filter((resource): resource is string => resource !== undefined && resource !== '*.env')
    .map((resource) => resource.replace(/^\*/, '').toLowerCase());
}

function agentDeniesEdit(agent: JsonObject): boolean {
  if (Array.isArray(agent.permissions)) {
    return agent.permissions.some((rule) => denyRule(rule, 'edit') === '*');
  }
  return isObject(agent.permission) && agent.permission.edit === 'deny';
}

function checkAdapterAgent(name: string, agent: unknown, file: string, context: AdapterContext): Finding[] {
  if (!isObject(agent)) {
    return [finding(file, `agent "${name}" is not an object`)];
  }
  const findings: Finding[] = [];
  const prompt = typeof agent.system === 'string' ? agent.system : agent.prompt;
  const description = typeof agent.description === 'string' ? agent.description : '';

  if (!context.skillNames.includes(name)) {
    findings.push(finding(file, `agent "${name}" has no skill .agents/skills/${name}/`));
  }
  if (typeof prompt !== 'string' || !prompt.includes(`\`${name}\``)) {
    findings.push(finding(file, `agent "${name}" does not load its skill \`${name}\``));
  }
  if (/changes no file/i.test(description) && !agentDeniesEdit(agent)) {
    findings.push(finding(file, `agent "${name}" says it changes no file, but edit is not denied`));
  }
  return findings;
}

function mcpServers(config: JsonObject): JsonObject {
  if (!isObject(config.mcp)) {
    return {};
  }
  return isObject(config.mcp.servers) ? config.mcp.servers : config.mcp;
}

function checkAdapterServers(config: JsonObject, file: string, context: AdapterContext): Finding[] {
  return Object
    .entries(mcpServers(config))
    .flatMap(([
      name,
      server,
    ]) => {
      const command = isObject(server) && Array.isArray(server.command) ? server.command : [];

      return command
        .filter((part): part is string => typeof part === 'string' && part.endsWith('.ts'))
        .filter((path) => !context.exists(path))
        .map((path) => finding(file, `MCP server "${name}" runs a missing file: ${path}`));
    });
}

// Agents are under "agents" in V2 and under "agent" in V1.
function adapterAgents(config: JsonObject): JsonObject {
  if (isObject(config.agents)) {
    return config.agents;
  }
  return isObject(config.agent) ? config.agent : {};
}

export function checkOpenCodeAdapter(text: string, file: string, context: AdapterContext): Finding[] {
  let config: unknown;

  try {
    config = JSON.parse(text);
  } catch (error) {
    return [finding(file, `invalid JSON: ${(error as Error).message}`)];
  }
  if (!isObject(config)) {
    return [finding(file, 'the configuration is not a JSON object')];
  }
  if (!Array.isArray(config.permissions) && !isObject(config.permission)) {
    return [finding(file, 'no read permissions: "permissions" (V2) or "permission" (V1)')];
  }
  const findings: Finding[] = [];
  const denied = readDenied(config);

  if (context.heavy !== undefined) {
    const onlyHere = differences(denied, context.heavy);
    const onlyInAgents = differences(context.heavy, denied);

    if (onlyHere !== '' || onlyInAgents !== '') {
      findings.push(finding(file, `denied reads differ from the heavy files of AGENTS.md: only here: ${onlyHere || 'none'}; only in AGENTS.md: ${onlyInAgents || 'none'}`));
    }
  }
  const agents = adapterAgents(config);

  return [
    ...findings,
    ...Object
      .entries(agents)
      .flatMap(([
        name,
        agent,
      ]) => checkAdapterAgent(name, agent, file, context)),
    ...checkAdapterServers(config, file, context),
  ];
}

function checkOpenCodeAdapters(adaptersFolder: string, context: AdapterContext): BaseResult {
  const folder = join(adaptersFolder, 'opencode');
  const paths = subfolders(folder)
    .map((version) => join(folder, version, 'opencode.json'))
    .filter((path) => existsSync(path));

  return checkFolder(paths, (text, file) => checkOpenCodeAdapter(text, file, context));
}

// The adapters sit next to code/ in this repository, at the root in a project.
function checkAdaptersOf(base: string, agentsText: string, skillNames: string[]): BaseResult {
  const root = basename(base) === 'code' ? dirname(base) : base;

  return checkOpenCodeAdapters(join(root, 'adapters'), {
    heavy: agentsHeavyExtensions(agentsText),
    skillNames,
    exists: (path) => existsSync(join(root, path)),
  });
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
  if (parts.length === 1 || (parts.length === 2 && parts[1] === 'index.md')) {
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

function checkIndexSummaries(text: string, file: string, summaries: Map<string, string>, base: string): Finding[] {
  const matches = (lines: Line[]): RegExpExecArray[] => {
    return lines
      .map((line) => INDEX_LINE.exec(line.text.trim()))
      .filter((match) => match !== null);
  };
  const topLines = matches(analyseLines(text).filter((line) => line.section === 'Index'));
  const topicFindings = topLines
    .filter((match) => TOPIC_INDEX.test(match[2]) && existsSync(join(base, match[2])))
    .flatMap((match) => checkIndexSummaries(`## Index\n${read(join(base, match[2]))}`, match[2], summaries, base));

  return [
    ...topLines
      .filter((match) => summaries.has(match[2]) && summaries.get(match[2]) !== match[3])
      .map((match) => finding(file, `index line of ${match[2]} differs from the summary in its header`)),
    ...topicFindings,
  ];
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

function leftMarkers(lines: Line[], file: string): Finding[] {
  return lines
    .filter((line) => !line.inCode && ANY_MARKER.test(line.text.trim()))
    .map((line) => finding(file, `action block left in the chat variant: ${line.text.trim()}`));
}

export function checkChatSkill(text: string, file: string): Finding[] {
  const header = parseFrontMatter(text);

  if (header === undefined) {
    return [finding(file, 'missing YAML header between --- lines')];
  }
  const lines = analyseLines(text);
  const findings = [
    ...commonFindings(text, file),
    ...leftMarkers(lines, file),
    ...lines
      .filter((line) => !line.inCode && isUnmarkedAction(line))
      .map((line) => finding(file, `the chat variant asks to act on a file or to run a command: ${line.text.trim()}`)),
  ];

  if (header.fields.get('metadata.variant') !== 'chat') {
    findings.push(finding(file, 'metadata.variant must be "chat" in the chat variant'));
  }
  if (!lines.some((line) => !line.inCode && line.section === 'Limits')) {
    findings.push(finding(file, 'missing ## Limits section in the chat variant'));
  }
  return findings;
}

export function checkChatDocument(text: string, file: string): Finding[] {
  const findings = leftMarkers(analyseLines(text), file);

  if (parseFrontMatter(text)?.fields.get('variant') !== 'chat') {
    findings.push(finding(file, 'variant must be "chat" in the chat knowledge'));
  }
  return findings;
}

export function checkChatProfile(chatFolder: string): BaseResult {
  const files = markdownFiles(chatFolder).filter((path) => !path.startsWith(join(chatFolder, 'models')));
  const findings = files.flatMap((path) => {
    const parts = relative(chatFolder, path).split(/[\\/]/);

    if (path.endsWith('.fr.md')) {
      return [finding(shown(path), 'French summaries stay out of the chat profile')];
    }
    if (parts[0] === 'skills' && parts.at(-1) === 'SKILL.md') {
      return checkChatSkill(read(path), shown(path));
    }
    return parts[0] === 'knowledge' ? checkChatDocument(read(path), shown(path)) : [];
  });

  return {
    findings,
    files: files.length,
  };
}

function readSkills(skillsFolder: string, skillNames: string[]): {
  name: string;
  text: string;
}[] {
  return skillNames
    .filter((name) => existsSync(join(skillsFolder, name, 'SKILL.md')))
    .map((name) => {
      return {
        name,
        text: read(join(skillsFolder, name, 'SKILL.md')),
      };
    });
}

// The unit suffixes of the closed list: the backticked words of the second column of the tables of
// section "2. Units" of docs/synoptics/symbol-property-naming.md.
export function unitSuffixes(namingText: string): string[] {
  return analyseLines(namingText)
    .filter((line) => line.section.startsWith('2. Units') && line.text.startsWith('|'))
    .flatMap((line) => (line.text.split('|')[2] ?? '').match(/`[A-Za-z0-9]+`/g) ?? [])
    .map((word) => word.slice(1, -1));
}

const TS_FENCE = /^```(?:ts|typescript)$/;
const INTERFACE = /\binterface\s+(\w+)/;
const PROPERTY = /^\s*(?:readonly\s+)?(\w+)\??:\s*([^;]+);/;
const UNITLESS_NAMES = new Set(['value']);

function endsWithSuffix(name: string, suffix: string): boolean {
  const before = name.at(-suffix.length - 1) ?? '';

  return name.length > suffix.length && name.endsWith(suffix) && /[a-z0-9]/.test(before);
}

function checkPropertyName(name: string, type: string, file: string, suffixes: string[]): Finding[] {
  const types = new Set(type
    .split('|')
    .map((item) => item.trim()));

  if (types.has('boolean') && !/^(?:is|has|can)[A-Z]/.test(name)) {
    return [finding(file, `boolean property "${name}" must start with is, has or can`)];
  }
  if (types.has('number') && !UNITLESS_NAMES.has(name) && !suffixes.some((suffix) => endsWithSuffix(name, suffix))) {
    return [finding(file, `number property "${name}" must end with a unit suffix of symbol-property-naming.md`)];
  }
  return [];
}

type Fence = 'none' | 'ts' | 'other';

function nextFence(fence: Fence, line: string): Fence {
  if (fence === 'none') {
    return TS_FENCE.test(line) ? 'ts' : 'other';
  }
  return 'none';
}

// Checks the property names of the TypeScript examples of a synoptics document against the naming
// convention. The properties of an interface whose name ends with "Wrong" are wrong on purpose.
export function checkPropertyNames(text: string, file: string, suffixes: string[]): Finding[] {
  const findings: Finding[] = [];
  let fence: Fence = 'none';
  let isWrong = false;

  for (const line of splitLines(text)) {
    const trimmed = line.trim();
    const property = PROPERTY.exec(line);

    if (trimmed.startsWith('```')) {
      fence = nextFence(fence, trimmed);
      isWrong = false;
    } else if (fence === 'ts' && INTERFACE.test(line)) {
      isWrong = (INTERFACE.exec(line)?.[1] ?? '').endsWith('Wrong');
    } else if (fence === 'ts' && !isWrong && property !== null) {
      findings.push(...checkPropertyName(property[1], property[2], file, suffixes));
    }
  }
  return findings;
}

// An equipment card of a catalog document: "### <English name> (<French name>)", then five bullets.
const CARD_HEADING = /^### (.+) \((.+)\)$/;
const CARD_FIELDS = [
  'Symbol',
  'Real working',
  'States',
  'Properties',
  'Model',
];
// In a "- Properties:" bullet: "`a`, `b` (number" or "`c` (boolean".
const TYPED_NAMES = /((?:`\w+`(?:, )?)+) \((number|boolean)\b/g;

export interface Card {
  english: string;
  french: string;
  fields: Set<string>;
  properties: {
    name: string;
    type: string;
  }[];
}

function addBullet(card: Card, text: string): void {
  const label = /^- ([A-Z][a-z]+(?: [a-z]+)?):/.exec(text)?.[1];

  if (label === undefined) {
    return;
  }
  card.fields.add(label);
  if (label === 'Properties') {
    for (const match of text.matchAll(TYPED_NAMES)) {
      for (const name of match[1].match(/\w+/g) ?? []) {
        card.properties.push({
          name,
          type: match[2],
        });
      }
    }
  }
}

export function readCards(text: string): Card[] {
  const cards: Card[] = [];

  for (const line of analyseLines(text).filter((item) => !item.inCode)) {
    const heading = CARD_HEADING.exec(line.text);

    if (heading !== null) {
      cards.push({
        english: heading[1],
        french: heading[2],
        fields: new Set(),
        properties: [],
      });
    } else if (line.text.startsWith('### ') || line.text.startsWith('## ')) {
      cards.push({
        english: '',
        french: '',
        fields: new Set(CARD_FIELDS),
        properties: [],
      });
    } else {
      const card = cards.at(-1);

      if (card !== undefined) {
        addBullet(card, line.text);
      }
    }
  }
  return cards.filter((card) => card.english !== '');
}

// The rows "| French | English | Document |" of the French to English indexes.
export function readFrenchIndex(text: string): Map<string, string> {
  const rows = new Map<string, string>();

  for (const line of splitLines(text).filter((item) => item.startsWith('| ') && !item.startsWith('| French'))) {
    const cells = line
      .split('|')
      .map((cell) => cell.trim());

    if (cells.length > 3 && cells[1] !== '' && !cells[1].startsWith('---')) {
      rows.set(cells[1].toLowerCase(), cells[2]);
    }
  }
  return rows;
}

// The English name of a French term, as the French to English indexes give it.
export function lookUpFrench(indexTexts: string[], french: string): string | undefined {
  for (const text of indexTexts) {
    const english = readFrenchIndex(text).get(french.toLowerCase());

    if (english !== undefined) {
      return english;
    }
  }
  return undefined;
}

function checkCards(text: string, file: string, suffixes: string[], indexTexts: string[]): Finding[] {
  return readCards(text).flatMap((card) => [
    ...CARD_FIELDS
      .filter((field) => !card.fields.has(field))
      .map((field) => finding(file, `card "${card.english}" has no "- ${field}:" line`)),
    ...card.properties.flatMap((property) => checkPropertyName(property.name, property.type, file, suffixes)),
    ...(lookUpFrench(indexTexts, card.french) === card.english ? [] : [finding(file, `card "${card.english}" has no row "| ${card.french} | ${card.english} |" in a French to English index`)]),
  ]);
}

const KIND_HEADER = '| You read | Meaning | C# equivalent | Kind |';
const KINDS = new Set([
  'same meaning',
  'false friend',
  'no equivalent',
]);

// A language guide (docs/reading-code/*-for-csharp-readers.md) has at least one table "You read |
// Meaning | C# equivalent | Kind", and each of its rows has one of the three kinds.
export function checkReadingGuide(text: string, file: string): Finding[] {
  const lines = splitLines(text);
  const findings: Finding[] = [];
  let inTable = false;
  let tables = 0;

  for (const line of lines) {
    if (line.trim() === KIND_HEADER) {
      inTable = true;
      tables += 1;
    } else if (!line.startsWith('|')) {
      inTable = false;
    } else if (inTable && !line.startsWith('| ---')) {
      const kind = line
        .split('|')
        .at(-2)
        ?.trim() ?? '';

      if (!KINDS.has(kind)) {
        findings.push(finding(file, `row kind must be "same meaning", "false friend" or "no equivalent": ${line.trim()}`));
      }
    }
  }
  return tables === 0 ? [finding(file, `missing table "${KIND_HEADER}"`)] : findings;
}

function checkReadingGuides(base: string): BaseResult {
  const folder = join(base, 'docs', 'reading-code');

  return {
    findings: existsSync(folder) ? markdownFiles(folder)
      .filter((path) => path.endsWith('-for-csharp-readers.md'))
      .flatMap((path) => checkReadingGuide(read(path), shown(path))) : [],
    files: 0,
  };
}

function checkSynopticNames(base: string): BaseResult {
  const folder = join(base, 'docs', 'synoptics');
  const namingPath = join(folder, 'symbol-property-naming.md');

  if (!existsSync(namingPath)) {
    return merge([]);
  }
  const suffixes = unitSuffixes(read(namingPath));
  const files = markdownFiles(folder).filter((path) => !path.endsWith('.fr.md'));
  const indexTexts = files
    .filter((path) => basename(path).startsWith('index-fr-en'))
    .map((path) => read(path));
  const catalogs = files.filter((path) => basename(path).startsWith('catalog-'));

  return {
    findings: [
      ...files.flatMap((path) => checkPropertyNames(read(path), shown(path), suffixes)),
      ...catalogs.flatMap((path) => checkCards(read(path), shown(path), suffixes, indexTexts)),
    ],
    files: 0,
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
  const skillTexts = readSkills(skillsFolder, skillNames);
  const agents = [
    ...checkAgentsMd(agentsText, shown(agentsPath), {
      skillNames,
      documentPaths: [...summaries.keys()],
      exists: (path) => existsSync(join(base, path)),
      readIndex: (path) => existsSync(join(base, path)) ? read(join(base, path)) : undefined,
    }),
    ...checkIndexSummaries(agentsText, shown(agentsPath), summaries, base),
    ...checkHeavyFiles(agentsText, shown(agentsPath), skillTexts),
  ];

  return merge([
    checkAdaptersOf(base, agentsText, skillNames),
    ...skillNames.map((name) => checkOneSkill(skillsFolder, name)),
    docs,
    checkSynopticNames(base),
    checkReadingGuides(base),
    {
      findings: agents,
      files: 1,
    },
    checkFolder(markdownFiles(join(base, 'templates')), checkEnglish),
    checkFolder(chatModels === undefined ? [] : markdownFiles(chatModels), (text, file) => checkChatModel(text, file, skillLineCounts(skillTexts))),
    chatModels === undefined ? merge([]) : checkChatProfile(dirname(chatModels)),
  ]);
}

function skillLineCounts(skills: {
  name: string;
  text: string;
}[]): Map<string, number> {
  return new Map(skills.map((skill) => [
    skill.name,
    splitLines(skill.text.trimEnd()).length,
  ]));
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

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main();
}

// Turns one page of an official documentation into plain Markdown for the library: the front matter
// gives way to a title, the markup of the site generator (DocFX, Hugo, Angular, mdBook, MDN, MDX,
// Docusaurus) is removed or expanded, code samples kept in the source repository are inlined.
// Used by scripts/fetch-library.ts.
import { posix } from 'node:path';
import {
  fence,
  finishMarkdown,
  languageOf,
  lineRange,
  mapCode,
  mapProse,
  neutralizeExamples,
  region,
  withoutRegionMarks,
} from './library-markdown.ts';
import type { Flavor } from './library-sources.ts';

// Reads a file of the repository, or gives undefined when it is not in the clone.
export type Reader = (repositoryPath: string) => string | undefined;

export interface CleanContext {
  flavor: Flavor;
  // Path of the page in its repository, with forward slashes.
  path: string;
  read: Reader;
  // The newest version the page is for, to keep only its moniker ranges (ASP.NET Core).
  currentVersion?: number;
}

export interface Cleaned {
  title: string;
  body: string;
}

const NEWLINE = '\n';
const FRONT_MATTER = /^(---|\+\+\+)\n([\s\S]*?)\n\1\n/;
const MISSING = (path: string): string => `_Code sample not included: ${path}._`;
// Samples in languages the team does not use: left out silently when they are not in the clone.
const OTHER_LANGUAGES = /visualbasic|\/vb\/|\.vb\b|\bvb(?:net)?$|fsharp|\.fs\b|\bcpp\b/i;
const DOCFX_PASSES = 3;
const XREF_MACROS = new Set([
  'domxref',
  'jsxref',
  'cssxref',
  'svgattr',
  'svgxref',
  'htmlattrxref',
  'httpheader',
  'httpmethod',
  'httpstatus',
  'event',
  'webextapiref',
]);
const PLAIN_MACROS = new Set([
  'glossary',
  'rfc',
]);
const FLAG_MACROS: Record<string, string> = {
  optional_inline: '(optional)',
  deprecated_inline: '(deprecated)',
  deprecated_header: '**Deprecated.**',
  experimental_inline: '(experimental)',
  non_standard_inline: '(non-standard)',
  'non-standard_inline': '(non-standard)',
  readonlyinline: '(read-only)',
  securecontext_inline: '(secure context)',
};
const HUGO_HEADINGS: Record<string, string> = {
  whatsnext: 'What\'s next',
  prerequisites: 'Before you begin',
  objectives: 'Objectives',
  cleanup: 'Clean up',
  synopsis: 'Synopsis',
  options: 'Options',
  seealso: 'See also',
  'options-inherited-from-parent-commands': 'Options inherited from parent commands',
};

// ---------- Paths and includes ----------
function candidates(fromPage: string, target: string): string[] {
  const clean = target
    .replaceAll('\\', '/')
    .split(/[?#]/)[0]
    ?.trim() ?? '';

  if (clean.startsWith('~/')) {
    const top = fromPage.split('/')[0] ?? '';

    return [
      clean.slice(2),
      `${top}/${clean.slice(2)}`,
      `docs/${clean.slice(2)}`,
    ];
  }
  if (clean.startsWith('/')) {
    return [clean.slice(1)];
  }
  return [
    posix.normalize(posix.join(posix.dirname(fromPage), clean)),
    posix.normalize(clean),
  ];
}

function readFrom(context: CleanContext, target: string): {
  path: string;
  text: string;
} | undefined {
  for (const path of candidates(context.path, target)) {
    const text = path.startsWith('..') ? undefined : context.read(path);

    if (text !== undefined) {
      return {
        path,
        text: text.replaceAll(/\r\n?/g, NEWLINE),
      };
    }
  }
  return undefined;
}

function codeSample(
  context: CleanContext,
  target: string,
  options: {
    name?: string;
    range?: string;
    language?: string;
  },
): string {
  const file = readFrom(context, target);

  if (file === undefined) {
    return OTHER_LANGUAGES.test(`${target} ${options.language ?? ''}`) ? '' : MISSING(target);
  }
  const named = options.name === undefined ? undefined : region(file.text, options.name);
  let code = named ?? withoutRegionMarks(file.text);

  if (options.range !== undefined && named === undefined) {
    code = lineRange(file.text, options.range);
  }
  return fence(code.trim() === '' ? withoutRegionMarks(file.text) : code, options.language ?? languageOf(file.path));
}

function attributes(text: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const match of text.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) {
    result[match[1] ?? ''] = match[2] ?? '';
  }
  return result;
}

function includeText(context: CleanContext, target: string): string {
  const file = readFrom(context, target);

  return file === undefined ? '' : file.text
    .replace(FRONT_MATTER, '')
    .trim();
}

// ---------- DocFX (dotnet/docs, ASP.NET Core, EF Core) ----------
function monikerKept(range: string, current: number | undefined): boolean {
  if (current === undefined) {
    return true;
  }
  return range
    .split('||')
    .some((group) => [...group.matchAll(/(>=|<=|>|<|=)\s*[a-z-]+-(\d+(?:\.\d+)?)/g)].every((bound) => {
      const value = Number.parseFloat(bound[2] ?? '0');
      const tests: Record<string, boolean> = {
        '>=': current >= value,
        '>': current > value,
        '<=': current <= value,
        '<': current < value,
        '=': current === value,
      };

      return tests[bound[1] ?? '='] ?? true;
    }));
}

// Keeps only the moniker ranges that hold the newest version, and drops the range markers.
function keepCurrentMonikers(text: string, current: number | undefined): string {
  const kept: string[] = [];
  let keep = true;

  for (const line of text.split(NEWLINE)) {
    const open = /^>?\s*:::\s*moniker\s+range="([^"]*)"/.exec(line.trim());

    if (open !== null) {
      keep = monikerKept(open[1] ?? '', current);
    } else if (/^>?\s*:::\s*moniker-end/.test(line.trim())) {
      keep = true;
    } else if (keep) {
      kept.push(line);
    }
  }
  return kept.join(NEWLINE);
}

function docfxCodeBlock(context: CleanContext, attributesText: string): string {
  const values = attributes(attributesText);

  return codeSample(context, values.source ?? '', {
    ...values.id === undefined ? {} : { name: values.id },
    ...values.range === undefined ? {} : { range: values.range },
    ...values.language === undefined ? {} : { language: values.language },
  });
}

function docfxCodeReference(context: CleanContext, language: string, target: string): string {
  const [
    path,
    anchor,
  ] = target.split('#');
  const query = new URLSearchParams(path?.split('?')[1] ?? '');
  const name = query.get('name') ?? anchor;
  const range = query.get('range');

  return codeSample(context, path?.split('?')[0] ?? '', {
    ...name === undefined || name === null || name === '' ? {} : { name },
    ...range === null ? {} : { range },
    language: language === 'csharp' || language === 'cs' ? 'csharp' : language,
  });
}

function safeDecode(id: string): string {
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

function docfxProse(context: CleanContext): (prose: string) => string {
  return (prose) => prose
    .replaceAll(/^[ \t]*:::[ \t]*code\s+([^\n]*?):::\s*$/gm, (_, values: string) => docfxCodeBlock(context, values))
    .replaceAll(/\[!code-(\w+)\[[^\]]*\]\(([^)\s"]+)(?:\s+"[^"]*")?\)\]/g, (_, language: string, target: string) => docfxCodeReference(context, language, target))
    .replaceAll(/\[!INCLUDE\s*\[[^\]]*\]\(([^)]+)\)\]/gi, (_, target: string) => includeText(context, target))
    .replaceAll(/^\s*:::image\b[\s\S]*?(?::::image-end:::|:::)\s*$/gm, '')
    .replaceAll(/^\s*:::image-end:::\s*$/gm, '')
    .replaceAll(/^[ \t]*:::[ \t]*(?:row|column|row-end|column-end)\b[^\n]*$/gm, '')
    .replaceAll(/^[ \t]*:::[ \t]*zone\s+(?:pivot|target)="([^"]*)"[^\n]*$/gm, (_, pivot: string) => `**${pivot}:**`)
    .replaceAll(/^[ \t]*:::[ \t]*zone-end[ \t]*$/gm, '')
    .replaceAll(/^\s*>?\s*\[!div[^\]]*\]\s*$/gm, '')
    .replaceAll(/<xref:([^>\s?]+)(?:\?[^>]*)?>/g, (_, id: string) => `\`${safeDecode(id)}\``)
    .replaceAll(/\]\(xref:[^)]*\)/g, '](#)');
}

// Included files hold includes and moniker ranges too: expand again until nothing changes.
function docfxPasses(context: CleanContext, body: string): string {
  let text = body;

  for (let pass = 0; pass < DOCFX_PASSES; pass += 1) {
    const next = mapProse(keepCurrentMonikers(text, context.currentVersion), docfxProse(context));

    if (next === text) {
      break;
    }
    text = next;
  }
  return text;
}

// ---------- Hugo (Kubernetes, Docker) ----------
function hugoShortcode(context: CleanContext, name: string, values: Record<string, string>, raw: string): string {
  const lower = name.toLowerCase();

  if (lower === 'glossary_tooltip') {
    return values.text ?? (values.term_id ?? '').replaceAll('_', ' ');
  }
  if (lower === 'heading') {
    const key = /"([^"]+)"/.exec(raw)?.[1] ?? '';

    return HUGO_HEADINGS[key] ?? key;
  }
  if (lower === 'feature-state') {
    return `**Feature state:** ${values.for_k8s_version ?? ''} [${values.state ?? ''}]`.replace(' []', '');
  }
  if (lower === 'code_sample' || lower === 'codenew') {
    const file = values.file ?? '';

    return codeSample(context, `content/en/examples/${file}`, values.language === undefined ? {} : { language: values.language });
  }
  if (lower === 'include') {
    const file = /"([^"]+)"/.exec(raw)?.[1] ?? '';

    return includeText(context, `/content/includes/${file}`) || includeText(context, `/content/en/includes/${file}`);
  }
  return hugoBlockMarker(lower, values);
}

function hugoBlockMarker(name: string, values: Record<string, string>): string {
  if ([
    'note',
    'caution',
    'warning',
    'tip',
    'important',
  ].includes(name)) {
    return `**${name.charAt(0).toUpperCase()}${name.slice(1)}:**`;
  }
  const label = values.name ?? values.summary;

  return (name === 'tab' || name === 'details') && label !== undefined ? `**${label}**` : '';
}

function hugoProse(context: CleanContext): (prose: string) => string {
  return (prose) => prose.replaceAll(/\{\{[<%]\s*(\/?)\s*([\w-]+)([\s\S]*?)[>%]\}\}/g, (_, closing: string, name: string, rest: string) => {
    if (name === 'mermaid') {
      return closing === '/' ? '```' : '```mermaid';
    }
    if (closing === '/') {
      return '';
    }
    return hugoShortcode(context, name, attributes(rest), rest);
  });
}

// ---------- Angular (angular.dev) ----------
function angularCode(context: CleanContext, values: Record<string, string>, inner: string): string {
  const header = values.header === undefined ? '' : `File: \`${values.header}\`${NEWLINE}${NEWLINE}`;

  if (values.path !== undefined) {
    return header + codeSample(context, `/${values.path}`, {
      ...values.region === undefined ? {} : { name: values.region },
      ...values.language === undefined ? {} : { language: values.language },
    });
  }
  return header + fence(inner.replaceAll(/^\n+|\s+$/g, ''), values.language ?? '');
}

function angularTag(name: string, values: Record<string, string>): string {
  const title = values.title ?? values.label ?? '';

  if (name === 'docs-step') {
    return `### ${title}`;
  }
  if (name === 'docs-decorative-header') {
    return title === '' ? '' : `# ${title}`;
  }
  if (name === 'docs-pill') {
    return `- ${title}`;
  }
  if (name === 'docs-callout' || name === 'docs-tab' || name === 'docs-card') {
    return title === '' ? '' : `**${title}**`;
  }
  return '';
}

function angularProse(context: CleanContext): (prose: string) => string {
  return (prose) => prose
    .replaceAll(/<docs-code\b([^>]*?)\/>/g, (_, values: string) => angularCode(context, attributes(values), ''))
    .replaceAll(/<docs-code\b([^>]*)>([\s\S]*?)<\/docs-code>/g, (_, values: string, inner: string) => angularCode(context, attributes(values), inner))
    .replaceAll(/<(docs-[\w-]+)\b([^>]*?)\/?>/g, (_, name: string, values: string) => angularTag(name, attributes(values)))
    .replaceAll(/<\/docs-[\w-]+>/g, '');
}

// ---------- MDN ----------
function mdnArguments(raw: string): string[] {
  return [...raw.matchAll(/"([^"]*)"|'([^']*)'/g)].map((match) => match[1] ?? match[2] ?? '');
}

function mdnMacro(name: string, raw: string): string {
  const lower = name.toLowerCase();
  const [
    target = '',
    display,
  ] = mdnArguments(raw);
  const shown = display !== undefined && display !== '' ? display : target;

  if (XREF_MACROS.has(lower)) {
    return `\`${shown}\``;
  }
  if (lower === 'svgelement' || lower === 'htmlelement') {
    return `\`<${shown}>\``;
  }
  if (PLAIN_MACROS.has(lower)) {
    return shown;
  }
  return FLAG_MACROS[lower] ?? '';
}

function mdnProse(prose: string): string {
  return prose
    .replaceAll(/\{\{\s*([\w-]+)\s*(?:\(((?:"[^"]*"|'[^']*'|[^)"'])*)\))?\s*\}\}/g, (_, name: string, raw: string | undefined) => mdnMacro(name, raw ?? ''))
    .replaceAll(/^(\s*)- : /gm, '$1  ');
}

// ---------- mdBook (The Rust Programming Language) ----------
function mdbookInclude(context: CleanContext, directive: string, target: string): string {
  const [
    path = '',
    ...selector
  ] = target
    .trim()
    .split(':');
  const file = readFrom(context, path);

  if (file === undefined) {
    return MISSING(path);
  }
  let code = file.text;

  if (selector.length === 1 && !/^\d*$/.test(selector[0] ?? '')) {
    code = region(file.text, selector[0] ?? '') ?? file.text;
  } else if (selector.length > 0) {
    code = lineRange(file.text, `${selector[0] || '1'}-${selector[1] ?? ''}`);
  }
  code = withoutRegionMarks(code);
  return directive === 'rustdoc_include' ? code
    .split(NEWLINE)
    .filter((line) => !/^\s*#(?:\s|$)/.test(line))
    .join(NEWLINE) : code;
}

function mdbookExpand(context: CleanContext, text: string): string {
  return text
    .replaceAll(/\{\{#(include|rustdoc_include)\s+([^}]+)\}\}/g, (_, directive: string, target: string) => mdbookInclude(context, directive, target).replace(/\n+$/, ''))
    .replaceAll(/<Listing\b([^>]*)>/g, (_, values: string) => {
      const found = attributes(values);
      const label = found.number === undefined ? 'Listing' : `Listing ${found.number}`;
      const caption = found.caption === undefined ? '' : `: ${found.caption}`;
      const file = found['file-name'] === undefined ? '' : ` (${found['file-name']})`;

      return `**${label}${caption}**${file}`;
    })
    .replaceAll(/<\/Listing>/g, '');
}

// ---------- Docusaurus, MDX, ESLint, TypeScript, Node.js, Podman ----------
function admonitionLabel(kind: string, title: string): string {
  const label = title.trim() === '' ? `${kind.charAt(0).toUpperCase()}${kind.slice(1)}:` : title.trim();

  return `**${label}**`;
}

function admonitions(prose: string): string {
  return prose
    .replaceAll(/^[ \t]*:::[ \t]*(incorrect|correct)\b.*$/gm, (_, kind: string) => `**${kind === 'correct' ? 'Correct' : 'Incorrect'}:**`)
    .replaceAll(/^[ \t]*:::[ \t]*(note|tip|info|warning|danger|caution|important)\b[ \t]*(.*)$/gm, (_, kind: string, title: string) => admonitionLabel(kind, title))
    .replaceAll(/^[ \t]*:::[ \t]*$/gm, '');
}

function mdxProse(prose: string): string {
  return admonitions(prose)
    .replaceAll(/^import\s.+?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replaceAll(/^export\s.+$/gm, '')
    .replaceAll(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replaceAll(/^(?:>.*\n)*>.*🛑.*(?:\n>.*)*$/gmu, '')
    .replaceAll(/<TabItem\b[^>]*value="([^"]*)"[^>]*>/g, '**$1**')
    .replaceAll(/<\/?(?:Tabs|TabItem)\b[^>]*>/g, '');
}

function twoslash(code: string): string {
  return code
    .split(NEWLINE)
    .filter((line) => !/^\s*\/\/\s*(?:@[\w]+:?.*|\^[?|!].*|---cut(?:-after)?---\s*)$/.test(line))
    .join(NEWLINE);
}

function podmanOptions(context: CleanContext, text: string): string {
  return text.replaceAll(/^@@option\s+(?:[\w-]+:)?([\w-]+).*$/gm, (_, name: string) => {
    const option = readFrom(context, `options/${name}.md`);

    return option === undefined ? '' : option.text
      .split(NEWLINE)
      .filter((line) => !line.startsWith('####>'))
      .join(NEWLINE)
      .trim();
  });
}

// ---------- The page ----------
function frontTitle(frontMatter: string): string | undefined {
  const match = /^title:\s*(.+)$/m.exec(frontMatter);

  return match?.[1]
    ?.trim()
    .replace(/^(["'])(.*)\1$/, '$2');
}

function flavorPass(context: CleanContext, body: string): string {
  switch (context.flavor) {
    case 'docfx':
      return docfxPasses(context, body);
    case 'hugo':
      return mapProse(body, hugoProse(context));
    case 'angular':
      return mapProse(body, angularProse(context));
    case 'mdn':
      return mapProse(body, mdnProse);
    case 'mdbook':
      return mdbookExpand(context, body);
    case 'mdx':
    case 'eslint':
      return mapProse(body, mdxProse);
    case 'typescript':
      return mapCode(mapProse(body, mdxProse), twoslash);
    case 'podman':
      return podmanOptions(context, body);
    default:
      return body;
  }
}

function fileTitle(path: string): string {
  const name = posix
    .basename(path)
    .replace(/\.(mdx?|md\.in)$/, '');
  const folder = posix.basename(posix.dirname(path));

  return /^(_?index|README)$/i.test(name) ? folder : name;
}

export function cleanDocument(text: string, context: CleanContext): Cleaned {
  const normalized = text
    .replaceAll(/\r\n?/g, NEWLINE)
    .replace(/^﻿/, '');
  const front = FRONT_MATTER.exec(normalized);
  const raw = front === null ? normalized : normalized.slice(front[0].length);
  const body = neutralizeExamples(finishMarkdown(flavorPass(context, raw)));
  const heading = /^# (.+)$/m
    .exec(body)?.[1]
    ?.replaceAll(/`/g, '')
    .trim();
  const title = (front === null ? undefined : frontTitle(front[2] ?? '')) ?? heading ?? fileTitle(context.path);

  return {
    title,
    body: heading === undefined ? `# ${title}${NEWLINE}${NEWLINE}${body}` : body,
  };
}

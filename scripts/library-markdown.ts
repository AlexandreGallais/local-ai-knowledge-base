// Shared Markdown helpers of the documentation library: code fences, regions of code samples,
// and the generic clean-up every flavor ends with. Used by scripts/library-clean.ts.
export interface Segment {
  code: boolean;
  text: string;
}

const NEWLINE = '\n';
const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})(.*)$/;
const REGION_MARK = /^\s*(?:\/\/|#|'|<!--|\/\*|;)\s*(?:<\/?[\w.-]+>|#?(?:end)?region\b.*|#(?:end)?docregion\b.*|ANCHOR(?:_END)?:.*)\s*(?:-->|\*\/)?\s*$/;
const ENTITIES: Record<string, string> = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': '\'',
  '&apos;': '\'',
  '&nbsp;': ' ',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&amp;': '&',
};
const KEPT_CONTENT_TAGS = 'a|span|div|p|section|article|sup|sub|small|center|font|u|figure|figcaption|nav|header|footer|main|aside|picture|abbr|cite|dfn|mark|s|del|ins|var|samp|label|blockquote|ul|ol|li|dl|dt|dd|caption|thead|tbody|tfoot|colgroup|col|table|em|i|strong|b|details|hr|wbr|source|button|svg|path|g';
const ALERT = /^(\s*>\s*)\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/gim;

function isFenceClose(line: string, marker: string): boolean {
  const trimmed = line.trim();

  return trimmed.startsWith(marker) && /^[`~]+$/.test(trimmed) && trimmed[0] === marker[0];
}

// Splits a Markdown text into prose and fenced code, each segment keeping its own lines.
export function segments(text: string): Segment[] {
  const result: Segment[] = [];
  let current: string[] = [];
  let marker = '';
  const flush = (code: boolean): void => {
    if (current.length > 0) {
      result.push({
        code,
        text: current.join(NEWLINE),
      });
    }
    current = [];
  };

  for (const line of text.split(NEWLINE)) {
    const open = marker === '' ? FENCE_OPEN.exec(line) : null;

    if (open !== null) {
      flush(false);
      marker = open[2] ?? '```';
      current.push(line);
    } else if (marker !== '' && isFenceClose(line, marker)) {
      current.push(line);
      flush(true);
      marker = '';
    } else {
      current.push(line);
    }
  }
  flush(marker !== '');
  return result;
}

// Applies a change to the prose only, never inside a code fence.
export function mapProse(text: string, change: (prose: string) => string): string {
  return segments(text)
    .map((segment) => segment.code ? segment.text : change(segment.text))
    .join(NEWLINE);
}

export function mapCode(text: string, change: (code: string) => string): string {
  return segments(text)
    .map((segment) => segment.code ? change(segment.text) : segment.text)
    .join(NEWLINE);
}

export function fence(code: string, language: string): string {
  const longest = Math.max(2, ...(code.match(/`+/g) ?? []).map((run) => run.length));
  const marks = '`'.repeat(longest + 1);

  return `${marks}${language}${NEWLINE}${code.replace(/\n+$/, '')}${NEWLINE}${marks}`;
}

export function languageOf(path: string): string {
  const extension = /\.([\w]+)$/
    .exec(path)?.[1]
    ?.toLowerCase() ?? '';
  const known: Record<string, string> = {
    cs: 'csharp',
    ts: 'ts',
    js: 'js',
    mjs: 'js',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    html: 'html',
    css: 'css',
    scss: 'scss',
    xml: 'xml',
    csproj: 'xml',
    razor: 'razor',
    cshtml: 'razor',
    rs: 'rust',
    toml: 'toml',
    sh: 'sh',
    ps1: 'powershell',
    sql: 'sql',
    fs: 'fsharp',
    vb: 'vb',
    md: 'md',
    txt: 'text',
  };

  return known[extension] ?? '';
}

function escapeRegExp(text: string): string {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function dedent(lines: string[]): string[] {
  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => /^\s*/.exec(line)?.[0].length ?? 0);
  const common = indents.length === 0 ? 0 : Math.min(...indents);

  return lines.map((line) => line.slice(common));
}

export function withoutRegionMarks(code: string): string {
  return code
    .split(NEWLINE)
    .filter((line) => !REGION_MARK.test(line))
    .join(NEWLINE);
}

// The lines between the start and end marks of a named region of a code sample.
export function region(code: string, name: string): string | undefined {
  const n = escapeRegExp(name);
  const start = new RegExp(`^\\s*(?://|#|'|<!--|/\\*|;)\\s*(?:<${n}>|#?region\\s+${n}\\s*$|#docregion\\b.*\\b${n}\\b|ANCHOR:\\s*${n}\\s*$)`);
  const end = new RegExp(`^\\s*(?://|#|'|<!--|/\\*|;)\\s*(?:</${n}>|#?endregion\\b|#enddocregion(?:\\s*$|\\b.*\\b${n}\\b)|ANCHOR_END:\\s*${n}\\s*$)`);
  const lines = code.split(NEWLINE);
  const first = lines.findIndex((line) => start.test(line));

  if (first === -1) {
    return undefined;
  }
  const last = lines.findIndex((line, index) => index > first && end.test(line));
  const body = lines.slice(first + 1, last === -1 ? undefined : last);

  return dedent(body.filter((line) => !REGION_MARK.test(line))).join(NEWLINE);
}

// Lines "5-10", "5-", "3,7-9" of a code sample, counted from 1.
export function lineRange(code: string, range: string): string {
  const lines = code.split(NEWLINE);
  const picked = range
    .split(',')
    .flatMap((part) => {
      const [
        from,
        to,
      ] = part
        .split('-')
        .map((value) => Number.parseInt(value, 10));
      const start = Number.isNaN(from) ? 1 : from ?? 1;
      const stop = part.includes('-') ? (to === undefined || Number.isNaN(to) ? lines.length : to) : start;

      return lines.slice(start - 1, stop);
    });

  return dedent(picked).join(NEWLINE);
}

function decodeEntities(text: string): string {
  return text.replaceAll(/&(?:lt|gt|quot|#39|apos|nbsp|mdash|ndash|hellip|amp);/g, (entity) => ENTITIES[entity] ?? entity);
}

function simplifyTables(text: string): string {
  return text
    .replaceAll(/<\/tr>/gi, NEWLINE)
    .replaceAll(/<t[dh]\b[^>]*>/gi, ' | ')
    .replaceAll(/<\/t[dh]>|<\/?tr\b[^>]*>/gi, '');
}

function simplifyHtml(text: string): string {
  return simplifyTables(text)
    .replaceAll(/<(style|script|iframe|video|audio|object|noscript)\b[\s\S]*?<\/\1>/gi, '')
    .replaceAll(/<(?:img|iframe|video|embed|input)\b[^>]*\/?>/gi, '')
    .replaceAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi, (_, inner: string) => `**${inner.replaceAll(/<[^>]+>/g, '').trim()}**`)
    .replaceAll(/<(?:code|kbd)>([^<]*)<\/(?:code|kbd)>/gi, '`$1`')
    .replaceAll(/<br\s*\/?>/gi, '')
    .replaceAll(new RegExp(`</?(?:${KEPT_CONTENT_TAGS})\\b[^>]*>`, 'gi'), '');
}

function simplifyLinks(text: string): string {
  return text
    .replaceAll(/!\[[^\]]*\]\((?:[^()]|\([^)]*\))*\)/g, '')
    .replaceAll(/!\[[^\]]*\]\[[^\]]*\]/g, '')
    .replaceAll(/\[((?:[^[\]]|\[[^\]]*\])+)\]\((?:[^()]|\([^)]*\))*\)/g, '$1')
    .replaceAll(/\[((?:[^[\]]|\[[^\]]*\])+)\]\[[^\]]*\]/g, '$1')
    .replaceAll(/^\s*\[[^\]]+\]:\s+\S+.*$/gm, '');
}

function cleanProse(prose: string): string {
  return decodeEntities(simplifyLinks(simplifyHtml(prose.replaceAll(/<!--[\s\S]*?-->/g, ''))))
    .replaceAll(ALERT, (_, quote: string, kind: string) => `${quote}**${kind.charAt(0)}${kind.slice(1).toLowerCase()}:**`)
    .replaceAll(/[ \t]+$/gm, '');
}

function cleanFenceInfo(code: string): string {
  return code.replace(/^(\s*)(`{3,}|~{3,})(.*)$/m, (_, indent: string, marks: string, info: string) => {
    const language = /^\s*\{?\.?([\w+#.-]+)/
      .exec(info)?.[1]
      ?.toLowerCase()
      .replace(/-nolint$/, '') ?? '';

    return `${indent}${marks}${language}`;
  });
}

// Drops the H2 or H3 sections left with no content, such as an MDN "Browser compatibility".
function dropEmptySections(text: string): string {
  const lines = text.split(NEWLINE);
  const kept = lines.filter((line, index) => {
    if (!/^#{2,3} /.test(line)) {
      return true;
    }
    const level = /^#+/.exec(line)?.[0].length ?? 2;
    const next = lines
      .slice(index + 1)
      .find((after) => after.trim() !== '');

    return next !== undefined && !(new RegExp(`^#{1,${level}} `).test(next));
  });

  return kept.join(NEWLINE);
}

type Level = 'h2' | 'h3' | 'paragraph' | 'line';
const NEXT_LEVEL: Record<Level, Level> = {
  h2: 'h3',
  h3: 'paragraph',
  paragraph: 'line',
  line: 'line',
};

export function bytes(text: string): number {
  return Buffer.byteLength(text, 'utf8');
}

function isBoundary(line: string, level: Level): boolean {
  return (level === 'h2' && line.startsWith('## ')) || (level === 'h3' && line.startsWith('### '));
}

function nextFence(fenceMarker: string, line: string): string {
  if (fenceMarker === '') {
    return FENCE_OPEN.exec(line)?.[2] ?? '';
  }
  return isFenceClose(line, fenceMarker) ? '' : fenceMarker;
}

// The text cut before each heading of the level, or after each blank line outside code.
function chunksAt(text: string, level: Level): string[] {
  const chunks: string[] = [];
  let current: string[] = [];
  let marker = '';

  for (const line of text.split(NEWLINE)) {
    if (marker === '' && isBoundary(line, level) && current.length > 0) {
      chunks.push(current.join(NEWLINE));
      current = [];
    }
    current.push(line);
    marker = nextFence(marker, line);
    if (level === 'paragraph' && marker === '' && line.trim() === '' && current.length > 1) {
      chunks.push(current.join(NEWLINE));
      current = [];
    }
  }
  if (current.length > 0) {
    chunks.push(current.join(NEWLINE));
  }
  return chunks;
}

// The last resort: line by line, closing an open code fence at the cut and opening it again after.
function hardSplit(text: string, max: number): string[] {
  const parts: string[] = [];
  let current: string[] = [];
  let opener = '';
  let marker = '';

  for (const raw of text.split(NEWLINE)) {
    const line = bytes(raw) > max / 2 ? raw.slice(0, Math.floor(max / 8)) : raw;
    const closing = marker === '' ? '' : `${NEWLINE}${marker}`;

    if (current.length > 0 && bytes(current.join(NEWLINE) + NEWLINE + line + closing) > max) {
      parts.push(current.join(NEWLINE) + closing);
      current = marker === '' ? [] : [opener];
    }
    current.push(line);
    const after = nextFence(marker, line);

    opener = marker === '' && after !== '' ? line : opener;
    marker = after;
  }
  parts.push(current.join(NEWLINE));
  return parts;
}

function pack(text: string, max: number, level: Level): string[] {
  if (bytes(text) <= max) {
    return [text];
  }
  if (level === 'line') {
    return hardSplit(text, max);
  }
  const parts: string[] = [];
  let current = '';

  for (const chunk of chunksAt(text, level)) {
    const joined = current === '' ? chunk : `${current}${NEWLINE}${chunk}`;

    if (bytes(joined) <= max) {
      current = joined;
      continue;
    }
    if (current !== '') {
      parts.push(current);
    }
    const pieces = bytes(chunk) <= max ? [chunk] : pack(chunk, max, NEXT_LEVEL[level]);

    parts.push(...pieces.slice(0, -1));
    current = pieces.at(-1) ?? '';
  }
  parts.push(current);
  return parts;
}

// Cuts a page into parts of at most `max` bytes: at H2 headings first, then H3, then paragraphs.
export function splitMarkdown(text: string, max: number): string[] {
  return pack(text, max, 'h2')
    .map((part) => part.trim())
    .filter((part) => part !== '');
}

const EMAIL = /\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b/g;
const JWT = /\beyJ[\w-]{8,}(?:\.[\w-]*){0,2}/g;
const SECRET_NAME = /(pass(?:word|wd)?|secret|token|api[-_]?key|access[-_]?key|account[-_]?key|client[-_]?secret|credentials?|auth|bearer|data)\b/i;
const SECRET_VALUE = /((?:pass(?:word|wd)?|secret|token|key|credentials?|bearer|basic)["']?\s*(?:[:=]|\s)\s*)([\w+/!$\\=-]{6,})(?![\w(.])/gi;
const SECRET_LINE = /pass(?:word|wd|phrase)|secret|token|\bpwd\b|auth-extra-groups|api-?key/i;
const BOOTSTRAP_TOKEN = /\b[a-z\d]{6}\.[a-z\d]{16}\b/g;
const SECRET_FILE = /((?:pass(?:word|wd)?|secret|token)=)(\.?\/[\w./-]+)/gi;
const QUOTED = /(["'])((?:(?!\1)[^\\]|\\.)*)\1/g;
const CONSTANT_NAME = /^[A-Z][A-Z\d_]*$/;
const URL_PASSWORD = /(:\/\/[^\s:/@]+:)[^\s@/]+@/g;
const BASE64_VALUE = /^(\s*[\w.-]+:\s*)([A-Za-z0-9+/]{8,}={0,2})\s*$/;
const HEX_DUMP = /<Buffer(?: [\da-f]{2}){4,}/;
// A key block: its body holds only base64, blanks and escaped line ends, never code.
const PRIVATE_KEY = /-----BEGIN ([A-Z ]*)PRIVATE KEY-----(?:[A-Za-z\d+/=\s]|\\n)+-----END \1PRIVATE KEY-----/g;
const CARD_NUMBER = /\b\d{4}([ -]?)\d{4}\1\d{4}\1\d{4}\b/g;
const PHONE_LINK = /\btel:\+?[\d.() -]{6,}\d/g;
const INTERNATIONAL_PHONE = /(?<![\w.])\+\d{2,3}[ .-]?\d{3,4}[ .-]?\d{3,8}\b/g;

// Example credentials, tokens and addresses of the official docs, replaced by neutral markers:
// they are fake, but a published file must hold no value that looks like a real secret or person.
export function neutralizeExamples(text: string): string {
  return text
    .replaceAll(PRIVATE_KEY, '<example-private-key>')
    .replaceAll(CARD_NUMBER, '<example-card-number>')
    .replaceAll(PHONE_LINK, 'tel:<example-phone>')
    .replaceAll(INTERNATIONAL_PHONE, '<example-phone>')
    .split('\n')
    .map((line) => {
      const neutral = line
        .replaceAll(EMAIL, 'user@example.com')
        .replaceAll(JWT, '<example-jwt>')
        .replaceAll(BOOTSTRAP_TOKEN, '<example-token>')
        .replaceAll(SECRET_FILE, '$1<example-file>')
        .replaceAll(URL_PASSWORD, '$1<example-password>@')
        .replaceAll(SECRET_VALUE, '$1<example-value>');
      const base64 = BASE64_VALUE.exec(neutral);

      if (base64 !== null && (SECRET_NAME.test(neutral) || /=$/.test(base64[2] ?? ''))) {
        return `${base64[1] ?? ''}<example-value>`;
      }
      // A quoted name followed by a colon is a key, not a value: it stays.
      const keep = (literal: string, inner: string, offset: number): boolean => CONSTANT_NAME.test(inner) || inner === '' || /^\s*:/.test(neutral.slice(offset + literal.length));
      const quoted = SECRET_LINE.test(neutral) ? neutral.replaceAll(QUOTED, (literal: string, quote: string, inner: string, offset: number) => keep(literal, inner, offset) ? literal : `${quote}<example-value>${quote}`) : neutral;

      return HEX_DUMP.test(quoted) ? quoted.replaceAll(/ [\da-f]{2}(?= |>)/g, ' ..') : quoted;
    })
    .join('\n');
}

// The generic clean-up of every flavor: HTML, images, links, entities, empty sections, blank lines.
export function finishMarkdown(text: string): string {
  const cleaned = mapCode(mapProse(text, cleanProse), cleanFenceInfo);

  return dropEmptySections(cleaned)
    .replaceAll(/\n{3,}/g, '\n\n')
    .trim();
}

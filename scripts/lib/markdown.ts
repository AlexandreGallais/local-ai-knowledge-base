// Markdown helpers shared by the checks: lines with their section and code state, the YAML
// header, French and web-request detection.
export interface Finding {
  file: string;
  message: string;
}

export interface Line {
  text: string;
  inCode: boolean;
  section: string;
}

export interface Header {
  // Top-level and one-level nested scalars, as "key" or "parent.key".
  fields: Map<string, string>;
  // Block lists of maps, as "key" -> [{ a: "1", b: "2" }].
  lists: Map<string, Map<string, string>[]>;
  body: string;
  errors: string[];
}

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
const URL = /https?:\/\/\S+/i;
const WEB_REQUESTS = [
  /\b(search|look\s+up|browse|check)\b.*\b(web|internet|online)\b/i,
  /\bweb\s+search\b/i,
  /\bgoogle\b/i,
  /\b(open|visit|fetch|follow|click|go\s+to)\b.*\b(url|link|website|web\s+page)\b/i,
];
const NEGATION = /\b(never|not|no|don't|cannot|can't|without)\b/i;
const KEY_LINE = /^(\s*)([A-Za-z_][\w-]*):(?:\s+(.*))?$/;
const LIST_START = /^\s*-\s+([A-Za-z_][\w-]*):\s*(.*)$/;

export function finding(file: string, message: string): Finding {
  return {
    file,
    message,
  };
}

export function splitLines(text: string): string[] {
  return text
    .replaceAll('\r\n', '\n')
    .split('\n');
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function unquote(raw: string): string {
  const trimmed = raw.trim();

  return /^(["']).*\1$/.test(trimmed) ? trimmed.slice(1, -1) : trimmed;
}

function readListItems(lines: string[], start: number): {
  items: Map<string, string>[];
  next: number;
} {
  const items: Map<string, string>[] = [];
  let index = start;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    const itemStart = LIST_START.exec(line);
    const continued = KEY_LINE.exec(line);

    if (itemStart !== null) {
      items.push(new Map([[itemStart[1] ?? '', unquote(itemStart[2] ?? '')]]));
    } else if (continued !== null && (continued[1] ?? '').length >= 4 && items.length > 0) {
      items
        .at(-1)
        ?.set(continued[2] ?? '', unquote(continued[3] ?? ''));
    } else {
      break;
    }
    index += 1;
  }
  return {
    items,
    next: index,
  };
}

// Reads one "key: value" line into the header. Returns the line where reading goes on.
function readHeaderLine(inner: string[], position: number, header: Header, parent: string): {
  next: number;
  parent: string;
} {
  const line = inner[position] ?? '';
  const match = KEY_LINE.exec(line);

  if (match === null) {
    header.errors.push(`header line is not "key: value": ${line.trim()}`);
    return {
      next: position + 1,
      parent,
    };
  }
  const name = match[2] ?? '';
  const nested = (match[1] ?? '') !== '';
  const key = nested ? `${parent}.${name}` : name;
  const raw = (match[3] ?? '').trim();

  if (!nested && raw === '' && LIST_START.test(inner[position + 1] ?? '')) {
    const list = readListItems(inner, position + 1);

    header.lists.set(key, list.items);
    return {
      next: list.next,
      parent,
    };
  }
  if (!/^(["']).*\1$/.test(raw) && raw.includes(': ')) {
    header.errors.push(`a colon followed by a space in "${key}" breaks the YAML header: quote the value`);
  }
  header.fields.set(key, unquote(raw));
  return {
    next: position + 1,
    parent: !nested && raw === '' ? name : parent,
  };
}

// Reads the YAML header between two --- lines. Supports scalars, one level of nesting and block
// lists of maps (as the permissions of an agent). Returns undefined without a header.
export function parseHeader(text: string): Header | undefined {
  const lines = splitLines(text);
  const end = lines[0]?.trim() === '---' ? lines.findIndex((line, position) => position > 0 && line.trim() === '---') : -1;

  if (end < 0) {
    return undefined;
  }
  const header: Header = {
    fields: new Map(),
    lists: new Map(),
    body: lines
      .slice(end + 1)
      .join('\n'),
    errors: [],
  };
  const inner = lines.slice(1, end);
  let state = {
    next: 0,
    parent: '',
  };

  while (state.next < inner.length) {
    state = (inner[state.next] ?? '').trim() === '' ? {
      ...state,
      next: state.next + 1,
    } : readHeaderLine(inner, state.next, header, state.parent);
  }
  return header;
}

function isFenceEnd(trimmed: string, fence: string): boolean {
  return trimmed.startsWith(fence) && trimmed
    .slice(fence.length)
    .trim() === '';
}

// Each line with the H2 section it belongs to and whether it is inside a fenced code block.
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
      fence = opening[1] ?? '';
      inCode = true;
    } else if (!inCode) {
      section = /^##\s+(.+)$/
        .exec(trimmed)?.[1]
        ?.trim() ?? section;
    }
    result.push({
      text: content,
      inCode,
      section,
    });
  }
  return result;
}

// The text outside code blocks and inline code.
export function prose(text: string): string {
  return analyseLines(text)
    .filter((line) => !line.inCode)
    .map((line) => line.text.replaceAll(/`[^`]*`/g, ' '))
    .join('\n');
}

export function looksFrench(text: string): boolean {
  const words = text
    .toLowerCase()
    .match(/[a-zàâçéèêëîïôûùüÿœ']+/g) ?? [];
  const french = words.filter((word) => FRENCH_WORDS.has(word)).length;

  return french >= 5 && french / Math.max(words.length, 1) > 0.08;
}

// Lines that ask to use the web, and URLs outside a "Sources" section.
export function findWebRequests(text: string, file: string): Finding[] {
  return analyseLines(text)
    .filter((line) => !line.inCode && line.section !== 'Sources')
    .flatMap((line) => {
      const findings: Finding[] = [];

      if (URL.test(line.text)) {
        findings.push(finding(file, `URL outside the Sources section; links only cite sources: ${line.text.trim()}`));
      }
      // "Never search the web" is a rule, not a request: the negation must come before the verb.
      // Inline code is left out: `(click)` is an Angular binding, not a request.
      const words = line.text.replaceAll(/`[^`]*`/g, ' ');
      const request = WEB_REQUESTS
        .map((pattern) => pattern.exec(words))
        .find((match) => match !== null);

      if (request !== undefined && request !== null && !NEGATION.test(words.slice(0, request.index))) {
        findings.push(finding(file, `asks to use the web: ${line.text.trim()}`));
      }
      return findings;
    });
}

// Every file the AI reads is in English and never sends it to the web.
export function checkInstructionText(text: string, file: string): Finding[] {
  const findings = findWebRequests(text, file);

  if (looksFrench(prose(text))) {
    findings.push(finding(file, 'written in French; every file for the AI is in English'));
  }
  return findings;
}

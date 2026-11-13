// Big data and text files. JSON: the structure with types and sizes, a part per key path ($.a.b,
// $.items[0]). Logs, CSV and plain text: line counts, levels, and parts of 200 lines.
import type {
  HeavyDocument,
  PartNode,
} from './document.ts';
import {
  node,
  oneLine,
} from './document.ts';

const LINES_PER_PART = 200;
const MAX_KEYS = 40;
const MAX_LINE = 300;
const SMALL_JSON = 2000;

function kind(value: unknown): string {
  if (Array.isArray(value)) {
    return `array[${value.length}]`;
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    return `object{${Object.keys(value).length}}`;
  }
  if (typeof value === 'string') {
    return `string "${oneLine(value, 40)}"`;
  }
  return `${typeof value} ${String(value)}`;
}

// A value small enough is a leaf shown whole; a bigger one is split in its keys or first items.
function jsonPart(value: unknown, path: string): PartNode {
  const pretty = JSON.stringify(value, null, 2);
  const line = `${kind(value)} (${pretty.length} chars)`;

  if (pretty.length < SMALL_JSON) {
    return node(path, line, pretty.split('\n'));
  }
  if (Array.isArray(value)) {
    return node(
      path,
      line,
      [],
      value
        .slice(0, 3)
        .map((item, index) => jsonPart(item, `${path}[${index}]`)),
    );
  }
  if (typeof value === 'object' && value !== null) {
    return node(
      path,
      line,
      [],
      Object
        .entries(value)
        .slice(0, MAX_KEYS)
        .map(([
          key,
          item,
        ]) => jsonPart(item, /^[A-Za-z_$][\w$]*$/.test(key) ? `${path}.${key}` : `${path}["${key}"]`)),
    );
  }
  return node(path, line, [`${pretty.slice(0, SMALL_JSON)}...`]);
}

export function readJson(source: string, fileName: string): HeavyDocument {
  let value: unknown;

  try {
    value = JSON.parse(source);
  } catch (error) {
    return readText(source, fileName, `JSON that does not parse: ${(error as Error).message}`);
  }
  return {
    title: `${fileName} (JSON, ${source.length} chars)`,
    facts: ['Ask a part by its path, as "$.items[0].name". Arrays show their first 3 items; objects their first 40 keys.'],
    parts: [jsonPart(value, '$')],
    images: [],
  };
}

function levels(lines: string[]): string {
  const counts = new Map<string, number>();

  for (const line of lines) {
    const level = /\b(FATAL|ERROR|WARN(?:ING)?|INFO|DEBUG|TRACE)\b/i
      .exec(line)?.[1]
      ?.toUpperCase()
      .replace('WARNING', 'WARN');

    if (level !== undefined) {
      counts.set(level, (counts.get(level) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([
      level,
      count,
    ]) => `${level} ${count}`)
    .join(', ');
}

export function readText(source: string, fileName: string, note = ''): HeavyDocument {
  const lines = source.split(/\r?\n/);
  const found = levels(lines);
  const firstError = lines.findIndex((line) => /\b(?:FATAL|ERROR)\b/i.test(line));
  const parts: PartNode[] = [];

  for (let first = 0; first < lines.length; first += LINES_PER_PART) {
    const block = lines.slice(first, first + LINES_PER_PART);
    const last = first + block.length;
    const numbered = block.map((line, index) => {
      const shown = line.length > MAX_LINE ? `${line.slice(0, MAX_LINE)}...` : line;

      return `${first + index + 1}: ${shown}`;
    });

    parts.push(node(`l${first + 1}-${last}`, `lines ${first + 1}-${last}: ${oneLine(block[0] ?? '', 80)}`, numbered));
  }
  return {
    title: `${fileName} (${lines.length} lines)`,
    facts: [
      ...note === '' ? [] : [note],
      ...found === '' ? [] : [`Levels: ${found}.`],
      ...firstError === -1 ? [] : [`First error at line ${firstError + 1}.`],
      `Ask a part of ${LINES_PER_PART} lines by its id, as "l1-200".`,
    ],
    parts,
    images: [],
  };
}

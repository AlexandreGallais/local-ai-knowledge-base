// The common form of a heavy file once read: a tree of parts with stable ids, and the images it
// holds. The outline shows the tree to a depth; a part shows one subtree whole; both are capped and
// cut at a line end, and say which smaller part to ask for.
export interface PartNode {
  // Stable id: S1.2 (XD), h2.1 (Word), Sheet1!A1:H50 (Excel), s3 (slide), p7 (page), g2.1 (SVG).
  id: string;
  // One line: what the part is, its place and size.
  line: string;
  // Lines shown only by a part: paragraphs, table rows, cells, text.
  body: string[];
  children: PartNode[];
}

export interface ImageFile {
  id: string;
  // File name in the images folder of the cache: "img3.png".
  name: string;
  // The id of the part that holds the image.
  place: string;
  detail: string;
  bytes?: Buffer;
}

export interface HeavyDocument {
  title: string;
  facts: string[];
  parts: PartNode[];
  images: ImageFile[];
}

export const OUTLINE_MAX_CHARS = 8000;
export const PART_MAX_CHARS = 12_000;
export const DEFAULT_DEPTH = 2;

export function node(id: string, line: string, body: string[] = [], children: PartNode[] = []): PartNode {
  return {
    id,
    line,
    body,
    children,
  };
}

// Cuts at the last line end before the limit, and says what to do next.
export function capLines(lines: string[], maxChars: number, advice: string): string {
  const text = lines.join('\n');

  if (text.length <= maxChars) {
    return text;
  }
  const cut = text.lastIndexOf('\n', maxChars);

  return `${text.slice(0, cut > 0 ? cut : maxChars)}\n[truncated at ${maxChars} characters: ${advice}]`;
}

function count(item: PartNode): number {
  return item.children.reduce((sum, child) => sum + 1 + count(child), 0);
}

function outlineLines(part: PartNode, depth: number, maxDepth: number): string[] {
  const indent = '  '.repeat(depth);
  const hidden = part.children.length > 0 && depth + 1 >= maxDepth;
  const more = hidden ? ` (+${count(part)} inside: ask part ${part.id})` : '';

  return [
    `${indent}- [${part.id}] ${part.line}${more}`,
    ...hidden ? [] : part.children.flatMap((child) => outlineLines(child, depth + 1, maxDepth)),
  ];
}

export function renderOutline(document: HeavyDocument, maxDepth = DEFAULT_DEPTH): string {
  const lines = [
    `# ${document.title}`,
    ...document.facts.map((fact) => `- ${fact}`),
    '',
    ...document.parts.flatMap((part) => outlineLines(part, 0, Math.max(1, maxDepth))),
    ...document.images.length > 0 ? [
      '',
      `Images: ${document.images.length}. Call images for their files and places.`,
    ] : [],
  ];

  return capLines(lines, OUTLINE_MAX_CHARS, 'lower the depth, or ask one part by its id');
}

export function findPart(parts: PartNode[], id: string): PartNode | undefined {
  for (const part of parts) {
    if (part.id === id) {
      return part;
    }
    const found = findPart(part.children, id);

    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
}

function partLines(part: PartNode, depth: number): string[] {
  const indent = '  '.repeat(depth);

  return [
    `${indent}- [${part.id}] ${part.line}`,
    ...part.body.map((line) => `${indent}  ${line}`),
    ...part.children.flatMap((child) => partLines(child, depth + 1)),
  ];
}

export function renderPart(document: HeavyDocument, id: string): string | undefined {
  const found = findPart(document.parts, id);

  if (found === undefined) {
    return undefined;
  }
  const children = found.children
    .slice(0, 8)
    .map((child) => child.id)
    .join(', ');

  return capLines(partLines(found, 0), PART_MAX_CHARS, children === '' ? 'the rest is not shown' : `ask a smaller part: ${children}`);
}

export function imageList(document: HeavyDocument, folder: string): string {
  if (document.images.length === 0) {
    return `${document.title}: no image.`;
  }
  return capLines(
    [
      `${document.title}: ${document.images.length} image(s), written in ${folder}`,
      ...document.images.map((image) => `- [${image.id}] ${folder}/${image.name} in ${image.place} ${image.detail}`.trimEnd()),
    ],
    OUTLINE_MAX_CHARS,
    'the other images are in the same folder',
  );
}

// The extension of an image from its first bytes; the name in the file is never trusted.
export function imageExtension(bytes: Buffer): string {
  const head = bytes.toString('latin1', 0, 12);

  if (head.startsWith('\u0089PNG')) {
    return 'png';
  }
  if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
    return 'jpg';
  }
  if (head.startsWith('GIF8')) {
    return 'gif';
  }
  if (head.startsWith('RIFF') && head.endsWith('WEBP')) {
    return 'webp';
  }
  if (head.startsWith('BM')) {
    return 'bmp';
  }
  if (bytes
    .toString('latin1', 0, 512)
    .includes('<svg')) {
    return 'svg';
  }
  if (bytes.readUInt32LE(0) === 0x00_00_00_01 || bytes.readUInt32LE(0) === 0x46_4D_45_20) {
    return 'emf';
  }
  return 'bin';
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Rows from top to bottom, then left to right inside a row; items without a box at the end.
export function readingOrder<T extends { box?: Box }>(items: T[]): T[] {
  const placed = items
    .filter((item) => item.box !== undefined)
    .toSorted((first, second) => (first.box?.y ?? 0) - (second.box?.y ?? 0) || (first.box?.x ?? 0) - (second.box?.x ?? 0));
  const rows: T[][] = [];

  for (const item of placed) {
    const row = rows.at(-1);
    const top = row?.[0]?.box;
    const height = item.box?.h ?? 0;
    const tolerance = Math.max(4, Math.min(height, top?.h ?? height) / 2);

    if (row !== undefined && top !== undefined && Math.abs((item.box?.y ?? 0) - top.y) <= tolerance) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return [
    ...rows.flatMap((row) => row.toSorted((first, second) => (first.box?.x ?? 0) - (second.box?.x ?? 0))),
    ...items.filter((item) => item.box === undefined),
  ];
}

export function round(value: number): number {
  return Math.round(value);
}

// One line of text: spaces collapsed, cut at a length.
export function oneLine(text: string, max = 120): string {
  const flat = text
    .replaceAll(/\s+/g, ' ')
    .trim();

  return flat.length > max ? `${flat.slice(0, max - 3)}...` : flat;
}

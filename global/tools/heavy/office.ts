// Office Open XML (ISO/IEC 29500): Word, Excel and PowerPoint are ZIP archives of XML parts tied by
// relationship files (_rels). Each reader keeps the structure (headings, sheets, slides), puts the
// text and tables in their place, and extracts the images with the id of the part that holds them.
import { posix } from 'node:path';
import {
  type Box,
  type HeavyDocument,
  type ImageFile,
  imageExtension,
  node,
  oneLine,
  type PartNode,
  readingOrder,
} from './document.ts';
import {
  find,
  findAll,
  parseXml,
  textOf,
  textsOf,
  type XmlNode,
} from './xml.ts';
import type { Zip } from './zip.ts';

const ROWS_PER_PART = 50;
const MAX_CELL = 80;

interface Images {
  zip: Zip;
  files: ImageFile[];
  byPath: Map<string, ImageFile>;
}

function xml(zip: Zip, name: string): XmlNode | undefined {
  return zip.has(name) ? parseXml(zip.text(name)) : undefined;
}

// The targets of a part's relationships, by id, as paths inside the archive.
export function relationships(zip: Zip, partName: string): Map<
  string,
  {
    target: string;
    type: string;
  }
> {
  const folder = posix.dirname(partName);
  const rels = xml(zip, posix.join(folder, '_rels', `${posix.basename(partName)}.rels`));
  const result = new Map<
    string,
    {
      target: string;
      type: string;
    }
  >();

  for (const item of rels === undefined ? [] : findAll(rels, 'Relationship')) {
    const target = item.attributes['Target'] ?? '';
    const external = item.attributes['TargetMode'] === 'External';

    result.set(item.attributes['Id'] ?? '', {
      target: external ? target : posix.normalize(target.startsWith('/') ? target.slice(1) : posix.join(folder, target)),
      type: (item.attributes['Type'] ?? '')
        .split('/')
        .at(-1) ?? '',
    });
  }
  return result;
}

function extractImage(images: Images, path: string, place: string): string {
  const known = images.byPath.get(path);

  if (known !== undefined) {
    return known.name;
  }
  if (!images.zip.has(path)) {
    return '(missing image)';
  }
  const bytes = images.zip.bytes(path);
  const number = images.files.length + 1;
  const file: ImageFile = {
    id: `img${number}`,
    name: `img${number}.${imageExtension(bytes)}`,
    place,
    detail: posix.basename(path),
    bytes,
  };

  images.files.push(file);
  images.byPath.set(path, file);
  return file.name;
}

function blips(element: XmlNode): string[] {
  return findAll(element, 'a:blip').map((blip) => blip.attributes['r:embed'] ?? '');
}

function markdownTable(rows: string[][]): string[] {
  const width = Math.max(1, ...rows.map((row) => row.length));
  const lines = rows.map((row) => `| ${Array.from({ length: width }, (_, index) => (row[index] ?? '').replaceAll('|', '\\|')).join(' | ')} |`);

  return [
    lines[0] ?? '| |',
    `|${' --- |'.repeat(width)}`,
    ...lines.slice(1),
  ];
}

// ---------------------------------------------------------------- Word
interface WordState {
  zip: Zip;
  rels: ReturnType<typeof relationships>;
  images: Images;
  // Open sections, the outermost first, with their heading level.
  stack: {
    level: number;
    part: PartNode;
  }[];
  roots: PartNode[];
  counters: number[];
  tables: number;
}

function headingLevel(paragraph: XmlNode): number {
  const style = find(paragraph, 'w:pStyle')?.attributes['w:val'] ?? '';
  const named = /^(?:heading|titre|berschrift)\s*(\d)$/i.exec(style);
  const outline = find(paragraph, 'w:outlineLvl')?.attributes['w:val'];

  if (named?.[1] !== undefined) {
    return Number(named[1]);
  }
  if (/^title$/i.test(style)) {
    return 1;
  }
  return outline === undefined ? 0 : Number(outline) + 1;
}

// The section that receives the next paragraph; text before any heading goes to "h0".
function current(state: WordState): PartNode {
  const top = state.stack.at(-1);

  if (top !== undefined) {
    return top.part;
  }
  const existing = state.roots.find((root) => root.id === 'h0');

  if (existing !== undefined) {
    return existing;
  }
  const start = node('h0', 'before the first heading');

  state.roots.unshift(start);
  return start;
}

// Heading numbers as in a table of contents: h2.3 is the third heading 2 of the second heading 1.
function openHeading(state: WordState, level: number, title: string): void {
  const depth = Math.min(Math.max(level, 1), 6);
  const previous = state.counters[depth - 1] ?? 0;

  state.counters = Array.from({ length: depth }, (_, index) => index < depth - 1 ? state.counters[index] ?? 0 : previous + 1);
  const section = node(`h${state.counters.join('.')}`, `heading ${depth} "${oneLine(title, 100)}"`);

  while ((state.stack.at(-1)?.level ?? 0) >= depth) {
    state.stack.pop();
  }
  (state.stack.at(-1)?.part.children ?? state.roots).push(section);
  state.stack.push({
    level: depth,
    part: section,
  });
}

function paragraphText(state: WordState, paragraph: XmlNode, place: string): string {
  const pictures = blips(paragraph).map((id) => {
    const target = state.rels.get(id)?.target;

    return target === undefined ? '' : ` [image ${extractImage(state.images, target, place)}]`;
  });

  return `${textsOf(paragraph, 'w:t')}${pictures.join('')}`.trim();
}

function wordParagraph(state: WordState, paragraph: XmlNode): void {
  const level = headingLevel(paragraph);
  const words = textsOf(paragraph, 'w:t');

  if (level > 0 && words.trim() !== '') {
    openHeading(state, level, words);
    return;
  }
  const section = current(state);
  const line = paragraphText(state, paragraph, section.id);

  if (line === '') {
    return;
  }
  const listLevel = find(paragraph, 'w:ilvl')?.attributes['w:val'];
  const isList = find(paragraph, 'w:numPr') !== undefined;

  section.body.push(isList ? `${'  '.repeat(Number(listLevel ?? 0))}- ${line}` : line);
}

function wordTable(state: WordState, table: XmlNode): void {
  const section = current(state);
  const rows = findAll(table, 'w:tr').map((row) => findAll(row, 'w:tc').map((cell) => oneLine(
    findAll(cell, 'w:p')
      .map((paragraph) => paragraphText(state, paragraph, section.id))
      .join(' '),
    MAX_CELL,
  )));

  state.tables += 1;
  section.children.push(node(`t${state.tables}`, `table ${rows.length}x${Math.max(0, ...rows.map((row) => row.length))}: ${oneLine(rows[0]?.join(' | ') ?? '', 80)}`, markdownTable(rows)));
}

function wordComments(zip: Zip): PartNode[] {
  const comments = xml(zip, 'word/comments.xml');
  const items = comments === undefined ? [] : findAll(comments, 'w:comment');

  if (items.length === 0) {
    return [];
  }
  return [node('comments', `${items.length} comment(s)`, items.map((item) => `- ${item.attributes['w:author'] ?? '?'}: ${oneLine(textsOf(item, 'w:t'), 200)}`))];
}

export function readWord(zip: Zip, fileName: string): HeavyDocument {
  const main = 'word/document.xml';
  const document = xml(zip, main);
  const body = document === undefined ? undefined : find(document, 'w:body');
  const state: WordState = {
    zip,
    rels: relationships(zip, main),
    images: {
      zip,
      files: [],
      byPath: new Map(),
    },
    stack: [],
    roots: [],
    counters: [],
    tables: 0,
  };

  for (const block of body?.children ?? []) {
    if (block.name === 'w:p') {
      wordParagraph(state, block);
    } else if (block.name === 'w:tbl') {
      wordTable(state, block);
    }
  }
  return {
    title: `${fileName} (Word document)`,
    facts: [`${state.counters[0] ?? 0} top-level heading(s), ${state.tables} table(s), ${state.images.files.length} image(s). Images are marked [image imgN.ext] where they stand.`],
    parts: [
      ...state.roots.map((root) => withSize(root)),
      ...wordComments(zip),
    ],
    images: state.images.files,
  };
}

// Adds the length of each section to its line, so that the outline says what a part costs.
function withSize(part: PartNode): PartNode {
  const characters = part.body.join('\n').length;

  return {
    ...part,
    line: characters > 0 ? `${part.line} (${characters} chars)` : part.line,
    children: part.children.map((child) => withSize(child)),
  };
}

// ---------------------------------------------------------------- Excel
interface Cell {
  column: number;
  row: number;
  text: string;
}

export function columnName(index: number): string {
  let name = '';

  for (let rest = index + 1; rest > 0; rest = Math.floor((rest - 1) / 26)) {
    name = String.fromCodePoint(65 + ((rest - 1) % 26)) + name;
  }
  return name;
}

function cellPosition(reference: string): {
  column: number;
  row: number;
} {
  const match = /^([A-Z]+)(\d+)$/.exec(reference) ?? [];
  const letters = match[1] ?? 'A';

  return {
    column: [...letters].reduce((sum, letter) => sum * 26 + (letter.codePointAt(0) ?? 65) - 64, 0) - 1,
    row: Number(match[2] ?? 1),
  };
}

function cellText(cell: XmlNode, shared: string[]): string {
  const type = cell.attributes['t'];
  const value = textOf(find(cell, 'v') ?? cell).trim();
  const formula = find(cell, 'f');
  let shown = value;

  if (type === 's') {
    shown = shared[Number(value)] ?? '';
  } else if (type === 'inlineStr') {
    shown = textsOf(cell, 't');
  } else if (type === 'b') {
    shown = value === '1' ? 'TRUE' : 'FALSE';
  }
  shown = oneLine(shown, MAX_CELL);
  return formula === undefined ? shown : `=${oneLine(textOf(formula), MAX_CELL)} -> ${shown}`;
}

function sheetImages(zip: Zip, sheetPath: string, images: Images, place: string): string[] {
  return [...relationships(zip, sheetPath).values()]
    .filter((link) => link.type === 'drawing')
    .flatMap((drawing) => {
      const rels = relationships(zip, drawing.target);
      const content = xml(zip, drawing.target);
      const pictures = content === undefined ? [] : blips(content).flatMap((id) => {
        const target = rels.get(id)?.target;

        return target === undefined ? [] : [`image ${extractImage(images, target, place)}`];
      });
      const charts = [...rels.values()]
        .filter((link) => link.type === 'chart')
        .map((link) => {
          const chart = xml(zip, link.target);
          const title = chart === undefined ? '' : textsOf(find(chart, 'c:title') ?? chart, 'a:t');

          return `chart "${oneLine(title, 60)}" (${posix.basename(link.target)})`;
        });

      return [
        ...pictures,
        ...charts,
      ];
    });
}

function sheetBlocks(name: string, cells: Cell[], lastColumn: number): PartNode[] {
  const lastRow = Math.max(0, ...cells.map((cell) => cell.row));
  const blocks: PartNode[] = [];

  for (let first = 1; first <= lastRow; first += ROWS_PER_PART) {
    const last = Math.min(lastRow, first + ROWS_PER_PART - 1);
    const rows: string[][] = [['', ...Array.from({ length: lastColumn + 1 }, (_, index) => columnName(index))]];

    for (let row = first; row <= last; row += 1) {
      const line = Array.from({ length: lastColumn + 2 }, () => '');

      line[0] = String(row);
      for (const cell of cells.filter((item) => item.row === row)) {
        line[cell.column + 1] = cell.text;
      }
      rows.push(line);
    }
    blocks.push(node(`${name}!A${first}:${columnName(lastColumn)}${last}`, `rows ${first}-${last}`, markdownTable(rows)));
  }
  return blocks;
}

function readSheet(zip: Zip, path: string, name: string, shared: string[], images: Images): PartNode {
  const sheet = xml(zip, path);
  const cells: Cell[] = (sheet === undefined ? [] : findAll(sheet, 'c'))
    .map((cell) => ({
      ...cellPosition(cell.attributes['r'] ?? 'A1'),
      text: cellText(cell, shared),
    }))
    .filter((cell) => cell.text !== '');
  const formulas = sheet === undefined ? 0 : findAll(sheet, 'f').length;
  const merged = sheet === undefined ? [] : findAll(sheet, 'mergeCell').map((cell) => cell.attributes['ref'] ?? '');
  const lastColumn = Math.max(0, ...cells.map((cell) => cell.column));
  const lastRow = Math.max(0, ...cells.map((cell) => cell.row));
  const range = cells.length === 0 ? 'empty' : `A1:${columnName(lastColumn)}${lastRow}`;
  const extras = sheetImages(zip, path, images, name);
  const facts = [
    `sheet "${name}" ${range}`,
    `${cells.length} cells`,
    `${formulas} formulas`,
    ...merged.length > 0 ? [`merged ${merged.join(' ')}`] : [],
    ...extras,
  ];

  return node(name, facts.join(', '), [], sheetBlocks(name, cells, lastColumn));
}

export function readExcel(zip: Zip, fileName: string): HeavyDocument {
  const workbookPath = 'xl/workbook.xml';
  const workbook = xml(zip, workbookPath);
  const rels = relationships(zip, workbookPath);
  const sharedXml = xml(zip, 'xl/sharedStrings.xml');
  const shared = sharedXml === undefined ? [] : findAll(sharedXml, 'si').map((item) => textsOf(item, 't'));
  const images: Images = {
    zip,
    files: [],
    byPath: new Map(),
  };
  const sheets = (workbook === undefined ? [] : findAll(workbook, 'sheet')).map((sheet) => {
    const target = rels.get(sheet.attributes['r:id'] ?? '')?.target ?? '';
    const name = (sheet.attributes['name'] ?? 'Sheet').replaceAll(/[\s!]/g, '_');

    return readSheet(zip, target, name, shared, images);
  });

  return {
    title: `${fileName} (Excel workbook, ${sheets.length} sheet(s))`,
    facts: [`A formula cell shows "=FORMULA -> value". Parts hold ${ROWS_PER_PART} rows each: ask "Sheet!A1:H50".`],
    parts: sheets,
    images: images.files,
  };
}

// ---------------------------------------------------------------- PowerPoint
interface Shape {
  box?: Box;
  text: string;
  title: boolean;
}

function shapeOf(shape: XmlNode): Shape {
  const offset = find(shape, 'a:off');
  const extent = find(shape, 'a:ext');
  const kind = find(shape, 'p:ph')?.attributes['type'] ?? '';
  const paragraphs = findAll(shape, 'a:p')
    .map((paragraph) => textsOf(paragraph, 'a:t').trim())
    .filter((line) => line !== '');

  return {
    box: offset === undefined ? undefined : {
      x: Number(offset.attributes['x'] ?? 0),
      y: Number(offset.attributes['y'] ?? 0),
      w: Number(extent?.attributes['cx'] ?? 0),
      h: Number(extent?.attributes['cy'] ?? 0),
    },
    text: paragraphs.join('\n'),
    title: kind === 'title' || kind === 'ctrTitle',
  };
}

function slideNotes(zip: Zip, rels: ReturnType<typeof relationships>): string[] {
  const notes = [...rels.values()].find((link) => link.type === 'notesSlide');
  const content = notes === undefined ? undefined : xml(zip, notes.target);

  if (content === undefined) {
    return [];
  }
  const lines = findAll(content, 'p:sp')
    .filter((shape) => find(shape, 'p:ph')?.attributes['type'] !== 'sldImg')
    .map((shape) => shapeOf(shape).text)
    .filter((line) => line !== '' && !/^\d+$/.test(line));

  return lines.length === 0 ? [] : [
    'Notes:',
    ...lines,
  ];
}

function readSlide(zip: Zip, path: string, id: string, images: Images): PartNode {
  const slide = xml(zip, path);
  const rels = relationships(zip, path);
  const shapes = readingOrder((slide === undefined ? [] : findAll(slide, 'p:sp')).map((shape) => shapeOf(shape)));
  const title = shapes.find((shape) => shape.title)?.text ?? shapes[0]?.text ?? '';
  const pictures = (slide === undefined ? [] : findAll(slide, 'p:pic')).flatMap((picture) => blips(picture).map((embed) => {
    const target = rels.get(embed)?.target;

    return target === undefined ? '' : `[image ${extractImage(images, target, id)}]`;
  }));
  const body = [
    ...shapes
      .filter((shape) => shape.text !== '')
      .map((shape) => shape.title ? `# ${shape.text}` : shape.text),
    ...pictures,
    ...slideNotes(zip, rels),
  ];
  const size = [
    `${body.join('\n').length} chars`,
    ...pictures.length > 0 ? [`${pictures.length} image(s)`] : [],
  ];

  return node(id, `slide "${oneLine(title, 80)}" (${size.join(', ')})`, body);
}

export function readPowerPoint(zip: Zip, fileName: string): HeavyDocument {
  const presentationPath = 'ppt/presentation.xml';
  const presentation = xml(zip, presentationPath);
  const rels = relationships(zip, presentationPath);
  const images: Images = {
    zip,
    files: [],
    byPath: new Map(),
  };
  const paths = (presentation === undefined ? [] : findAll(presentation, 'p:sldId')).map((slide) => rels.get(slide.attributes['r:id'] ?? '')?.target ?? '');
  const slides = paths.map((path, index) => readSlide(zip, path, `s${index + 1}`, images));

  return {
    title: `${fileName} (PowerPoint, ${slides.length} slide(s))`,
    facts: ['Text is in reading order; the slide title is marked "#".'],
    parts: slides,
    images: images.files,
  };
}
